import { Injectable } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import * as data from './mock-data';

@Injectable()
export class SeederService {

    constructor(private readonly prisma: PrismaService) {}

    async seedData() {
        console.log('Seeding data...');
    
        try {
            await this.prisma.$transaction(async () => {
              await this.seedService();
              await this.seedFeature();
              await this.seedModule();
              await this.seedSubModule();
              await this.seedDepartment();
              await this.seedClassification();
              await this.seedEmployee();
              await this.seedJOApproverSetting();
              await this.seedRVApproverSetting();
              await this.seedSPRApproverSetting();
              await this.seedMEQSApproverSetting();
              await this.seedPOApproverSetting();
              await this.seedUserTable();
              await this.seedUserEmployeeTable();
            });
            
            console.log('Seeding done')
          } catch (error) {
            console.error('Transaction failed. Rolling back...', error);
          }
    }

    async seedService() {
        console.log('seeding service table...')
        try {
            await this.prisma.service.createMany({ data: data.services })
        } catch (error) {
            console.error(error)            
        }
    }
    
    async seedFeature() {
        console.log('seeding feature table...')
        try {
            await this.prisma.feature.createMany({ data: data.features })
        } catch (error) {
            console.error(error)            
        }
    }

    async seedModule() {
        console.log('seeding module table...')
        try {
            await this.prisma.module.createMany({ data: data.modules })
        } catch (error) {
            console.error(error)           
        }
    }

    async seedSubModule() {
        console.log('seeding submodule table...')
        try {
            await this.prisma.subModule.createMany({ data: data.subModules })
        } catch (error) {
            console.error(error)           
        }
    }

    async seedDepartment() {
        console.log('seeding department table...')

        try {
            await this.prisma.department.createMany({
                data: data.departments
            })
        } catch (error) {
            console.error(error)  
        }

    }

    async seedClassification() {
        console.log('seeding classification table...')

        try {
            await this.prisma.classification.createMany({
                data: data.classifications
            })
        } catch (error) {
            console.error(error)  
        }


    }

    async seedEmployee() {
        console.log('seeding employee table...')

        try {
            await this.prisma.employee.createMany({
                data: data.employees
            })
        } catch (error) {
            console.error(error)  
        }


    }

    async seedJOApproverSetting() {
        console.log('seeding jo_approver_setting table...')

        try {
            await this.prisma.jOApproverSetting.createMany({
                data: data.jo_default_approvers,
            })
        } catch (error) {
            console.error(error)  
        }


    }

    async seedRVApproverSetting() {
        console.log('seeding rv_approver_setting table...')

        try {
            await this.prisma.rVApproverSetting.createMany({
                data: data.rv_default_approvers,
            })
        } catch (error) {
            console.error(error)  
        }


    }

    async seedSPRApproverSetting() {
        console.log('seeding spr_approver_setting table...')

        try {
            await this.prisma.sPRApproverSetting.createMany({
                data: data.spr_default_approvers,
            })
        } catch (error) {
            console.error(error)  
        }


    }

    async seedMEQSApproverSetting() {
        console.log('seeding meqs_approver_setting table...')

        try {
            await this.prisma.mEQSApproverSetting.createMany({
                data: data.meqs_default_approvers,
            })
        } catch (error) {
            console.error(error)  
        }


    }

    async seedPOApproverSetting() {
        console.log('seeding po_approver_setting table...')

        try {
            await this.prisma.pOApproverSetting.createMany({
                data: data.po_default_approvers,
            })
        } catch (error) {
            console.error(error)  
        }


    }

    async seedUserTable() {
        console.log('seeding user table...')

        try {
            await this.prisma.user.createMany({
                data: data.users,
            })
        } catch (error) {
            console.error(error)  
        }

    }

    async seedUserEmployeeTable() {
        console.log('seeding user_employee table...')

        try {
            await this.prisma.userEmployee.createMany({
                data: data.userEmployees,
            })
        } catch (error) {
            console.error(error)  
        }

    }

}
