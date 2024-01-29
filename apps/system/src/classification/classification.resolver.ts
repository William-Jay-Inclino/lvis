import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClassificationService } from './classification.service';
import { Classification } from './entities/classification.entity';
import { CreateClassificationInput } from './dto/create-classification.input';
import { UpdateClassificationInput } from './dto/update-classification.input';

@Resolver(() => Classification)
export class ClassificationResolver {
  constructor(private readonly classificationService: ClassificationService) {}

  @Mutation(() => Classification)
  createClassification(@Args('input') createClassificationInput: CreateClassificationInput) {
    return this.classificationService.create(createClassificationInput);
  }

  @Query(() => [Classification])
  classifications() {
    return this.classificationService.findAll();
  }

  @Query(() => Classification)
  classification(@Args('id') id: string) {
    return this.classificationService.findOne(id);
  }

  @Mutation(() => Classification)
  updateClassification(
    @Args('id') id: string,
    @Args('input') updateClassificationInput: UpdateClassificationInput
  ) {
    return this.classificationService.update(id, updateClassificationInput);
  }

  @Mutation(() => Classification)
  removeClassification(@Args('id') id: string) {
    return this.classificationService.remove(id);
  }
}
