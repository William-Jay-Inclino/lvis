import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MeqsSupplierAttachmentService } from './meqs-supplier-attachment.service';
import { MeqsSupplierAttachment } from './entities/meqs-supplier-attachment.entity';
import { CreateMeqsSupplierAttachmentInput } from './dto/create-meqs-supplier-attachment.input';
import { UpdateMeqsSupplierAttachmentInput } from './dto/update-meqs-supplier-attachment.input';

@Resolver(() => MeqsSupplierAttachment)
export class MeqsSupplierAttachmentResolver {
  constructor(private readonly meqsSupplierAttachmentService: MeqsSupplierAttachmentService) {}

  @Mutation(() => MeqsSupplierAttachment)
  createMeqsSupplierAttachment(@Args('input') createMeqsSupplierAttachmentInput: CreateMeqsSupplierAttachmentInput) {
    return this.meqsSupplierAttachmentService.create(createMeqsSupplierAttachmentInput);
  }

  @Query(() => [MeqsSupplierAttachment])
  meqsSupplierAttachments() {
    return this.meqsSupplierAttachmentService.findAll();
  }

  @Query(() => MeqsSupplierAttachment)
  meqsSupplierAttachment(@Args('id') id: string) {
    return this.meqsSupplierAttachmentService.findOne(id);
  }

  @Mutation(() => MeqsSupplierAttachment)
  updateMeqsSupplierAttachment(
    @Args('id') id: string,
    @Args('input') updateMeqsSupplierAttachmentInput: UpdateMeqsSupplierAttachmentInput
  ) {
    return this.meqsSupplierAttachmentService.update(id, updateMeqsSupplierAttachmentInput);
  }

  @Mutation(() => MeqsSupplierAttachment)
  removeMeqsSupplierAttachment(@Args('id') id: string) {
    return this.meqsSupplierAttachmentService.remove(id);
  }
}
