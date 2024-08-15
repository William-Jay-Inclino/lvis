import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Pending, Prisma } from 'apps/warehouse/prisma/generated/client';
import { PrismaService } from '../__prisma__/prisma.service';
import { AuthUser } from '../__common__/auth-user.entity';
import { APPROVAL_STATUS } from '../__common__/types';
import { DB_ENTITY, MODULE_MAPPER } from '../__common__/constants';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { RrApproverStatusUpdated } from '../rr-approver/events/rr-approver-status-updated.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PendingService {

  private readonly logger = new Logger(PendingService.name)
  private authUser: AuthUser

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2
) { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  async findPendingsByApproverId(approverId: string): Promise<Pending[]> {
    
    const pendings = await this.prisma.pending.findMany({
      where: {
        approver_id: approverId
      },
      take: 100
    })

    return pendings

  }

  async getTotalPendingsByApproverId(approverId: string): Promise<Number> {
    
    const totalPendings = await this.prisma.pending.count({
      where: {
        approver_id: approverId
      }
    })

    console.log('totalPendings', totalPendings);

    return totalPendings

  }

  async approveOrDisapprovePending(payload: {
    id: number, 
    status: APPROVAL_STATUS,
    remarks: string,
    classification_id?: string,
    fund_source_id?: string
  })
  : Promise<{success: boolean, msg: string}> {

    console.log('approveOrDisapprovePending()', payload);

    const {
      id,
      status,
      remarks,
      classification_id,
      fund_source_id,
    } = payload

    // this array will be use in the transaction
    const queries: Prisma.PrismaPromise<any>[] = []

    // use for logging
    const logs: string[] = []

    const item = await this.prisma.pending.findUnique({
      where: { id }
    })

    if(!item) {
      throw new NotFoundException('pending id not found')
    }

    // =================== UPDATE APPROVER STATUS, REMARKS/NOTES, & DATE APPROVAL =================== 

    const module = this.getModule(item.reference_table as DB_ENTITY)
    
    // model can be: rv/spr/jo/meqs/po/rr
    const model = await this.prisma[module.model].findUnique({
      select: {
        id: true,
      },
      where: {
        [module.rcNumber]: item.reference_number,
      }
    })

    if(!model) {
      throw new NotFoundException(`reference_number: ${item.reference_number} not found in ${item.reference_table}`)
    }

    // get the x-approver table by the current approver 
    const approverModel = await this.prisma[module.approverModel].findFirst({
      where: {
        approver_id: item.approver_id,
        [module.id]: model.id,
        status: APPROVAL_STATUS.PENDING
      },
      orderBy: {
        order: 'asc'  
      }
    });

    if(!approverModel) {
      throw new NotFoundException(`record to update not found`)
    }

    console.log('approverModel', approverModel);

    const updateStatusQuery = this.prisma[module.approverModel].update({
      where: {
        id: approverModel.id  
      },
      data: {
        status,
        notes: (!!remarks && remarks.trim().length > 0) ? remarks : approverModel.notes,
        date_approval: new Date(),
      },
    });

    queries.push(updateStatusQuery)
    logs.push('update approver status')


    // =================== DELETE PENDING =================== 

    const deletePendingQuery = this.prisma.pending.delete({
      where: {
        id: item.id
      }
    })

    queries.push(deletePendingQuery)
    logs.push('delete pending')


    // =================== ADD NEW PENDING IF STATUS IS APPROVE =================== 

    if(status === APPROVAL_STATUS.APPROVED) {

      // get the next in line approver
      const newPending = await this.prisma[module.approverModel].findFirst({
        select: {
          approver_id: true,
        },
        where: {
          [module.id]: model.id,
          status: APPROVAL_STATUS.PENDING,
          NOT: {
            approver_id: item.approver_id
          }
        },
        orderBy: {
          order: 'asc'
        }
      })
  
      if(newPending) {
        const addNewPendingQuery = this.prisma.pending.create({
          data: {
            approver_id: newPending.approver_id,
            reference_number: item.reference_number,
            reference_table: item.reference_table,
            description: `${module.model.toUpperCase()} no. ${item.reference_number}`
          }
        })
    
        queries.push(addNewPendingQuery)
        logs.push('add new pending since status is approve')
      }

    }

    // =================== IF CLASSIFICATION_ID IS DEFINED THEN UPDATE IT =================== 
    // classification_id is only available in rv, spr. and jo

    const canUpdateClassification = !!classification_id && (module.model === 'rV' || module.model === 'sPR' || module.model === 'jO')

    if( canUpdateClassification && (await this.isClassificationExist(classification_id, this.authUser)) ) {
      const updateClassificationQuery = this.prisma[module.model].update({
        data: {
          classification_id,
        },
        where: {
          id: model.id
        }
      })
  
      queries.push(updateClassificationQuery)
      logs.push('update classification_id')
    }



    // =================== IF FUND SOURCE ID IS DEFINED THEN UPDATE IT =================== 
    // fund_source_id is only available in po

    const canUpdateFundSource = !!fund_source_id && module.model === 'pO'

    if( canUpdateFundSource && (await this.isFundSourceExist(fund_source_id, this.authUser)) ){

      const updateFundSourceQuery = this.prisma.pO.update({
        data: {
          fund_source_id,
        },
        where: {
          id: model.id
        }
      })

      queries.push(updateFundSourceQuery)
      logs.push('update fund_source_id')

    }

    try {
      const result = await this.prisma.$transaction(queries)
      
      this.printLogsInConsole(logs)

      // emit event so that item will be transacted and stock will be added on the item inventory
      if(status === APPROVAL_STATUS.APPROVED && module.model === 'rR') {
        // id = rrApprover ID
        // handler function is located at item.service.ts -> handleRrApproverStatusUpdated
        this.eventEmitter.emit('rr-approver-status.updated', new RrApproverStatusUpdated(approverModel.id))
      }

      return {
        success: true,
        msg: 'Successfully updated pending'
      }
    } catch (error) {
      console.log('Error', error);
      return {
        success: false,
        msg: error
      }
    }
  }

  private getModule(entity: DB_ENTITY) {
    const module = MODULE_MAPPER[entity]
    if(!module) {
      throw new NotFoundException(`module not found`)
    }
    return module
  }

  private async printLogsInConsole(logs: string[]) {
    for(let log of logs) {
      console.log(log);
    }
  }

  private async isClassificationExist(classification_id: string, authUser: AuthUser): Promise<boolean> {

    this.logger.log('isClassificationExist', classification_id)

    console.log('this.authUser', this.authUser)

    const query = `
        query{
            classification(id: "${classification_id}") {
                id
            }
        }
    `;

    const { data } = await firstValueFrom(
        this.httpService.post(process.env.API_GATEWAY_URL,
            { query },
            {
                headers: {
                    Authorization: authUser.authorization,
                    'Content-Type': 'application/json'
                }
            }
        ).pipe(
            catchError((error) => {
                throw error
            }),
        ),
    );

    console.log('data', data)

    if (!data || !data.data || !data.data.classification) {
        console.log('classification not found')
        return false
    }
    const classification = data.data.classification
    console.log('classification', classification)
    return true

  }

  private async isFundSourceExist(fund_source_id: string, authUser: AuthUser): Promise<boolean> {

    this.logger.log('isFundSourceExist', fund_source_id)

    const query = `
        query{
            account(id: "${fund_source_id}") {
                id
            }
        }
    `;

    const { data } = await firstValueFrom(
        this.httpService.post(process.env.API_GATEWAY_URL,
            { query },
            {
                headers: {
                    Authorization: authUser.authorization,
                    'Content-Type': 'application/json'
                }
            }
        ).pipe(
            catchError((error) => {
                throw error
            }),
        ),
    );

    console.log('data', data)

    if (!data || !data.data || !data.data.account) {
        console.log('account not found')
        return false
    }
    const account = data.data.account
    console.log('account', account)
    return true

}

} 
