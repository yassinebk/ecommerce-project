import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AtGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { FindAllInput } from 'src/dto/findAll';
import {
  CreateProductVariantInput,
  UpdateProductVariant,
  updateProductVariantQty,
} from '../dto';
import { ProductVariant } from './entities';
import { ProductVariantService } from './product-variant.service';

@UseGuards(AtGuard, AdminGuard)
@Resolver((_of) => ProductVariant)
export class ProductVariantResolver {
  constructor(private readonly productService: ProductVariantService) {}

  @Mutation(() => ProductVariant)
  createProductVariant(
    @Args('createProductInput') createProductInput: CreateProductVariantInput,
  ) {
    return this.productService.createProductVariant(createProductInput);
  }

  @Query(() => [ProductVariant])
  findAllProductVariants(
    @Args('findAllInput', {
      nullable: true,
      defaultValue: { order: 'DESC', field: 'createdAt' },
    })
    findAllInput: FindAllInput | null,
  ) {
    return this.productService.findAll(findAllInput);
  }

  @Query(() => ProductVariant)
  findOneProductVariant(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductVariant)
  updateProductVariant(
    @Args('updateProductInput') updateProductInput: UpdateProductVariant,
  ) {
    return this.productService.update(updateProductInput);
  }

  @Mutation(() => ProductVariant)
  updateProductVariantQty(
    @Args('updateProductVariatnQty')
    updateProductVariantQtyInput: updateProductVariantQty,
  ) {
    return this.productService.updateProductVariantQty(
      updateProductVariantQtyInput,
    );
  }

  @Mutation(() => ProductVariant)
  removeProductVariant(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
