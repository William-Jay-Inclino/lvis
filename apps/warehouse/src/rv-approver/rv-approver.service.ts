import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRvApproverInput } from './dto/create-rv-approver.input';
import { UpdateRvApproverInput } from './dto/update-rv-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RVApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class RvApproverService {

    private readonly logger = new Logger(RvApproverService.name);
    private authUser: AuthUser

	constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) {}

    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }

    async create(input: CreateRvApproverInput): Promise<RVApprover> {

        const isValidApproverId = await this.isEmployeeExist(input.approver_id, this.authUser)

        if(!isValidApproverId){
            throw new NotFoundException('Approver ID not valid')
        }

        if(input.approver_proxy_id){
            const isValidApproverProxyId = await this.isEmployeeExist(input.approver_proxy_id, this.authUser)

            if(!isValidApproverProxyId){
                throw new NotFoundException('Approver Proxy ID not valid')
            }
        }

        const data: Prisma.RVApproverCreateInput = {
        rv: { connect: { id: input.rv_id } },
            approver_id: input.approver_id,
        approver_proxy_id: input.approver_proxy_id ?? null,
        label: input.label,
        order: input.order,
        status: APPROVAL_STATUS.PENDING
        }

        const created = await this.prisma.rVApprover.create( { data } )

        this.logger.log('Successfully created rVApprover')

        return await this.findOne(created.id)
        }

    async findAll(): Promise<RVApprover[]> {
        return await this.prisma.rVApprover.findMany({
        include: {
            rv: {
            include: {
                canvass: {
                include: {
                    canvass_items: {
                    include: {
                        unit: true,
                        brand: true
                    }
                    }
                }
                }
            }
            }
        },
        where: { is_deleted: false },
        orderBy: {
            label: 'asc'
        }
        })
    }

    findOne(id: string): Promise<RVApprover | null> {
        
        const item = this.prisma.rVApprover.findUnique({
        where: { id },
        include: {
            rv: {
            include: {
                canvass: {
                include: {
                    canvass_items: {
                    include: {
                        unit: true,
                        brand: true
                    }
                    }
                }
                }
            }
            }
        }
        })

        if(!item){
        throw new NotFoundException('RV Approver not found')
    }

    return item

    }

    update(id: number, updateRvApproverInput: UpdateRvApproverInput) {
        return `This action updates a #${id} rvApprover`;
    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.rVApprover.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "RV Approver successfully deleted"
		}

	}

    private async isEmployeeExist(employee_id: string, authUser: AuthUser): Promise<boolean> {
    
        this.logger.log('isEmployeeExist', employee_id)

        // console.log('this.authUser', this.authUser)

        const query = `
            query{
                employee(id: "${employee_id}") {
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

        if(!data || !data.data || !data.data.employee){
            console.log('employee not found')
            return false 
        }
        const employee = data.data.employee 
        console.log('employee', employee)
        return true 

    }


}
