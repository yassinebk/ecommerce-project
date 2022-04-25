import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AtGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { FindAllInput } from 'src/dto/findAll';
import {
  CreateGenericProductInput,
  UpdateGenericProductInput,
} from '../dto/genericProduct';
import { GenericProduct } from './entities/genericProduct.entity';
import { GenericProductService } from './generic-product.service';

@UseGuards(AtGuard, AdminGuard)
@Resolver(() => GenericProduct)
export class GenericProductResolver {
  constructor(private readonly genericProductService: GenericProductService) {}

  @Mutation(() => GenericProduct)
  async addCategoryToProduct(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('genericProductId', { type: () => Int }) genericProductId: number,
  ) {
    const toModifyProduct = await this.genericProductService.findOne(
      genericProductId,
    );
    return this.genericProductService.addCategoryToProduct(
      toModifyProduct,
      categoryId,
    );
  }

  @Mutation(() => GenericProduct)
  async removeCategoryFromProduct(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('genericProductId') genericProductId: number,
  ) {
    const toModifyProduct = await this.genericProductService.findOne(
      genericProductId,
    );
    return this.genericProductService.removeCategoryFromProduct(
      toModifyProduct,
      categoryId,
    );
  }

  @Mutation(() => GenericProduct)
  createGenericProduct(
    @Args('createProductInput') createProductInput: CreateGenericProductInput,
  ) {
    return this.genericProductService.create(createProductInput);
  }

  @Query(() => [GenericProduct])
  findAllGenericProducts(
    @Args('findAllInput', {
      nullable: true,
      defaultValue: { order: 'DESC', field: 'createdAt' },
    })
    findAllInput?: FindAllInput,
  ) {
    return this.genericProductService.findAll(findAllInput);
  }

  @Query(() => GenericProduct)
  findOneGenericProduct(@Args('id', { type: () => Int }) id: number) {
    return this.genericProductService.findOne(id);
  }

  @Mutation(() => GenericProduct)
  updateGenericProduct(
    @Args('updateProductInput') updateProductInput: UpdateGenericProductInput,
  ) {
    return this.genericProductService.update(updateProductInput);
  }

  @Mutation(() => GenericProduct)
  removeGenericProduct(@Args('id', { type: () => Int }) id: number) {
    return this.genericProductService.remove(id);
  }
}
