import { Injectable } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
// import * as data from './mock-data';

@Injectable()
export class SeederService {

    constructor(private readonly prisma: PrismaService) {}

    async seedData() {
        console.log('Seeding data...');
    }


}
