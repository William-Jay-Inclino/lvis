import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JoApproverSettingService } from './jo-approver-setting.service';
import { JoApproverSetting } from './entities/jo-approver-setting.entity';
import { CreateJoApproverSettingInput } from './dto/create-jo-approver-setting.input';
import { UpdateJoApproverSettingInput } from './dto/update-jo-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => JoApproverSetting)
export class JoApproverSettingResolver {
  constructor(private readonly joApproverSettingService: JoApproverSettingService) { }

  @Mutation(() => JoApproverSetting)
  createJoApproverSetting(
    @Args('input') createJoApproverSettingInput: CreateJoApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.joApproverSettingService.setAuthUser(authUser)
    return this.joApproverSettingService.create(createJoApproverSettingInput);
  }

  @Query(() => [JoApproverSetting])
  joApproverSettings() {
    return this.joApproverSettingService.findAll();
  }

  @Query(() => JoApproverSetting)
  joApproverSetting(@Args('id') id: string) {
    return this.joApproverSettingService.findOne(id);
  }

  @Mutation(() => JoApproverSetting)
  updateJoApproverSetting(
    @Args('id') id: string,
    @Args('input') updateJoApproverSettingInput: UpdateJoApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.joApproverSettingService.setAuthUser(authUser)
    return this.joApproverSettingService.update(id, updateJoApproverSettingInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removeJoApproverSetting(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.joApproverSettingService.setAuthUser(authUser)
    return this.joApproverSettingService.remove(id);
  }
}
