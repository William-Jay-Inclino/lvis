import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RV } from './entities/rv.entity';
import { CreateRvInput } from './dto/create-rv.input';
import { RvService } from './rv.service';
import { Employee } from '../__employee__/entities/employee.entity';
import { Classification } from '../__classification__/entities/classification.entity';
import { UpdateRvInput } from './dto/update-rv.input';
import { CurrentAuthUser } from '../auth/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RVApprover } from '../rv-approver/entities/rv-approver.entity';
import { RvApproverService } from '../rv-approver/rv-approver.service';

@UseGuards(GqlAuthGuard)
@Resolver( () => RV)
export class RvResolver {

    constructor(
        private readonly rvService: RvService,
        private readonly rvApproverService: RvApproverService
    ) {}

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
    rv(
        @Args('id') id: string,
        @Args('rv_number') rv_number: string
    ) {
        if(id){
            return this.rvService.findOne(id);
        }
        if(rv_number){
            return this.rvService.findByRvNumber(rv_number)
        }
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

    @ResolveField( () => [RVApprover])
    rv_approvers(@Parent() rv: RV): any {
        return this.rvApproverService.findByRvId(rv.id)
    }

}
