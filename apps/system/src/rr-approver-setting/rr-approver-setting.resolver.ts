import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RrApproverSettingService } from './rr-approver-setting.service';
import { RrApproverSetting } from './entities/rr-approver-setting.entity';
import { CreateRrApproverSettingInput } from './dto/create-rr-approver-setting.input';
import { UpdateRrApproverSettingInput } from './dto/update-rr-approver-setting.input';
import { ApproverSettingRemoveResponse, SystemRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { UpdateRrSettingOrderResponse } from './entities/update-rr-setting-order-response.entity';
import { UpdateRRSettingOrderInput } from './dto/update-rr-setting-order.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => RrApproverSetting)
export class RrApproverSettingResolver {
  constructor(private readonly rrApproverSettingService: RrApproverSettingService) { }

  @Mutation(() => RrApproverSetting)
  createRrApproverSetting(
    @Args('input') createRrApproverSettingInput: CreateRrApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.rrApproverSettingService.setAuthUser(authUser)
    return this.rrApproverSettingService.create(createRrApproverSettingInput);
  }

  @Query(() => [RrApproverSetting])
  rrApproverSettings() {
    return this.rrApproverSettingService.findAll();
  }

  @Query(() => RrApproverSetting)
  rrApproverSetting(@Args('id') id: string) {
    return this.rrApproverSettingService.findOne(id);
  }

  @Mutation(() => RrApproverSetting)
  updateRrApproverSetting(
    @Args('id') id: string,
    @Args('input') updateRrApproverSettingInput: UpdateRrApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.rrApproverSettingService.setAuthUser(authUser)
    return this.rrApproverSettingService.update(id, updateRrApproverSettingInput);
  }

  @Mutation(() => UpdateRrSettingOrderResponse)
  async updateRRApproverSettingOrder(@Args('inputs', { type: () => [UpdateRRSettingOrderInput] }) inputs: UpdateRRSettingOrderInput[]) {
    return await this.rrApproverSettingService.updateManyOrders(inputs);
  }

  @Mutation(() => ApproverSettingRemoveResponse)
  removeRrApproverSetting(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.rrApproverSettingService.setAuthUser(authUser)
    return this.rrApproverSettingService.remove(id);
  }
}
