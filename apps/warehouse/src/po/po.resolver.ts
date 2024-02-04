import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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

    @Query(() => [PO])
    pos() {
        return this.poService.findAll();
    }

    @Query(() => PO)
    po(
        @Args('id') id: string,
        @Args('po_number') po_number: string
    ) {
        if(id){
            return this.poService.findOne(id);
        }
        if(po_number){
            return this.poService.findByPoNumber(po_number)
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


}
