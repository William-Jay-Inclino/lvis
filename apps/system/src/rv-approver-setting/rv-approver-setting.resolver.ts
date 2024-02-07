import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { RvApproverSettingService } from './rv-approver-setting.service';
import { RvApproverSetting } from './entities/rv-approver-setting.entity';
import { CreateRvApproverSettingInput } from './dto/create-rv-approver-setting.input';
import { UpdateRvApproverSettingInput } from './dto/update-rv-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';

@Resolver(() => RvApproverSetting)
export class RvApproverSettingResolver {
  constructor(private readonly rvApproverSettingService: RvApproverSettingService) {}

  @Mutation(() => RvApproverSetting)
  createRvApproverSetting(@Args('input') createRvApproverSettingInput: CreateRvApproverSettingInput) {
    return this.rvApproverSettingService.create(createRvApproverSettingInput);
  }

  @Query(() => [RvApproverSetting])
  rvApproverSettings() {
    return this.rvApproverSettingService.findAll();
  }

  @Query(() => RvApproverSetting)
  rvApproverSetting(@Args('id') id: string) {
    return this.rvApproverSettingService.findOne(id);
  }

  @Mutation(() => RvApproverSetting)
  updateRvApproverSetting(
    @Args('id') id: string,
    @Args('input') updateRvApproverSettingInput: UpdateRvApproverSettingInput
  ) {
    return this.rvApproverSettingService.update(id, updateRvApproverSettingInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removeRvApproverSetting(@Args('id') id: string) {
    return this.rvApproverSettingService.remove(id);
  }
}
