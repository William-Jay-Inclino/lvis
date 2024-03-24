import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PO } from './entities/po.entity';
import { CreatePoInput } from './dto/create-po.input';
import { PoService } from './po.service';
import { Employee } from '../__employee__/entities/employee.entity';
import { UpdatePoInput } from './dto/update-po.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { PoApproverService } from '../po-approver/po-approver.service';
import { PoNumber } from './entities/po-number.entity';
import { POsResponse } from './entities/pos-response.entity';
import { APPROVAL_STATUS, MODULES, RESOLVERS } from '../__common__/types';
import { POApprover } from '../po-approver/entities/po-approver.entity';
import { WarehouseCancelResponse } from '../__common__/classes';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => PO)
export class PoResolver {

    constructor(
        private readonly poService: PoService,
        private readonly poApproverService: PoApproverService
    ) { }

    @Mutation(() => PO)
    @UseGuards(AccessGuard)
    @CheckAccess(MODULES.PO, RESOLVERS.createPo)
    async createPo(
        @Args('input') createPoInput: CreatePoInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.poService.setAuthUser(authUser)
        return await this.poService.create(createPoInput);
    }

    @Query(() => POsResponse)
    @UseGuards(AccessGuard)
    @CheckAccess(MODULES.PO, RESOLVERS.pos)
    pos(
        @Args('page') page: number,
        @Args('pageSize') pageSize: number,
        @Args('date_requested', { nullable: true }) date_requested?: string,
        @Args('requested_by_id', { nullable: true }) requested_by_id?: string,
    ) {
        return this.poService.findAll(page, pageSize, date_requested, requested_by_id);
    }

    @Query(() => [PoNumber])
    @UseGuards(AccessGuard)
    @CheckAccess(MODULES.PO, RESOLVERS.po_numbers)
    po_numbers(
        @Args('po_number') po_number: string
    ): Promise<{ po_number: string }[]> {
        return this.poService.findPoNumbers(po_number);
    }

    @Query(() => PO)
    @UseGuards(AccessGuard)
    @CheckAccess(MODULES.PO, RESOLVERS.po)
    po(
        @Args('id', { nullable: true }) id?: string | null,
        @Args('po_number', { nullable: true }) po_number?: string | null,
        @Args('meqs_number', { nullable: true }) meqs_number?: string | null,
    ) {
        if (id) {
            return this.poService.findOne(id);
        }
        if (po_number) {
            return this.poService.findByPoNumber(po_number)
        }
        if (meqs_number) {
            return this.poService.findByMeqsNumber(meqs_number)
        }
    }

    @Mutation(() => PO)
    async updatePo(
        @Args('id') id: string,
        @Args('input') updatePoInput: UpdatePoInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.poService.setAuthUser(authUser)
        return await this.poService.update(id, updatePoInput);
    }

    @Mutation(() => WarehouseCancelResponse)
    async cancelPo(
        @Args('id') id: string,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.poService.setAuthUser(authUser)
        return await this.poService.cancel(id);
    }

    @ResolveField(() => [POApprover])
    po_approvers(@Parent() po: PO): any {
        return this.poApproverService.findByPoId(po.id)
    }

    @ResolveField(() => Int)
    async status(@Parent() po: PO) {

        if (po.cancelled_at) {
            return APPROVAL_STATUS.CANCELLED
        }

        return await this.poService.getStatus(po.id)

    }


}
