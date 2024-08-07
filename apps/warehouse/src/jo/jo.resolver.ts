import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JO } from './entities/jo.entity';
import { CreateJoInput } from './dto/create-jo.input';
import { JoService } from './jo.service';
import { Employee } from '../__employee__/entities/employee.entity';
import { Classification } from '../__classification__/entities/classification.entity';
import { UpdateJoInput } from './dto/update-jo.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { JOApprover } from '../jo-approver/entities/jo-approver.entity';
import { JoApproverService } from '../jo-approver/jo-approver.service';
import { JoNumber } from './entities/jo-number.entity';
import { JOsResponse } from './entities/jos-response.entity';
import { APPROVAL_STATUS, MODULES, RESOLVERS } from '../__common__/types';
import { WarehouseCancelResponse, WarehouseRemoveResponse } from '../__common__/classes';
import { Department } from '../__department__ /entities/department.entity';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';
import { UpdateJoByBudgetOfficerInput } from './dto/update-jo-by-budget-officer.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => JO)
export class JoResolver {

    constructor(
        private readonly joService: JoService,
        private readonly joApproverService: JoApproverService
    ) { }

    @Mutation(() => JO)
    @UseGuards(AccessGuard)
    @CheckAccess(MODULES.JO, RESOLVERS.createJo)
    async createJo(
        @Args('input') createJoInput: CreateJoInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.joService.setAuthUser(authUser)
        return await this.joService.create(createJoInput);
    }

    @Query(() => JOsResponse)
    jos(
        @Args('page') page: number,
        @Args('pageSize') pageSize: number,
        @Args('date_requested', { nullable: true }) date_requested?: string,
        @Args('requested_by_id', { nullable: true }) requested_by_id?: string,
    ) {
        return this.joService.findAll(page, pageSize, date_requested, requested_by_id);
    }

    @Query(() => [JO])
    jos_by_jo_number(
        @Args('jo_number') jo_number: string,
        @Args('is_detail_included', { nullable: true }) is_detail_included?: boolean,
    ){
        return this.joService.findJOsByJoNumber(jo_number, is_detail_included);
    }

    @Query(() => JO)
    jo(
        @Args('id', { nullable: true }) id?: string,
        @Args('jo_number', { nullable: true }) jo_number?: string,
        @Args('rc_number', { nullable: true }) rc_number?: string
    ) {
        if (id) {
            return this.joService.findOne(id);
        }
        if (jo_number) {
            return this.joService.findByJoNumber(jo_number)
        }
        if (rc_number) {
            return this.joService.findByRcNumber(rc_number)
        }
    }

    @Mutation(() => JO)
    async updateJo(
        @Args('id') id: string,
        @Args('input') updateJoInput: UpdateJoInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.joService.setAuthUser(authUser)
        return await this.joService.update(id, updateJoInput);
    }

    @Mutation(() => WarehouseRemoveResponse)
    async update_jo_classification_and_jo_approver(
        @Args('id') id: string,
        @Args('input') input: UpdateJoByBudgetOfficerInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.joService.setAuthUser(authUser)
        return await this.joService.updateClassificationByBudgetOfficer(id, input);
    }

    @Mutation(() => WarehouseCancelResponse)
    async cancelJo(
        @Args('id') id: string,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.joService.setAuthUser(authUser)
        return await this.joService.cancel(id);
    }

    @ResolveField(() => Employee)
    supervisor(@Parent() jo: JO): any {
        return { __typename: 'Employee', id: jo.supervisor_id }
    }

    @ResolveField(() => Classification, { nullable: true })
    classification(@Parent() jo: JO): any {
        if (!jo.classification_id) {
            return null
        }
        return { __typename: 'Classification', id: jo.classification_id }
    }

    @ResolveField(() => Department, { nullable: true })
    department(@Parent() jo: JO): any {
        return { __typename: 'Department', id: jo.department_id }
    }

    @ResolveField(() => [JOApprover])
    jo_approvers(@Parent() jo: JO): any {
        return this.joApproverService.findByJoId(jo.id)
    }

    @ResolveField(() => Int)
    async status(@Parent() jo: JO) {

        if (jo.cancelled_at) {
            return APPROVAL_STATUS.CANCELLED
        }

        return await this.joService.getStatus(jo.id)

    }

    @ResolveField(() => Boolean)
    async is_referenced(@Parent() jo: JO) {
        return await this.joService.isReferenced(jo.id)
    }

    @ResolveField(() => Boolean)
    can_update(
        @Parent() jo: JO,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.joService.setAuthUser(authUser)
        return this.joService.canUpdateForm(jo.id)
    }

}
