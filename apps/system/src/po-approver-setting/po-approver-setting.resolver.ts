import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PoApproverSettingService } from './po-approver-setting.service';
import { PoApproverSetting } from './entities/po-approver-setting.entity';
import { CreatePoApproverSettingInput } from './dto/create-po-approver-setting.input';
import { UpdatePoApproverSettingInput } from './dto/update-po-approver-setting.input';
import { ApproverSettingRemoveResponse, SystemRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { UpdatePoSettingOrderResponse } from './entities/update-po-setting-order-response.entity';
import { UpdatePOSettingOrderInput } from './dto/update-po-setting-order.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => PoApproverSetting)
export class PoApproverSettingResolver {
  constructor(private readonly poApproverSettingService: PoApproverSettingService) { }

  @Mutation(() => PoApproverSetting)
  createPoApproverSetting(
    @Args('input') createPoApproverSettingInput: CreatePoApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.poApproverSettingService.setAuthUser(authUser)
    return this.poApproverSettingService.create(createPoApproverSettingInput);
  }

  @Query(() => [PoApproverSetting])
  poApproverSettings() {
    return this.poApproverSettingService.findAll();
  }

  @Query(() => PoApproverSetting)
  poApproverSetting(@Args('id') id: string) {
    return this.poApproverSettingService.findOne(id);
  }

  @Mutation(() => PoApproverSetting)
  updatePoApproverSetting(
    @Args('id') id: string,
    @Args('input') updatePoApproverSettingInput: UpdatePoApproverSettingInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.poApproverSettingService.setAuthUser(authUser)
    return this.poApproverSettingService.update(id, updatePoApproverSettingInput);
  }

  @Mutation(() => UpdatePoSettingOrderResponse)
  async updatePoApproverSettingOrder(@Args('inputs', { type: () => [UpdatePOSettingOrderInput] }) inputs: UpdatePOSettingOrderInput[]) {
    return await this.poApproverSettingService.updateManyOrders(inputs);
  }

  @Mutation(() => ApproverSettingRemoveResponse)
  removePoApproverSetting(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.poApproverSettingService.setAuthUser(authUser)
    return this.poApproverSettingService.remove(id);
  }
}
