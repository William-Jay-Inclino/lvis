import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SPR } from './entities/spr.entity';
import { CreateSprInput } from './dto/create-spr.input';
import { SprService } from './spr.service';
import { Employee } from '../__employee__/entities/employee.entity';
import { Classification } from '../__classification__/entities/classification.entity';
import { UpdateSprInput } from './dto/update-spr.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { SPRApprover } from '../spr-approver/entities/spr-approver.entity';
import { SprApproverService } from '../spr-approver/spr-approver.service';
import { SprNumber } from './entities/spr-number.entity';
import { SPRsResponse } from './entities/sprs-response.entity';
import { APPROVAL_STATUS, MODULES, RESOLVERS } from '../__common__/types';
import { WarehouseCancelResponse } from '../__common__/classes';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => SPR)
export class SprResolver {

    constructor(
        private readonly sprService: SprService,
        private readonly sprApproverService: SprApproverService
    ) { }

    @Mutation(() => SPR)
    @UseGuards(AccessGuard)
    @CheckAccess(MODULES.SPR, RESOLVERS.createSpr)
    async createSpr(
        @Args('input') createSprInput: CreateSprInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.sprService.setAuthUser(authUser)
        return await this.sprService.create(createSprInput);
    }

    @Query(() => SPRsResponse)
    sprs(
        @Args('page') page: number,
        @Args('pageSize') pageSize: number,
        @Args('date_requested', { nullable: true }) date_requested?: string,
        @Args('requested_by_id', { nullable: true }) requested_by_id?: string,
    ) {
        return this.sprService.findAll(page, pageSize, date_requested, requested_by_id);
    }

    @Query(() => [SprNumber])
    spr_numbers(
        @Args('spr_number') spr_number: string
    ): Promise<{ spr_number: string }[]> {
        return this.sprService.findSprNumbers(spr_number);
    }

    @Query(() => SPR)
    spr(
        @Args('id', { nullable: true }) id?: string,
        @Args('spr_number', { nullable: true }) spr_number?: string,
        @Args('rc_number', { nullable: true }) rc_number?: string
    ) {
        if (id) {
            return this.sprService.findOne(id);
        }
        if (spr_number) {
            return this.sprService.findBySprNumber(spr_number)
        }
        if (rc_number) {
            return this.sprService.findByRcNumber(rc_number)
        }
    }

    @Mutation(() => SPR)
    async updateSpr(
        @Args('id') id: string,
        @Args('input') updateSprInput: UpdateSprInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.sprService.setAuthUser(authUser)
        return await this.sprService.update(id, updateSprInput);
    }

    @Mutation(() => WarehouseCancelResponse)
    async cancelSpr(
        @Args('id') id: string,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.sprService.setAuthUser(authUser)
        return await this.sprService.cancel(id);
    }

    @ResolveField(() => Employee)
    supervisor(@Parent() spr: SPR): any {
        return { __typename: 'Employee', id: spr.supervisor_id }
    }

    @ResolveField(() => Classification, { nullable: true })
    classification(@Parent() spr: SPR): any {
        if (!spr.classification_id) {
            return null
        }
        return { __typename: 'Classification', id: spr.classification_id }
    }

    @ResolveField(() => [SPRApprover])
    spr_approvers(@Parent() spr: SPR): any {
        return this.sprApproverService.findBySprId(spr.id)
    }

    @ResolveField(() => Int)
    async status(@Parent() spr: SPR) {

        if (spr.cancelled_at) {
            return APPROVAL_STATUS.CANCELLED
        }

        return await this.sprService.getStatus(spr.id)

    }

    @ResolveField(() => Boolean)
    async is_referenced(@Parent() spr: SPR) {
        return await this.sprService.isReferenced(spr.id)
    }

}
