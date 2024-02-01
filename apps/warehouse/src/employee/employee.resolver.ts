import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Canvass } from '../canvass/entities/canvass.entity';
import { Employee } from './entities/employee.entity';
import { CanvassService } from '../canvass/canvass.service';
import { RvService } from '../rv/rv.service';
import { RV } from '../rv/entities/rv.entity';
import { RvApproverService } from '../rv-approver/rv-approver.service';
import { RVApprover } from '../rv-approver/entities/rv-approver.entity';
import { MEQS } from '../meqs/entities/meq.entity';
import { MeqsService } from '../meqs/meqs.service';

@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(
        private readonly canvassService: CanvassService,
        private readonly rvService: RvService,
        private readonly rvApproverService: RvApproverService,
        private readonly meqsService: MeqsService,
    ) {}

    @ResolveField( () => [Canvass])
    canvasses(@Parent() employee: Employee) {
        return this.canvassService.forEmployee(employee.id)
    }

    @ResolveField( () => [RV])
    rvs_supervised(@Parent() employee: Employee) {
        return this.rvService.forEmployeeSupervisor(employee.id)
    }

    @ResolveField( () => [RV])
    rvs_cancelled(@Parent() employee: Employee) {
        return this.rvService.forEmployeeCanceller(employee.id)
    }

    @ResolveField( () => [RVApprover])
    rv_approvals(@Parent() employee: Employee) {
        return this.rvApproverService.forEmployee(employee.id)
    }

    @ResolveField( () => [MEQS])
    meqs(@Parent() employee: Employee) {
        return this.meqsService.forEmployee(employee.id)
    }

}
