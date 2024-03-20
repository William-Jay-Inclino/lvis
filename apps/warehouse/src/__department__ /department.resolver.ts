import { Resolver } from '@nestjs/graphql';
import { Department } from './entities/department.entity';
import { JoService } from '../jo/jo.service';

@Resolver(() => Department)
export class DepartmentResolver {
    constructor(
        private readonly joService: JoService
    ) { }

    // @ResolveField( () => [RV])
    // rvs(@Parent() classification: Classification) {
    //     return this.rvService.forClassification(classification.id)
    // }

}
