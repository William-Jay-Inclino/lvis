import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { MeqsService } from './meqs.service';
import { MEQS } from './entities/meq.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { CreateMeqsInput } from './dto/create-meqs.input';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateMeqsInput } from './dto/update-meqs.input';
import { Employee } from '../__employee__/entities/employee.entity';
import { MEQSApprover } from '../meqs-approver/entities/meqs-approver.entity';
import { MeqsApproverService } from '../meqs-approver/meqs-approver.service';
import { MeqsNumber } from './entities/meqs-number.entity';
import { MEQSsResponse } from './entities/meqs-response.entity';

@UseGuards(GqlAuthGuard)
@Resolver( () => MEQS)
export class MeqsResolver {

    constructor(
        private readonly meqsService: MeqsService,
        private readonly meqsApproverService: MeqsApproverService
    ) {}

    @Mutation(() => MEQS)
    async createMeqs(
        @Args('input') createMeqsInput: CreateMeqsInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.meqsService.setAuthUser(authUser)
        return await this.meqsService.create(createMeqsInput);
    }

    @Query(() => MEQSsResponse)
    meqs(
      @Args('page') page: number,
      @Args('pageSize') pageSize: number,
      @Args('date_requested', {nullable: true}) date_requested?: string,
      @Args('requested_by_id', {nullable: true}) requested_by_id?: string,
    ) {
        return this.meqsService.findAll(page, pageSize, date_requested, requested_by_id);
    }

    @Query(() => [MeqsNumber])
    meqs_numbers(
      @Args('meqs_number') meqs_number: string
    ): Promise<{ meqs_number: string }[]> {
      return this.meqsService.searchByMeqsNumber(meqs_number);
    }

    @Query(() => MEQS)
    meq(
        @Args('id', {nullable: true}) id?: string,
        @Args('meqs_number', {nullable: true}) meqs_number?: string,
        @Args('rv_number', {nullable: true}) rv_number?: string,
        @Args('spr_number', {nullable: true}) spr_number?: string,
        @Args('jo_number', {nullable: true}) jo_number?: string,
    ) {
        if(id){
            return this.meqsService.findOne(id);
        }
        if(meqs_number){
            return this.meqsService.findByMeqsNumber(meqs_number)
        }
        if(rv_number){
            return this.meqsService.findByReference({ rv_number })
        }
        if(spr_number){
            return this.meqsService.findByReference({ spr_number })
        }
        if(jo_number){
            return this.meqsService.findByReference({ jo_number })
        }
    }

    @Mutation(() => MEQS)
    async updateMeqs(
      @Args('id') id: string,
      @Args('input') updateMeqsInput: UpdateMeqsInput,
      @CurrentAuthUser() authUser: AuthUser
    ) {
        this.meqsService.setAuthUser(authUser)      
        return await this.meqsService.update(id, updateMeqsInput);
    }

    @ResolveField( () => Employee, { nullable: true })
    canceller(@Parent() meqs: MEQS): any {
        if(!meqs.canceller_id){
            return null
        }
        return { __typename: 'Employee', id: meqs.canceller_id }
    }

    @ResolveField( () => [MEQSApprover])
    meqs_approvers(@Parent() meqs: MEQS): any {
        return this.meqsApproverService.findByMeqsId(meqs.id)
    }

}
