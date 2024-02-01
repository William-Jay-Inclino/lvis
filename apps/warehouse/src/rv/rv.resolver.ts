import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RV } from './entities/rv.entity';
import { CreateRvInput } from './dto/create-rv.input';
import { RvService } from './rv.service';
import { Employee } from '../employee/entities/employee.entity';
import { Classification } from '../classification/entities/classification.entity';
import { UpdateRvInput } from './dto/update-rv.input';
import { CurrentAuthUser } from '../auth/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver( () => RV)
export class RvResolver {

    constructor(private readonly rvService: RvService) {}

    @Mutation(() => RV)
    async createRv(
        @Args('input') createRvInput: CreateRvInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.rvService.setAuthUser(authUser)
        return await this.rvService.create(createRvInput);
    }

    @Query(() => [RV])
    rvs() {
        return this.rvService.findAll();
    }

    @Query(() => RV)
    rv(@Args('id') id: string) {
        return this.rvService.findOne(id);
    }

    @Mutation(() => RV)
    async updateRv(
      @Args('id') id: string,
      @Args('input') updateRvInput: UpdateRvInput,
      @CurrentAuthUser() authUser: AuthUser
    ) {
        this.rvService.setAuthUser(authUser)
        return await this.rvService.update(id, updateRvInput);
    }

    @ResolveField( () => Employee)
    supervisor(@Parent() rv: RV): any {
        return { __typename: 'Employee', id: rv.supervisor_id }
    }

    @ResolveField( () => Employee, { nullable: true })
    canceller(@Parent() rv: RV): any {
        if(!rv.canceller_id){
            return null
        }
        return { __typename: 'Employee', id: rv.canceller_id }
    }

    @ResolveField( () => Classification, { nullable: true })
    classification(@Parent() rv: RV): any {
        if(!rv.classification_id){
            return null
        }
        return { __typename: 'Classification', id: rv.classification_id }
    }

}
