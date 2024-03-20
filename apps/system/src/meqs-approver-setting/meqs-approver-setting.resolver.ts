import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeqsApproverSettingService } from './meqs-approver-setting.service';
import { MeqsApproverSetting } from './entities/meqs-approver-setting.entity';
import { CreateMeqsApproverSettingInput } from './dto/create-meqs-approver-setting.input';
import { UpdateMeqsApproverSettingInput } from './dto/update-meqs-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => MeqsApproverSetting)
export class MeqsApproverSettingResolver {
  constructor(private readonly meqsApproverSettingService: MeqsApproverSettingService) { }

  @Mutation(() => MeqsApproverSetting)
  createMeqsApproverSetting(
    @Args('input') createMeqsApproverSettingInput: CreateMeqsApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsApproverSettingService.setAuthUser(authUser)
    return this.meqsApproverSettingService.create(createMeqsApproverSettingInput);
  }

  @Query(() => [MeqsApproverSetting])
  meqsApproverSettings() {
    return this.meqsApproverSettingService.findAll();
  }

  @Query(() => MeqsApproverSetting)
  meqsApproverSetting(@Args('id') id: string) {
    return this.meqsApproverSettingService.findOne(id);
  }

  @Mutation(() => MeqsApproverSetting)
  updateMeqsApproverSetting(
    @Args('id') id: string,
    @Args('input') updateMeqsApproverSettingInput: UpdateMeqsApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsApproverSettingService.setAuthUser(authUser)
    return this.meqsApproverSettingService.update(id, updateMeqsApproverSettingInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removeMeqsApproverSetting(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsApproverSettingService.setAuthUser(authUser)
    return this.meqsApproverSettingService.remove(id);
  }
}
