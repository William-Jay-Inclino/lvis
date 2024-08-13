import { Injectable, Logger } from '@nestjs/common';
import { Pending } from 'apps/warehouse/prisma/generated/client';
import { PrismaService } from '../__prisma__/prisma.service';

@Injectable()
export class PendingService {

  private readonly logger = new Logger(PendingService.name)

  constructor(
    private readonly prisma: PrismaService,
) { }

  async findPendingsByApproverId(approverId: string): Promise<Pending[]> {
    
    const pendings = await this.prisma.pending.findMany({
      where: {
        approver_id: approverId
      },
      take: 100
    })

    return pendings

  }

  async getTotalPendingsByApproverId(approverId: string): Promise<Number> {
    
    const totalPendings = await this.prisma.pending.count({
      where: {
        approver_id: approverId
      }
    })

    console.log('totalPendings', totalPendings);

    return totalPendings

  }
}
