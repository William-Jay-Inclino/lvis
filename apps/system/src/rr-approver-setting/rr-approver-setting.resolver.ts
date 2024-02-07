import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RrApproverSettingService } from './rr-approver-setting.service';
import { RrApproverSetting } from './entities/rr-approver-setting.entity';
import { CreateRrApproverSettingInput } from './dto/create-rr-approver-setting.input';
import { UpdateRrApproverSettingInput } from './dto/update-rr-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';

@Resolver(() => RrApproverSetting)
export class RrApproverSettingResolver {
  constructor(private readonly rrApproverSettingService: RrApproverSettingService) {}

  @Mutation(() => RrApproverSetting)
  createRrApproverSetting(@Args('input') createRrApproverSettingInput: CreateRrApproverSettingInput) {
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
    @Args('input') updateRrApproverSettingInput: UpdateRrApproverSettingInput
  ) {
    return this.rrApproverSettingService.update(id, updateRrApproverSettingInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removeRrApproverSetting(@Args('id') id: string) {
    return this.rrApproverSettingService.remove(id);
  }
}
