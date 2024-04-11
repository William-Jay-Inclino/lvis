import { Query } from '@nestjs/graphql';
import { SettingService } from './setting.service';
import { Employee } from '../employee/entities/employee.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
export class SettingResolver {
  constructor(private readonly settingService: SettingService) {}

  @Query(() => Employee)
  general_manager() {
    return this.settingService.findGM();
  }
}
