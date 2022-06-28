/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllInput } from '../dto/findAll';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CreateCategoryInput, UpdateCategoryInput } from './dto';
import CategoryTestHelper from './utils/test.helpers';

describe('CategoryResolver', () => {
  let resolver: CategoryResolver;

  const mockData = [
    CategoryTestHelper.createCategory('Band'),
    CategoryTestHelper.createCategory('Crat'),
  ];
  const mockCategoryService = {
    create: jest
      .fn()
      .mockImplementation((_createCategoryInput: CreateCategoryInput) => ({
        title: 'hello',
        id: '1',
      })),
    findOneById: jest.fn().mockImplementation((_id: number) => mockData[0]),
    findAll: jest
      .fn()
      .mockImplementation((_findAllInput: FindAllInput) => mockData),
    remove: jest.fn().mockImplementation((id: number) => mockData[id]),
    updateTitle: jest
      .fn()
      .mockImplementation(
        (_updateCategoryInput: UpdateCategoryInput) => mockData[1],
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryResolver, CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    resolver = module.get<CategoryResolver>(CategoryResolver);
  });

  it('--> Defined <-- should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('--> FindAll <-- No args call', () => {
    const allCategories = resolver.findAllCategories();
    expect(mockCategoryService.findAll).toBeCalledTimes(1);
    expect(allCategories).toBeDefined();
    expect(allCategories).toBe(mockData);
  });

  it('--> FindOne <-- No args call', () => {
    const foundCategory = resolver.findOneCategory({ id: 1 });
    expect(mockCategoryService.findOneById).toBeCalledTimes(1);
    expect(foundCategory).toBeDefined();
  });

  it(' --> Create <-- should create a category ', () => {
    const createdCategory = resolver.createCategory({ title: 'hello' });
    expect(mockCategoryService.create).toBeCalledTimes(1);
    expect(createdCategory).toBeDefined();
  });

  it('--> Remove <-- ', () => {
    const removedCategory = resolver.removeCategory(1);
    expect(mockCategoryService.remove).toBeCalledTimes(1);
    expect(removedCategory).toBeDefined();
  });

  it('-- Update Title -- ', () => {
    const updatedTitle = resolver.updateCategory({ id: 1, title: 'Band' });

    expect(mockCategoryService.updateTitle).toBeCalledTimes(1);
    expect(updatedTitle).toBeDefined();
  });
});
