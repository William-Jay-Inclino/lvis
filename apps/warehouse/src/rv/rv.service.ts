import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CanvassService } from '../canvass/canvass.service';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RV } from 'apps/warehouse/prisma/generated/client';
import { CreateRvInput } from './dto/create-rv.input';
import { APPROVAL_STATUS } from '../__common__/types';

@Injectable()
export class RvService {

    private readonly logger = new Logger(CanvassService.name);

    constructor(
        private readonly prisma: PrismaService
    ) {}
    
    
    async create(input: CreateRvInput): Promise<RV> {

        const rvNumber = await this.getLatestRcNumber()

        const data: Prisma.RVCreateInput = {
            rv_number: rvNumber,
            date_requested: new Date(input.date_requested),
            work_order_no: input.work_order_no ?? null,
            work_order_date: input.work_order_date ? new Date(input.date_requested) : null,
            classification_id: input.classification_id,
            supervisor_id: input.supervisor_id,
            canvass: { connect: { id: input.canvass_id } },
            rv_approvers: {
                create: input.approvers.map(i => {
                    return {
                        approver_id: i.approver_id,
                        label: i.label,
                        order: i.order,
                        status: APPROVAL_STATUS.PENDING
                    }
                })
            }
        }

        const created = await this.prisma.rV.create( { data } )

        this.logger.log('Successfully created RV')

		return await this.findOne(created.id)

    }

    async findOne(id: string): Promise<RV | null> {
		const item = await this.prisma.rV.findUnique({
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
                },
                rv_approvers: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
			where: { id }
		})

		if(!item){
            throw new NotFoundException('RV not found')
        }

        return item
	}

    async findAll(): Promise<RV[]> {
		return await this.prisma.rV.findMany( {
            include: {
                rv_approvers: {
                    orderBy: {
                        order: 'asc'
                    }
                },
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
            },
			where: {
				is_deleted: false 
			},
			orderBy: {
                rv_number: 'desc'
            }
		} )
	}

    private async getLatestRcNumber(): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);
    
        const latestItem = await this.prisma.rV.findFirst({
          where: { rv_number: { startsWith: currentYear } },
          orderBy: { rv_number: 'desc' },
        });
    
        if (latestItem) {
          const latestNumericPart = parseInt(latestItem.rv_number.slice(-5), 10);
          const newNumericPart = latestNumericPart + 1;
          const newRcNumber = `${currentYear}-${newNumericPart.toString().padStart(5, '0')}`;
          return newRcNumber;
        } else {
          // If no existing rc_number with the current year prefix, start with '00001'
          return `${currentYear}-00001`;
        }
    }

    // async forEmployeeSupervisor(employeeId: string): Promise<RV[]> {
    //     return await this.prisma.rV.findMany({
    //         where: {
    //             supervisor_id: employeeId
    //         }
    //     })
    // }

    // async forEmployeeCanceller(employeeId: string): Promise<RV[]> {
    //     return await this.prisma.rV.findMany({
    //         where: {
    //             canceller_id: employeeId
    //         }
    //     })
    // }

}
