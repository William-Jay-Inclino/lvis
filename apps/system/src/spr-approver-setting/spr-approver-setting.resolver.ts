import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SprApproverSettingService } from './spr-approver-setting.service';
import { SprApproverSetting } from './entities/spr-approver-setting.entity';
import { CreateSprApproverSettingInput } from './dto/create-spr-approver-setting.input';
import { UpdateSprApproverSettingInput } from './dto/update-spr-approver-setting.input';
import { ApproverSettingRemoveResponse, SystemRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { UpdateSprSettingOrderResponse } from './entities/update-spr-setting-order-response.entity';
import { UpdateSPRSettingOrderInput } from './dto/update-spr-setting-order.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => SprApproverSetting)
export class SprApproverSettingResolver {
  constructor(private readonly sprApproverSettingService: SprApproverSettingService) { }

  @Mutation(() => SprApproverSetting)
  createSprApproverSetting(
    @Args('input') createSprApproverSettingInput: CreateSprApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.sprApproverSettingService.setAuthUser(authUser)
    return this.sprApproverSettingService.create(createSprApproverSettingInput);
  }

  @Query(() => [SprApproverSetting])
  sprApproverSettings() {
    return this.sprApproverSettingService.findAll();
  }

  @Query(() => SprApproverSetting)
  sprApproverSetting(@Args('id') id: string) {
    return this.sprApproverSettingService.findOne(id);
  }

  @Mutation(() => SprApproverSetting)
  updateSprApproverSetting(
    @Args('id') id: string,
    @Args('input') updateSprApproverSettingInput: UpdateSprApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.sprApproverSettingService.setAuthUser(authUser)
    return this.sprApproverSettingService.update(id, updateSprApproverSettingInput);
  }

  @Mutation(() => UpdateSprSettingOrderResponse)
  async updateSPRApproverSettingOrder(@Args('inputs', { type: () => [UpdateSPRSettingOrderInput] }) inputs: UpdateSPRSettingOrderInput[]) {
    return await this.sprApproverSettingService.updateManyOrders(inputs);
  }

  @Mutation(() => ApproverSettingRemoveResponse)
  removeSprApproverSetting(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.sprApproverSettingService.setAuthUser(authUser)
    return this.sprApproverSettingService.remove(id);
  }
}
