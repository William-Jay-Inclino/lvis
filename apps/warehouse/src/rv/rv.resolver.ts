import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RV } from './entities/rv.entity';
import { CreateRvInput } from './dto/create-rv.input';
import { RvService } from './rv.service';
import { Employee } from '../__employee__/entities/employee.entity';
import { Classification } from '../__classification__/entities/classification.entity';
import { UpdateRvInput } from './dto/update-rv.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RVApprover } from '../rv-approver/entities/rv-approver.entity';
import { RvApproverService } from '../rv-approver/rv-approver.service';
import { RvNumber } from './entities/rv-number.entity';
import { RVsResponse } from './entities/rvs-response.entity';
import { APPROVAL_STATUS, MODULES, RESOLVERS } from '../__common__/types';
import { WarehouseCancelResponse } from '../__common__/classes';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => RV)
export class RvResolver {

    constructor(
        private readonly rvService: RvService,
        private readonly rvApproverService: RvApproverService
    ) { }

    @Mutation(() => RV)
    @UseGuards(AccessGuard)
    @CheckAccess(MODULES.RV, RESOLVERS.createRv)
    async createRv(
        @Args('input') createRvInput: CreateRvInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.rvService.setAuthUser(authUser)
        return await this.rvService.create(createRvInput);
    }

    @Query(() => RVsResponse)
    rvs(
        @Args('page') page: number,
        @Args('pageSize') pageSize: number,
        @Args('date_requested', { nullable: true }) date_requested?: string,
        @Args('requested_by_id', { nullable: true }) requested_by_id?: string,
    ) {
        return this.rvService.findAll(page, pageSize, date_requested, requested_by_id);
    }

    @Query(() => [RvNumber])
    rv_numbers(
        @Args('rv_number') rv_number: string
    ): Promise<{ rv_number: string }[]> {
        return this.rvService.findRvNumbers(rv_number);
    }

    @Query(() => RV)
    rv(
        @Args('id', { nullable: true }) id?: string,
        @Args('rv_number', { nullable: true }) rv_number?: string,
        @Args('rc_number', { nullable: true }) rc_number?: string
    ) {
        if (id) {
            return this.rvService.findOne(id);
        }
        if (rv_number) {
            return this.rvService.findByRvNumber(rv_number)
        }
        if (rc_number) {
            return this.rvService.findByRcNumber(rc_number)
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

    @Mutation(() => WarehouseCancelResponse)
    async cancelRv(
        @Args('id') id: string,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.rvService.setAuthUser(authUser)
        return await this.rvService.cancel(id);
    }

    @ResolveField(() => Employee)
    supervisor(@Parent() rv: RV): any {
        return { __typename: 'Employee', id: rv.supervisor_id }
    }

    @ResolveField(() => Classification, { nullable: true })
    classification(@Parent() rv: RV): any {
        if (!rv.classification_id) {
            return null
        }
        return { __typename: 'Classification', id: rv.classification_id }
    }

    @ResolveField(() => [RVApprover])
    rv_approvers(@Parent() rv: RV): any {
        return this.rvApproverService.findByRvId(rv.id)
    }

    @ResolveField(() => Int)
    async status(@Parent() rv: RV) {

        if (rv.cancelled_at) {
            return APPROVAL_STATUS.CANCELLED
        }

        return await this.rvService.getStatus(rv.id)

    }

    @ResolveField(() => Boolean)
    async is_referenced(@Parent() rv: RV) {
        return await this.rvService.isReferenced(rv.id)
    }

}
