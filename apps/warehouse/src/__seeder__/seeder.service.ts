import { Injectable } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import * as data from './mock-data';

@Injectable()
export class SeederService {

    constructor(private readonly prisma: PrismaService) {}

    async seedData() {
        console.log('Seeding data...');
    
        try {
            await this.prisma.$transaction([
                this.seedSupplier(),
                this.seedStation(),
                this.seedUnit(),
                this.seedBrand(),
                this.seedVehicle()
            ]
                
            );
            console.log('Seeding done')
          } catch (error) {
            console.error('Transaction failed. Rolling back...', error);
          }
    }

    seedSupplier() {
        console.log('seeding supplier table...')
        try {
            return this.prisma.supplier.createMany({ data: data.suppliers })
        } catch (error) {
            console.error(error)            
        }
    }

    seedStation() {
        console.log('seeding station table...')
        try {
            return this.prisma.station.createMany({ data: data.stations })
        } catch (error) {
            console.error(error)            
        }
    }

    seedUnit() {
        console.log('seeding unit table...')
        try {
            return this.prisma.unit.createMany({ data: data.units })
        } catch (error) {
            console.error(error)            
        }
    }

    seedBrand() {
        console.log('seeding brand table...')
        try {
            return this.prisma.brand.createMany({ data: data.brands })
        } catch (error) {
            console.error(error)            
        }
    }

    seedVehicle() {
        console.log('seeding vehicle table...')
        try {
            return this.prisma.vehicle.createMany({ data: data.vehicles })
        } catch (error) {
            console.error(error)            
        }
    }

}
