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
import { POApprover } from './entities/po-approver.entity';
import { PoApproverService } from '../po-approver/po-approver.service';
import { PoNumber } from './entities/po-number.entity';
import { POsResponse } from './entities/pos-response.entity';
import { APPROVAL_STATUS } from '../__common__/types';

@UseGuards(GqlAuthGuard)
@Resolver( () => PO)
export class PoResolver {

    constructor(
        private readonly poService: PoService,
        private readonly poApproverService: PoApproverService
    ) {}

    @Mutation(() => PO)
    async createPo(
        @Args('input') createPoInput: CreatePoInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.poService.setAuthUser(authUser)
        return await this.poService.create(createPoInput);
    }

    @Query(() => POsResponse)
    pos(
        @Args('page') page: number,
        @Args('pageSize') pageSize: number,
        @Args('date_requested', {nullable: true}) date_requested?: string,
        @Args('requested_by_id', {nullable: true}) requested_by_id?: string,
    ) {
        return this.poService.findAll(page, pageSize, date_requested, requested_by_id);
    }

    @Query(() => [PoNumber])
    po_numbers(
      @Args('po_number') po_number: string
    ): Promise<{ po_number: string }[]> {
      return this.poService.findPoNumbers(po_number);
    }

    @Query(() => PO)
    po(
        @Args('id', {nullable: true}) id?: string | null,
        @Args('po_number', {nullable: true}) po_number?: string | null,
        @Args('meqs_number', {nullable: true}) meqs_number?: string | null,
    ) {
        if(id){
            return this.poService.findOne(id);
        }
        if(po_number){
            return this.poService.findByPoNumber(po_number)
        }
        if(meqs_number){
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

    @ResolveField( () => Employee, { nullable: true })
    canceller(@Parent() po: PO): any {
        if(!po.canceller_id){
            return null
        }
        return { __typename: 'Employee', id: po.canceller_id }
    }

    @ResolveField( () => [POApprover])
    po_approvers(@Parent() po: PO): any {
        return this.poApproverService.findByPoId(po.id)
    }

    @ResolveField( () => Int)
    async status(@Parent() po: PO) {
        
        if(po.canceller_id) {
            return APPROVAL_STATUS.CANCELLED
        }

        return await this.poService.getStatus(po.id)

    }


}
