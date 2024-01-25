import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { Canvass, Prisma } from 'apps/warehouse/prisma/generated/client';

@Injectable()
export class CanvassService {

    private readonly logger = new Logger(CanvassService.name);

    constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateCanvassInput): Promise<Canvass> {

        this.logger.log('create()', input)

        if(!this.isValidRequestedById(input.requested_by_id)){
            throw new NotFoundException('Requested by ID not found')
        }

        const rcNumber = await this.getLatestRcNumber()

        const data: Prisma.CanvassCreateInput = {
            rc_number: rcNumber,
            date_requested: new Date(input.date_requested),
            purpose: input.purpose,
            notes: input.notes,
            requested_by_id: input.requested_by_id,
            canvass_items: {
                create: input.items.map((item) => {
                    return {
                        item: {
                            create: {
                                description: item.description,
                                brand: item.brand_id ? { connect: { id: item.brand_id } } : undefined,
                                unit: { connect: { id: item.unit_id } },
                                quantity: item.quantity
                            }
                        }
                    }
                })
            }
        }

        const created = await this.prisma.canvass.create( { data } )

        this.logger.log('Successfully created canvass')

        return await this.findOne(created.id)

    }

    async findAll(): Promise<Canvass[]> {
        return this.prisma.canvass.findMany({
            include: {
                canvass_items: {
                include: {
                    item: {
                    include: {
                        unit: true, 
                        brand: true
                    }
                    }
                }
                }, 
            },
            where: {
                is_deleted: false
            },
            orderBy: {
                rc_number: 'desc'
            }
        });
    }

    async findOne(id: string): Promise<Canvass> {
        
        this.logger.log('findOne()', id)

        const item = await this.prisma.canvass.findUnique({
          include: {
            canvass_items: {
              include: {
                item: {
                  include: {
                    unit: true, 
                    brand: true
                  }
                }
              }
            }, 
          },
          where: { id }
        })

        if(!item){
            throw new NotFoundException('Canvass not found')
        }

        return item
        
    }

    private async getLatestRcNumber(): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);
    
        const latestItem = await this.prisma.canvass.findFirst({
          where: { rc_number: { startsWith: currentYear } },
          orderBy: { rc_number: 'desc' },
        });
    
        if (latestItem) {
          const latestNumericPart = parseInt(latestItem.rc_number.slice(-5), 10);
          const newNumericPart = latestNumericPart + 1;
          const newRcNumber = `${currentYear}-${newNumericPart.toString().padStart(5, '0')}`;
          return newRcNumber;
        } else {
          // If no existing rc_number with the current year prefix, start with '00001'
          return `${currentYear}-00001`;
        }
    }

    private async isValidRequestedById(requested_by_id: string): Promise<boolean> {
        // TODO
        this.logger.log('isValidRequestedById()', requested_by_id)
        return true 

    }

    async forEmployee(employeeId: string): Promise<Canvass[]> {
        return await this.prisma.canvass.findMany({
            where: {
                requested_by_id: employeeId
            }
        })
    }

}
