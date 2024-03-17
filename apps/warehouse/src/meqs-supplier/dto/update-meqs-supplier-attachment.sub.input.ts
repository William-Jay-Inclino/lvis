import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateMeqsSupplierAttachmentSubInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    id: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    src: string;

}
