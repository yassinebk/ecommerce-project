import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/dto/findAll';
import { Repository } from 'typeorm';
import { CategoryService } from '../../category/category.service';
import {
  CreateGenericProductInput,
  UpdateGenericProductInput,
} from '../dto/genericProduct';
import { GenericProduct } from './entities/genericProduct.entity';

@Injectable()
export class GenericProductService {
  constructor(
    @InjectRepository(GenericProduct)
    private genericProductRepositiory: Repository<GenericProduct>,
    private categoryService: CategoryService,
  ) {}

  async addCategoryToProduct(
    genericProduct: GenericProduct,
    categoryId: number,
  ) {
    const category = await this.categoryService.findOneById(categoryId);
    if (genericProduct.categories === undefined)
      genericProduct.categories = [category];
    else genericProduct.categories = [...genericProduct.categories, category];
    return this.genericProductRepositiory.save(genericProduct);
  }

  async removeCategoryFromProduct(
    genericProduct: GenericProduct,
    categoryId: number,
  ) {
    genericProduct.categories = genericProduct.categories.filter(
      (c) => c.categoryId !== categoryId,
    );
    return this.genericProductRepositiory.save(genericProduct);
  }

  async create(createGenericProductInput: CreateGenericProductInput) {
    const { basePrice, description, name } = createGenericProductInput;
    try {
      const categoriesEntities = createGenericProductInput.categories.map((c) =>
        this.categoryService.findOneById(c),
      );
      const categories = await Promise.all(categoriesEntities);
      console.log(categories);
      const createdGenericProduct = this.genericProductRepositiory.create({
        basePrice,
        description,
        name,
        categories,
      });
      return this.genericProductRepositiory.save(createdGenericProduct);
    } catch (error) {
      console.error(error.message);
      const createdGenericProduct = this.genericProductRepositiory.create({
        basePrice,
        description,
        name,
      });
      return this.genericProductRepositiory.save(createdGenericProduct);
    }
  }

  findAll(findAllInput?: FindAllInput) {
    if (!findAllInput) return this.genericProductRepositiory.find();
    const { field, order } = findAllInput;
    return this.genericProductRepositiory.find({
      order: {
        [field]: order,
      },
      relations: ['categories'],
    });
  }

  findOne(id: number) {
    return this.genericProductRepositiory.findOneOrFail(id, {
      relations: ['categories'],
    });
  }

  async update(updateProductInput: UpdateGenericProductInput) {
    const toUpdateProduct = await this.genericProductRepositiory.findOneOrFail(
      updateProductInput.id,
    );
    const updatedProduct = { ...toUpdateProduct, updateProductInput };

    return this.genericProductRepositiory.save(updatedProduct);
  }

  async remove(id: number) {
    const toRemoveProduct = await this.genericProductRepositiory.findOneOrFail(
      id,
    );
    return this.genericProductRepositiory.remove(toRemoveProduct);
  }
}
