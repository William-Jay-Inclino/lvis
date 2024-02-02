import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeqsApproverSettingService } from './meqs-approver-setting.service';
import { MeqsApproverSetting } from './entities/meqs-approver-setting.entity';
import { CreateMeqsApproverSettingInput } from './dto/create-meqs-approver-setting.input';
import { UpdateMeqsApproverSettingInput } from './dto/update-meqs-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';

@Resolver(() => MeqsApproverSetting)
export class MeqsApproverSettingResolver {
  constructor(private readonly meqsApproverSettingService: MeqsApproverSettingService) {}

  @Mutation(() => MeqsApproverSetting)
  createMeqsApproverSetting(@Args('input') createMeqsApproverSettingInput: CreateMeqsApproverSettingInput) {
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
    @Args('input') updateMeqsApproverSettingInput: UpdateMeqsApproverSettingInput
  ) {
    return this.meqsApproverSettingService.update(id, updateMeqsApproverSettingInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removeMeqsApproverSetting(@Args('id') id: string) {
    return this.meqsApproverSettingService.remove(id);
  }
}
