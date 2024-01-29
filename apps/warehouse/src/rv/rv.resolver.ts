import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RV } from './entities/rv.entity';
import { CreateRvInput } from './dto/create-rv.input';
import { RvService } from './rv.service';

@Resolver()
export class RvResolver {

    constructor(private readonly rvService: RvService) {}

    @Mutation(() => RV)
    createRv(@Args('input') createRvInput: CreateRvInput) {
        return this.rvService.create(createRvInput);
    }

    @Query(() => [RV])
    rvs() {
        return this.rvService.findAll();
    }

    @Query(() => RV)
    rv(@Args('id') id: string) {
        return this.rvService.findOne(id);
    }

    // @ResolveField( () => Employee)
    // supervisor(@Parent() rv: RV): any {
    //     return { __typename: 'Supervisor', id: rv.supervisor_id }
    // }

    // @ResolveField( () => Employee)
    // canceller(@Parent() rv: RV): any {
    //     return { __typename: 'Canceller', id: rv.canceller_id }
    // }

}
