import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockRepo } from '../../test/helpers/createMockRepo';
import { CategoryService } from './category.service';
import { Category } from './entities';

describe('CategoryService', () => {
  let service: CategoryService;

  const catArray = [
    new Category('hello'),
    new Category('There'),
    new Category('WICKED'),
  ];
  const oneCat = new Category('Solo Cat');
  const mockRepo = createMockRepo<Category>(catArray, oneCat);

  beforeEach(async () => {
    mockRepo.find.mockClear();
    mockRepo.save.mockClear();
    mockRepo.update.mockClear();
    mockRepo.remove.mockClear();
    mockRepo.findOneOrFail.mockClear();
    mockRepo.create.mockClear();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('CATEGORY should be defined', () => {
    expect(service).toBeDefined();
  });

  it('CATEGORY --> FindAll <-- Returning categories', async () => {
    const categories = await service.findAll();
    expect(categories).toBeDefined();
    expect(categories.length).toBeGreaterThan(0);
    expect(mockRepo.find).toBeCalledTimes(1);
  });
  it('CATEGORY --> FindOne <-- Returning a category', async () => {
    const category = await service.findOneById(1);
    expect(category).toBeDefined();
    expect(category.title).toBe('Solo Cat');
    expect(mockRepo.findOneOrFail).toBeCalledTimes(1);
  });

  it('CATEGORY --> Remove <-- Returning a category', async () => {
    const category = await service.remove(1);
    expect(category).toBeDefined();
    expect(category).toBe(true);
    expect(mockRepo.remove).toBeCalledTimes(1);
  });

  it('CATEGORY --> BulkSave <-- Returning array of category', async () => {
    const array = ['Hello', 'One'];
    const category = await service.bulkSave(array);
    expect(category).toBeDefined();
    expect(mockRepo.create).toBeCalledTimes(array.length);
    expect(mockRepo.save).toBeCalledTimes(1);
  });

  it('CATEGORY --> Update Title <-- Returning a category', async () => {
    const category = await service.updateTitle({ id: 1, title: 'new Title' });
    expect(category).toBeDefined();
    expect(mockRepo.create).toBeCalledTimes(0);
    expect(mockRepo.save).toBeCalledTimes(1);
    expect(mockRepo.findOneOrFail).toBeCalledTimes(1);
  });

  it('CATEGORY --> Update Title <-- Returning a category', async () => {
    const category = await service.findOneByTitle('new Title');
    expect(category).toBeDefined();
    expect(mockRepo.findOneOrFail).toBeCalledTimes(1);
  });

  it('CATEGORY --> Create <-- Returning a category', async () => {
    const category = await service.create({ title: 'new title' });
    expect(category).toBeDefined();
    expect(mockRepo.findOneOrFail).toBeCalledTimes(1); // Typeorm handle duplicates
  });
});
