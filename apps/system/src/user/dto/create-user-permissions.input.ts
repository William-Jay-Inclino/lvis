import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SystemPermissionsInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageAccount?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageClassification?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageDepartment?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageEmployee?: boolean;
}

@InputType()
export class WarehousePermissionsInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageCanvass?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageRV?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageSPR?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageJO?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageMEQS?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManagePO?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageRR?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageSupplier?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageUnit?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageVehicle?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageItem?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageItemType?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canManageItemBrand?: boolean;
}

@InputType()
export class UserPermissionsInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canViewSystem?: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    canViewWarehouse?: boolean;

    @Field(() => SystemPermissionsInput, { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => SystemPermissionsInput)
    system?: SystemPermissionsInput;

    @Field(() => WarehousePermissionsInput, { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => WarehousePermissionsInput)
    warehouse?: WarehousePermissionsInput;
}
