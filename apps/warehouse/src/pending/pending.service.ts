import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Pending, Prisma } from 'apps/warehouse/prisma/generated/client';
import { PrismaService } from '../__prisma__/prisma.service';
import { AuthUser } from '../__common__/auth-user.entity';
import { APPROVAL_STATUS } from '../__common__/types';
import { DB_ENTITY, MODULE_MAPPER } from '../__common__/constants';

@Injectable()
export class PendingService {

  private readonly logger = new Logger(PendingService.name)
  private authUser: AuthUser

  constructor(
    private readonly prisma: PrismaService,
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

  async approveOrDisapprovePending(id: number, status: APPROVAL_STATUS): Promise<{success: boolean, msg: string}> {
    console.log('approveOrDisapprovePending()', id);

    const item = await this.prisma.pending.findUnique({
      where: { id }
    })

    if(!item) {
      throw new NotFoundException('pending id not found')
    }

    // =================== UPDATE APPROVER STATUS =================== 
    const module = this.getModule(item.reference_table as DB_ENTITY)

    const approverTable = await this.prisma[module.model].findUnique({
      select: {
        id: true,
      },
      where: {
        [module.rcNumber]: item.reference_number,
      }
    })

    if(!approverTable) {
      throw new NotFoundException(`reference_number: ${item.reference_number} not found in ${item.reference_table}`)
    }

    // get the x-approver table by the current approver 
    const recordToUpdate = await this.prisma[module.approverModel].findFirst({
      where: {
        approver_id: item.approver_id,
        [module.id]: approverTable.id,
        status: APPROVAL_STATUS.PENDING
      },
      orderBy: {
        order: 'asc'  
      }
    });

    if(!recordToUpdate) {
      throw new NotFoundException(`record to update not found`)
    }

    console.log('recordToUpdate', recordToUpdate);

    const queries: Prisma.PrismaPromise<any>[] = []

    const updateStatusQuery = this.prisma[module.approverModel].update({
      where: {
        id: recordToUpdate.id  
      },
      data: {
        status,
        date_approval: new Date(),
      },
    });

    queries.push(updateStatusQuery)

    // =================== DELETE PENDING =================== 
    const deletePendingQuery = this.prisma.pending.delete({
      where: {
        id: item.id
      }
    })

    queries.push(deletePendingQuery)

    // =================== ADD NEW PENDING IF STATUS IS APPROVE =================== 

    if(status === APPROVAL_STATUS.APPROVED) {

      // get the next in line approver
      const newPending = await this.prisma[module.approverModel].findFirst({
        select: {
          approver_id: true,
        },
        where: {
          [module.id]: approverTable.id,
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
      }

    }

    console.log('queries', queries);

    try {
      const result = await this.prisma.$transaction(queries)

      console.log('approver status updated');
      console.log('pending record is deleted');

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
      console.log('entity', entity);
      console.log('MODULE_MAPPER', MODULE_MAPPER);
      throw new NotFoundException(`module not found`)
    }
    return module
  }

} 
