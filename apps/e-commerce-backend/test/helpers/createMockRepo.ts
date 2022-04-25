export function createMockRepo<T>(repoElementArray: T[], repoOneEl: T) {
  return {
    find: jest.fn().mockResolvedValue(repoElementArray),
    findOneOrFail: jest.fn().mockResolvedValue(repoOneEl),
    create: jest.fn().mockReturnValue(repoOneEl),
    save: jest.fn().mockResolvedValue(repoElementArray),
    // as these do not actually use their return values in our sample
    // we just make sure that their resolve is true to not crash
    update: jest.fn().mockResolvedValue(true),
    // as these do not actually use their return values in our sample
    // we just make sure that their resolve is true to not crash
    remove: jest.fn().mockResolvedValue(true),
  };
}
