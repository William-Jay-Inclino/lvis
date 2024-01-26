import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { Canvass, Prisma } from 'apps/warehouse/prisma/generated/client';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateCanvassInput } from './dto/update-canvass.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class CanvassService {

    private readonly logger = new Logger(CanvassService.name);
    private authUser: AuthUser

    constructor(
        private readonly httpService: HttpService,
        private readonly prisma: PrismaService
    ) {}
    
    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }

    async create(input: CreateCanvassInput): Promise<Canvass> {

        this.logger.log('create()', input)

        const isValidRequestedById = await this.isValidRequestedById(input.requested_by_id)

        if(!isValidRequestedById){
            throw new NotFoundException('Requested by ID not found')
        }

        console.log('valid')
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

    async update(id: string, input: UpdateCanvassInput): Promise<Canvass> {
        this.logger.log('update()', input)

        const existingItem = await this.findOne(id)

        if(input.requested_by_id){
            const isValidRequestedById = await this.isValidRequestedById(input.requested_by_id)

            if(!isValidRequestedById){
                throw new NotFoundException('Requested by ID not found')
            }
        }

        const data: Prisma.CanvassUpdateInput = {
            date_requested: input.date_requested ? new Date(input.date_requested) : existingItem.date_requested,
            purpose: input.purpose ?? existingItem.purpose,
            notes: input.notes ?? existingItem.notes,
            requested_by_id: input.requested_by_id ?? existingItem.requested_by_id
        }

        const updated = await this.prisma.canvass.update({
            data,
            where: { id }
        })

        this.logger.log('Successfully updated canvass')

        return await this.findOne(updated.id)

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

    // check if employee exist
    private async isValidRequestedById(requested_by_id: string): Promise<boolean> {
        
        this.logger.log('isValidRequestedById', requested_by_id)

        // console.log('this.authUser', this.authUser)

        const query = `
            query{
                employee(id: "${requested_by_id}") {
                    id
                }
            }
        `;

        const { data } = await firstValueFrom(
            this.httpService.post(process.env.API_GATEWAY_URL, 
            { query },
            {
                headers: {
                    Authorization: this.authUser.authorization,
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

    async forEmployee(employeeId: string): Promise<Canvass[]> {
        return await this.prisma.canvass.findMany({
            where: {
                requested_by_id: employeeId
            }
        })
    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

        if(existingItem.is_referenced){
            return {
                success: false,
                msg: "Unable to delete. Canvass is reference"
            }
        }

		await this.prisma.canvass.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Canvass successfully deleted"
		}

	}

}
