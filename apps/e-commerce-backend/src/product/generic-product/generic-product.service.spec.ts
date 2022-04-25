import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/category/dto';
import { Repository } from 'typeorm';
import { createMockRepo } from '../../../test/helpers/createMockRepo';
import { CategoryService } from '../../category/category.service';
import CategoryTestHelper from '../../category/utils/test.helpers';
import { FindAllInput } from '../../dto/findAll';
import { GenericProduct } from './entities';
import { GenericProductService } from './generic-product.service';

describe('ProductService', () => {
  let service: GenericProductService;
  let repo: Repository<GenericProductService>;

  const genericProductArray = [
    new GenericProduct(randomUUID(), randomUUID(), Math.random() * 100),
    new GenericProduct(randomUUID(), randomUUID(), Math.random() * 100),
    new GenericProduct(randomUUID(), randomUUID(), Math.random() * 100),
    new GenericProduct(randomUUID(), randomUUID(), Math.random() * 100),
  ];

  const mockData = [
    CategoryTestHelper.createCategory('Band'),
    CategoryTestHelper.createCategory('Crat'),
  ];
  const mockCategoryService = {
    create: jest
      .fn()
      .mockImplementation((createCategoryInput: CreateCategoryInput) => ({
        title: 'hello',
        id: '1',
      })),
    findOneById: jest.fn().mockImplementation((id: number) => mockData[0]),
    findAll: jest
      .fn()
      .mockImplementation((findAllInput: FindAllInput) => mockData),
    remove: jest.fn().mockImplementation((id: number) => mockData[id]),
    updateTitle: jest
      .fn()
      .mockImplementation(
        (updateCategoryInput: UpdateCategoryInput) => mockData[1],
      ),
  };

  const mockGenericProductRepo = createMockRepo<GenericProduct>(
    genericProductArray,
    genericProductArray[0],
  );

  beforeEach(async () => {
    mockGenericProductRepo.create.mockClear();
    mockGenericProductRepo.save.mockClear();
    mockGenericProductRepo.find.mockClear();
    mockGenericProductRepo.findOneOrFail.mockClear();
    mockGenericProductRepo.update.mockClear();
    mockGenericProductRepo.remove.mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenericProductService,
        {
          provide: getRepositoryToken(GenericProduct),
          useValue: mockGenericProductRepo,
        },
        CategoryService,
      ],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    service = module.get<GenericProductService>(GenericProductService);
  });

  it('GENERIC_PRODUCT_SERVICE --> Defined <-- should be defined', () => {
    expect(service).toBeDefined();
  });

  it('GENERIC_PRODUCT_SERVICE --> create <-- Returning generic products', async () => {
    const newGenericProduct = await service.create({
      basePrice: 100,
      categories: [1, 2, 3, 4],
      description: 'Hello there',
      name: 'One',
    });
    expect(newGenericProduct).toBeDefined();
    expect(mockGenericProductRepo.create).toBeCalledTimes(1);
    expect(mockGenericProductRepo.save).toBeCalledTimes(1);
    expect(mockCategoryService.findOneById).toBeCalledTimes(1);
  });
  it('GENERIC_PRODUCT_SERVICE --> FindAll <-- Returning generic products', async () => {
    const allGenericProducts = await service.findAll();
    expect(allGenericProducts).toBeDefined();
    expect(allGenericProducts.length).toEqual(4);
    expect(mockGenericProductRepo.find).toBeCalledTimes(1);
  });

  it('GENERIC_PRODUCT_SERVICE --> FindOne <-- Returning one generic product', async () => {
    const genericProdcut = await service.findOne(genericProductArray[0].id);
    expect(genericProdcut).toBeDefined();
    expect(mockGenericProductRepo.findOneOrFail).toBeCalledTimes(1);
  });

  it('GENERIC_PRODUCT_SERVICE --> Remove <-- Returning one deleted generic product', async () => {
    const deletedGenericProduct = await service.remove(
      genericProductArray[0].id,
    );
    expect(deletedGenericProduct).toBeDefined();
    expect(deletedGenericProduct.id).toEqual(deletedGenericProduct.id);
    expect(mockGenericProductRepo.findOneOrFail).toBeCalledTimes(1);
    expect(mockGenericProductRepo.remove).toBeCalledTimes(1);
  });
  it('GENERIC_PRODUCT_SERVICE --> Update <-- update a generic product', async () => {
    const updatedGenericProduct = await service.update({
      id: 1,
      name: 'same',
      description: 'ello',
    });
    expect(updatedGenericProduct).toBeDefined();
    expect(mockGenericProductRepo.findOneOrFail).toBeCalledTimes(1);
    expect(mockGenericProductRepo.save).toBeCalledTimes(1);
  });

  it('GENERIC_PRODUCT_SERVICE --> AddCategoryToProduct <-- update a generic product categories', () => {});
});
