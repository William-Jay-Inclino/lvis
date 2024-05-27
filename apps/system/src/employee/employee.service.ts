import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Employee, Prisma } from 'apps/system/prisma/generated/client';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { EmployeesResponse } from './entities/employees-response.entity';
import { AuthUser } from '../__common__/auth-user.entity';
import axios from 'axios';

@Injectable()
export class EmployeeService {

	private readonly logger = new Logger(EmployeeService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateEmployeeInput): Promise<Employee> {

		const data: Prisma.EmployeeCreateInput = {
			created_by: this.authUser.user.username,
			firstname: input.firstname,
			middlename: input.middlename,
			lastname: input.lastname,
			position: input.position,
			signature_src: input.signature_src,
		}

		const created = await this.prisma.employee.create({ data })

		this.logger.log('Successfully created Employee')

		return created

	}

	async findAll(
		page: number,
		pageSize: number,
		searchValue?: string
	): Promise<EmployeesResponse> {

		const skip = (page - 1) * pageSize;

		let whereCondition: any = {
			deleted_at: null
		};

		if (!!searchValue) {
			whereCondition = {
				OR: [
					{ lastname: { contains: searchValue.trim(), mode: 'insensitive' } },
					{ firstname: { contains: searchValue.trim(), mode: 'insensitive' } },
					{ middlename: { contains: searchValue.trim(), mode: 'insensitive' } },
				],
			};
		}

		const items = await this.prisma.employee.findMany({
			include: {
				user_employee: true
			},
			orderBy: [{ lastname: 'asc' }, { firstname: 'asc' }],
			skip,
			take: pageSize,
			where: whereCondition,
		});

		const totalItems = await this.prisma.employee.count({
			where: whereCondition,
		});

		return {
			data: items,
			totalItems,
			currentPage: page,
			totalPages: Math.ceil(totalItems / pageSize),
		};
	}

	async findOne(id: string): Promise<Employee | null> {

		this.logger.log('findOne', id)

		const item = await this.prisma.employee.findUnique({
			where: { id }
		})

		console.log('item', item, id)

		if (!item) {
			throw new NotFoundException('Employee not found')
		}

		return item
	}

	async update(id: string, input: UpdateEmployeeInput): Promise<Employee> {

		const existingItem = await this.findOne(id)

		const data: Prisma.EmployeeUpdateInput = {
			updated_by: this.authUser.user.username,
			firstname: input.firstname ?? existingItem.firstname,
			middlename: input.middlename ?? existingItem.middlename,
			lastname: input.lastname ?? existingItem.lastname,
			position: input.position ?? existingItem.position,
			signature_src: input.signature_src ?? existingItem.signature_src,
			is_budget_officer: input.is_budget_officer ?? existingItem.is_budget_officer,
			is_finance_manager: input.is_finance_manager ?? existingItem.is_finance_manager,
		}


		const updated = await this.prisma.employee.update({
			data,
			where: {
				id
			}
		})

		if(!!input.signature_src && !!existingItem.signature_src && existingItem.signature_src.trim() !== '') {
			this.deleteFiles([existingItem.signature_src])
			console.log('previous file deleted');
		}

		this.logger.log('Successfully updated Employee')

		return updated

	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.employee.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "Employee successfully deleted"
		}

	}

	async validateEmployeeIds(ids: string[]): Promise<boolean> {
		// Remove duplicates from the ids array
		const uniqueIds = Array.from(new Set(ids));
	
		const existingIds = await this.prisma.employee.findMany({
			where: {
				id: { in: uniqueIds }
			},
			select: { id: true }
		});
	
		console.log('existingIds', existingIds);
		console.log('uniqueIds', uniqueIds);
	
		return existingIds.length === uniqueIds.length;
	}
	

	async findByIds(ids: string[]): Promise<Employee[]> {

		this.logger.log('findByIds', ids)

		return await this.prisma.employee.findMany({
			where: {
				id: { in: ids }
			}
		})

	}

	async findEmployeesByName(name: string): Promise<{
		id: string,
		firstname: string,
		middlename: string,
		lastname: string,
	}[]> {

		const employees = await this.prisma.employee.findMany({
			select: {
				id: true,
				firstname: true,
				middlename: true,
				lastname: true
			},
			where: {
				deleted_at: null,
				OR: [
					{ lastname: { contains: name.trim(), mode: 'insensitive' } },
					{ firstname: { contains: name.trim(), mode: 'insensitive' } },
					{ middlename: { contains: name.trim(), mode: 'insensitive' } },
				],
			},
			take: 5,
		});

		return employees;
	}

	async findAllBudgetOfficers(): Promise<Employee[]> {

		const budgetOfficers = await this.prisma.employee.findMany({
			where: {
				deleted_at: null,
				is_budget_officer: true
			}
		})

		return budgetOfficers

	}

	async findAllFinanceManagers(): Promise<Employee[]> {

		const budgetOfficers = await this.prisma.employee.findMany({
			where: {
				deleted_at: null,
				is_finance_manager: true
			}
		})

		return budgetOfficers

	}

    private async deleteFiles(filePaths: string[]) {

        console.log('deleteFiles', filePaths)

        const url = process.env.API_URL + '/api/v1/file-upload/system/employee'

        console.log('url', url)

        return axios.delete(url, { data: filePaths });
    }

}
