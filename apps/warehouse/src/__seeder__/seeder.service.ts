import { Injectable } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import * as data from './mock-data';

@Injectable()
export class SeederService {

    constructor(private readonly prisma: PrismaService) {}

    async seedData() {
        console.log('Seeding data...');
    }

    async seedSupplier() {
        console.log('seeding supplier table...')
        try {
            await this.prisma.supplier.createMany({ data: data.suppliers })
        } catch (error) {
            console.error(error)            
        }
    }

    async seedUnit() {
        console.log('seeding unit table...')
        try {
            await this.prisma.unit.createMany({ data: data.units })
        } catch (error) {
            console.error(error)            
        }
    }

    async seedBrand() {
        console.log('seeding brand table...')
        try {
            await this.prisma.brand.createMany({ data: data.brands })
        } catch (error) {
            console.error(error)            
        }
    }

    async seedVehicle() {
        console.log('seeding vehicle table...')
        try {
            await this.prisma.vehicle.createMany({ data: data.vehicles })
        } catch (error) {
            console.error(error)            
        }
    }

}
