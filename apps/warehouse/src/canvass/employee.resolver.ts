import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Employee } from './entities/employee.entity';
import { CanvassService } from './canvass.service';
import { Canvass } from './entities/canvass.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(private readonly canvassService: CanvassService) {}

    @ResolveField( () => [Canvass])
    canvasses(@Parent() employee: Employee) {
        return this.canvassService.forEmployee(employee.id)
    }

}
