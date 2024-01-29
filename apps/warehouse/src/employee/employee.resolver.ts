import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Canvass } from '../canvass/entities/canvass.entity';
import { Employee } from './entities/employee.entity';
import { CanvassService } from '../canvass/canvass.service';
import { RvService } from '../rv/rv.service';
import { RV } from '../rv/entities/rv.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(
        private readonly canvassService: CanvassService,
        private readonly rvService: RvService
    ) {}

    @ResolveField( () => [Canvass])
    canvasses(@Parent() employee: Employee) {
        return this.canvassService.forEmployee(employee.id)
    }

    @ResolveField( () => [RV])
    rvs_supervisor(@Parent() employee: Employee) {
        return this.rvService.forEmployeeSupervisor(employee.id)
    }

    @ResolveField( () => [RV])
    rvs_canceller(@Parent() employee: Employee) {
        return this.rvService.forEmployeeCanceller(employee.id)
    }

}
