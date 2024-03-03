import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RR } from './entities/rr.entity';
import { CreateRrInput } from './dto/create-rr.input';
import { RrService } from './rr.service';
import { Employee } from '../__employee__/entities/employee.entity';
import { UpdateRrInput } from './dto/update-rr.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RrApprover } from '../rr-approver/entities/rr-approver.entity';
import { RrApproverService } from '../rr-approver/rr-approver.service';
import { RrNumber } from './entities/rr-number.entity';
import { RRsResponse } from './entities/rr-response.entity';
import { APPROVAL_STATUS } from '../__common__/types';

@UseGuards(GqlAuthGuard)
@Resolver( () => RR)
export class RrResolver {

    constructor(
        private readonly rrService: RrService,
        private readonly rrApproverService: RrApproverService
    ) {}

    @Mutation(() => RR)
    async createRr(
        @Args('input') createRrInput: CreateRrInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.rrService.setAuthUser(authUser)
        return await this.rrService.create(createRrInput);
    }

    @Query(() => RRsResponse)
    rrs(
        @Args('page') page: number,
        @Args('pageSize') pageSize: number,
        @Args('date_requested', {nullable: true}) date_requested?: string,
        @Args('requested_by_id', {nullable: true}) requested_by_id?: string,
    ) {
        return this.rrService.findAll(page, pageSize, date_requested, requested_by_id);
    }

    @Query(() => [RrNumber])
    rr_numbers(
      @Args('rr_number') rr_number: string
    ): Promise<{ rr_number: string }[]> {
      return this.rrService.findRrNumbers(rr_number);
    }

    @Query(() => RR)
    rr(
        @Args('id', {nullable: true}) id?: string,
        @Args('rr_number', {nullable: true}) rr_number?: string,
        @Args('po_number', {nullable: true}) po_number?: string,
    ) {
        if(id){
            return this.rrService.findOne(id);
        }
        if(rr_number){
            return this.rrService.findByRrNumber(rr_number)
        }
        if(po_number){
            return this.rrService.findByPoNumber(po_number)
        }
    }

    @Mutation(() => RR)
    async updateRr(
      @Args('id') id: string,
      @Args('input') updateRrInput: UpdateRrInput,
      @CurrentAuthUser() authUser: AuthUser
    ) {
        this.rrService.setAuthUser(authUser)
        return await this.rrService.update(id, updateRrInput);
    }

    @ResolveField( () => Employee, { nullable: true })
    canceller(@Parent() rr: RR): any {
        if(!rr.canceller_id){
            return null
        }
        return { __typename: 'Employee', id: rr.canceller_id }
    }

    @ResolveField( () => [RrApprover])
    rr_approvers(@Parent() rr: RR): any {
        return this.rrApproverService.findByRrId(rr.id)
    }

    @ResolveField( () => Employee)
    received_by(@Parent() rr: RR): any {
        return { __typename: 'Employee', id: rr.received_by_id }
    }

    @ResolveField( () => Int)
    async status(@Parent() rr: RR) {
        
        if(rr.is_cancelled) {
            return APPROVAL_STATUS.CANCELLED
        }

        return await this.rrService.getStatus(rr.id)

    }


}
