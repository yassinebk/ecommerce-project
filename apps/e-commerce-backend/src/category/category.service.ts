import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/dto/findAll';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryInput: CreateCategoryInput) {
    try {
      const repo = await this.findOneByTitle(createCategoryInput.title);
      return repo;
    } catch (e) {
      const newRepo = this.categoryRepository.create(createCategoryInput);
      return this.categoryRepository.save(newRepo);
    }
  }

  findAll(findAllInput?: FindAllInput) {
    if (findAllInput && findAllInput.field && findAllInput.order) {
      const { field, order } = findAllInput;
      return this.categoryRepository.find({
        order: { [field]: order },
        relations: ['products'],
      });
    } else return this.categoryRepository.find({ relations: ['products'] });
  }

  findOneById(id: number) {
    return this.categoryRepository.findOneOrFail(id);
  }

  findOneByTitle(title: string) {
    return this.categoryRepository.findOneOrFail({
      where: { title: title },
      relations: ['products'],
    });
  }

  async updateTitle(
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const toUpdateCategory = await this.categoryRepository.findOneOrFail(
      updateCategoryInput.id,
    );
    toUpdateCategory.title = updateCategoryInput.title;

    return this.categoryRepository.save(toUpdateCategory);
  }

  async remove(id: number) {
    const toRemoveCategory = await this.categoryRepository.findOneOrFail(id);
    return this.categoryRepository.remove(toRemoveCategory);
  }

  bulkSave(categories: string[]) {
    const categoriesToCreate = categories.map((c) =>
      this.categoryRepository.create({ title: c }),
    );
    return this.categoryRepository.save(categoriesToCreate);
  }
}
