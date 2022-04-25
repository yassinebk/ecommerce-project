import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminGuard, AtGuard } from 'src/auth/guards';
import { FindAllInput } from '../dto/findAll';
import { CategoryService } from './category.service';
import {
  CreateCategoryInput,
  FindOneCategoryInput,
  UpdateCategoryInput,
} from './dto';
import { Category } from './entities';

@UseGuards(AtGuard, AdminGuard)
@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category])
  findAllCategories(
    @Args('findAllInput', { nullable: true, type: () => FindAllInput })
    findAllInput?: FindAllInput,
  ) {
    return this.categoryService.findAll(findAllInput);
  }

  @Query(() => Category)
  findOneCategory(@Args('findOneInput') findOneInput: FindOneCategoryInput) {
    const { title, id } = findOneInput;
    if (title && !id) return this.categoryService.findOneByTitle(title);
    else if (id && !title) return this.categoryService.findOneById(id);

    return this.categoryService.findOneById(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    if (!updateCategoryInput.title)
      return this.categoryService.findOneById(updateCategoryInput.id);
    return this.categoryService.updateTitle(updateCategoryInput);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }

  @Mutation(() => [Category])
  bulkCreateCategories(
    @Args('categories', { type: () => [String] }) categories: string[],
  ) {
    return this.categoryService.bulkSave(categories);
  }
}
