import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { MeqsService } from './meqs.service';
import { MEQS } from './entities/meq.entity';
import { CurrentAuthUser } from '../auth/current-auth-user.decorator';
import { CreateMeqsInput } from './dto/create-meqs.input';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateMeqsInput } from './dto/update-meqs.input';
import { Employee } from '../__employee__/entities/employee.entity';

@UseGuards(GqlAuthGuard)
@Resolver( () => MEQS)
export class MeqsResolver {

    constructor(private readonly meqsService: MeqsService) {}

    @Mutation(() => MEQS)
    async createMeqs(
        @Args('input') createMeqsInput: CreateMeqsInput,
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.meqsService.setAuthUser(authUser)
        return await this.meqsService.create(createMeqsInput);
    }

    @Query(() => [MEQS])
    meqs() {
        return this.meqsService.findAll();
    }

    @Query(() => MEQS)
    meq(
        @Args('id', {nullable: true}) id?: string,
        @Args('meqs_number', {nullable: true}) meqs_number?: string
    ) {
        if(id){
            return this.meqsService.findOne(id);
        }
        if(meqs_number){
            return this.meqsService.findByMeqsNumber(meqs_number)
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

}
