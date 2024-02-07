import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PoApproverSettingService } from './po-approver-setting.service';
import { PoApproverSetting } from './entities/po-approver-setting.entity';
import { CreatePoApproverSettingInput } from './dto/create-po-approver-setting.input';
import { UpdatePoApproverSettingInput } from './dto/update-po-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';

@Resolver(() => PoApproverSetting)
export class PoApproverSettingResolver {
  constructor(private readonly poApproverSettingService: PoApproverSettingService) {}

  @Mutation(() => PoApproverSetting)
  createPoApproverSetting(@Args('input') createPoApproverSettingInput: CreatePoApproverSettingInput) {
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
    @Args('input') updatePoApproverSettingInput: UpdatePoApproverSettingInput
  ) {
    return this.poApproverSettingService.update(id, updatePoApproverSettingInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removePoApproverSetting(@Args('id') id: string) {
    return this.poApproverSettingService.remove(id);
  }
}
