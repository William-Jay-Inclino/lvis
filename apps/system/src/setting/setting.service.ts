import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';

@Injectable()
export class SettingService {

    constructor(private readonly prisma: PrismaService) { }
    
    async findGM() {

        console.log('findGM()');
        
        const item = await this.prisma.setting.findUnique({
        where: {
            key: 'general_manager'
        }
        })

        if(!item) {
            throw new NotFoundException('key general_manager in setting table not found')
        }

        const employee = await this.prisma.employee.findUnique({
            where: { id: item.value }
        })

        if(!employee) {
            throw new NotFoundException('Employee not found with id of ' + item.value)
        }

        return employee

    }
}
