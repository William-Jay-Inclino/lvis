import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { Brand, Canvass, CanvassItem, LOG_OPERATION, Prisma, Unit } from 'apps/warehouse/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateCanvassInput } from './dto/update-canvass.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CanvassesResponse } from './entities/canvasses-response.entity';
import { Employee } from '../__employee__/entities/employee.entity';
import { getFullname } from '../__common__/helpers';
import { FindOneResponse } from './entities/types';

@Injectable()
export class CanvassService {

    private readonly logger = new Logger(CanvassService.name);
    private authUser: AuthUser
    private includedFields = {
        canvass_items: {
            include: {
                unit: true, 
                brand: true
            }
        }, 
    }

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) {}
    
    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }

    async create(input: CreateCanvassInput): Promise<Canvass> {

        this.logger.log('create()', input)

        const isValidRequestedById = await this.areEmployeesExist([input.requested_by_id], this.authUser)

        if(!isValidRequestedById){
            throw new NotFoundException('Requested by ID not valid')
        }

        const rcNumber = await this.getLatestRcNumber()

        const data: Prisma.CanvassCreateInput = {
            created_by: this.authUser.user.username,
            rc_number: rcNumber,
            date_requested: new Date(input.date_requested),
            purpose: input.purpose,
            notes: input.notes,
            requested_by_id: input.requested_by_id,
            canvass_items: {
                create: input.canvass_items.map((item) => {
                    return {
                        description: item.description,
                        brand: item.brand_id ? { connect: { id: item.brand_id } } : undefined,
                        unit: { connect: { id: item.unit_id } },
                        quantity: item.quantity
                    }
                })
            }
        }

        const createCanvassQuery = this.prisma.canvass.create({
            data,
            include: this.includedFields
        })

        const auditableData = this.getAuditableDataForCreate(input, rcNumber, this.authUser.user.username)

        console.log('auditableData', auditableData)

        const createCanvassHistoryQuery = this.prisma.canvassHistory.create({
            data: {
                rc_number: rcNumber,
                executed_by: this.authUser.user.username,
                operation: LOG_OPERATION.CREATE,
                json_data: JSON.stringify(auditableData)
            }
        })

        const result = await this.prisma.$transaction([
            createCanvassQuery,
            createCanvassHistoryQuery
        ])

        this.logger.log('Successfully created canvass')

        return result[0]

    }

    async update(id: string, input: UpdateCanvassInput): Promise<Canvass> {
        this.logger.log('update()', input);
    
        const existingItem = await this.findOne(id);
    
        if (input.requested_by_id) {
            const isValidRequestedById = await this.areEmployeesExist([input.requested_by_id], this.authUser);
    
            if (!isValidRequestedById) {
                throw new NotFoundException('Requested by ID not found');
            }
        }
    
        const data: Prisma.CanvassUpdateInput = {
            purpose: input.purpose ?? existingItem.purpose,
            notes: input.notes ?? existingItem.notes,
            requested_by_id: input.requested_by_id ?? existingItem.requested_by_id,
            is_referenced: input.is_referenced ?? existingItem.is_referenced,
        };
    
        const updateCanvassQuery = this.prisma.canvass.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 

        const auditableData = this.getAuditableDataForUpdate(input, existingItem)
        
        console.log('auditableData', auditableData)

        const createCanvassHistoryQuery = this.prisma.canvassHistory.create({
            data: {
                rc_number: existingItem.rc_number,
                executed_by: this.authUser.user.username,
                operation: LOG_OPERATION.UPDATE,
                json_data: JSON.stringify(auditableData),
            },
        });
    
        const result = await this.prisma.$transaction([
            updateCanvassQuery,
            createCanvassHistoryQuery,
        ]);
    
        this.logger.log('Successfully updated canvass');
    
        return result[0];
    }

    async findAll(page: number, pageSize: number, date_requested?: string, requested_by_id?: string): Promise<CanvassesResponse> {
        const skip = (page - 1) * pageSize;

        let whereCondition: any = {
            is_deleted: false,
        };

        if (date_requested) {
            const parsedDate = new Date(date_requested); 
            whereCondition.date_requested = {
                equals: parsedDate,
            };
        }

        if (requested_by_id) {
            whereCondition.requested_by_id = {
                equals: requested_by_id,
            };
        }

        const items = await this.prisma.canvass.findMany({
            include: this.includedFields, 
            where: whereCondition,
            orderBy: {
                rc_number: 'desc'
            },
            skip,
            take: pageSize,
        });

        const totalItems = await this.prisma.canvass.count({
            where: whereCondition,
        });

        console.log('data', items)
        console.log('totalItems', totalItems)
        console.log('currentPage', page)
        console.log('totalPages', Math.ceil(totalItems / pageSize))

        return {
            data: items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
        };
    }

    async findOne(id: string): Promise<FindOneResponse> {
        
        this.logger.log('findOne()', id)

        const item = await this.prisma.canvass.findUnique({
          include: this.includedFields,
          where: { id }
        })

        if(!item){
            throw new NotFoundException('Canvass not found')
        }

        return item
        
    }

    async findByRcNumber(rc_number: string): Promise<Canvass> {
        
        this.logger.log('findByRcNumber()', rc_number)

        const item = await this.prisma.canvass.findUnique({
          include: this.includedFields,
          where: { rc_number }
        })

        if(!item){
            throw new NotFoundException('Canvass not found')
        }

        return item
        
    }

    async findRcNumbers(rcNumber: string): Promise<{ rc_number: string; }[]> {
	
		const arrayOfRcNumbers = await this.prisma.canvass.findMany({
            select: {
                rc_number: true
            },
            where: {
                rc_number: {
                    contains: rcNumber.trim().toLowerCase(),
                    mode: 'insensitive',
                },
                is_deleted: false
            },
            take: 5,
		});
	
		return arrayOfRcNumbers;
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

    async forEmployee(employeeId: string): Promise<Canvass[]> {
        return await this.prisma.canvass.findMany({
            where: {
                requested_by_id: employeeId,
                is_deleted: false
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

    private async areEmployeesExist(employeeIds: string[], authUser: AuthUser): Promise<boolean> {

        this.logger.log('areEmployeesExist', employeeIds);
    
        const query = `
            query {
                validateEmployeeIds(ids: ${JSON.stringify(employeeIds)})
            }
        `;

        console.log('query', query)
    
        try {
            const { data } = await firstValueFrom(
                this.httpService.post(
                    process.env.API_GATEWAY_URL,
                    { query },
                    {
                        headers: {
                            Authorization: authUser.authorization,
                            'Content-Type': 'application/json',
                        },
                    }
                ).pipe(
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
    
            console.log('data', data);
            console.log('data.data.validateEmployeeIds', data.data.validateEmployeeIds)
    
            if (!data || !data.data) {
                console.log('No data returned');
                return false;
            }
    
            return data.data.validateEmployeeIds;
    
        } catch (error) {
            console.error('Error querying employees:', error.message);
            return false;
        }
    }

    private getAuditableDataForCreate(input: CreateCanvassInput, rc_number: string, created_by: string) {

        return {
            rc_number: rc_number,
            date_requested: input.date_requested,
            purpose: input.purpose,
            notes: input.notes,
            requested_by_fullname: input.requested_by_fullname,
            created_by,
            canvass_items: input.canvass_items.map(i => {
                const x = {
                    description: i.description,
                    brand_name: i.brand_name,
                    unit_name: i.unit_name,
                    quantity: i.quantity
                }
                return x
            })
        }

    }

    private getAuditableDataForUpdate(input: UpdateCanvassInput, existingItem: FindOneResponse) {

        console.log('input', input)
        console.log('existingItem', existingItem)

        const data = {}

        if(input.purpose && input.purpose !== existingItem.purpose) {
            console.log('purpose updated')
            data['purpose'] = input.purpose
        }

        if(input.notes && input.notes !== existingItem.notes) {
            console.log('notes updated')
            data['notes'] = input.notes
        }

        if(input.requested_by_id && input.requested_by_id !== existingItem.requested_by_id) {
            console.log('requested_by_id updated')
            data['requested_by_fullname'] = input.requested_by_fullname
        }

        return data

    }

}
