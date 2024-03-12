import { Resolver } from '@nestjs/graphql';
import { Classification } from './entities/classification.entity';
import { RvService } from '../rv/rv.service';

@Resolver(() => Classification)
export class ClassificationResolver {
    constructor(
        private readonly rvService: RvService
    ) { }

    // @ResolveField( () => [RV])
    // rvs(@Parent() classification: Classification) {
    //     return this.rvService.forClassification(classification.id)
    // }

}
