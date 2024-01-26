import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Canvass } from './entities/canvass.entity';
import { CanvassService } from './canvass.service';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { Employee } from './entities/employee.entity';
import { CurrentAuthUser } from '../auth/current-auth-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';

@UseGuards(GqlAuthGuard)
@Resolver( () => Canvass)
export class CanvassResolver {

    constructor(private readonly canvassService: CanvassService) {}

    @Mutation( () => Canvass)
    createCanvass(
        @Args('input') createCanvassInput: CreateCanvassInput, 
        @CurrentAuthUser() authUser: AuthUser
    ) {
        this.canvassService.setAuthUser(authUser)
        return this.canvassService.create(createCanvassInput)
    }

    @Query(() => [Canvass])
    canvasses() {
        return this.canvassService.findAll();
    }

    @Query(() => Canvass)
    canvass(@Args('id', { type: () => String }) id: string) {
        console.log('canvass')
        return this.canvassService.findOne(id);
    }

    @ResolveField( () => Employee)
    requested_by(@Parent() canvass: Canvass): any {
        return { __typename: 'Employee', id: canvass.requested_by_id }
    }
}
