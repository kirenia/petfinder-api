// app/services/petService.mock.test.js
jest.mock("./petService"); // tells jest to use the __mocks__ version
const petService = require("./petService");

describe("Pet Service (mocked)", () => {
  it("returns pets without hitting the database", async () => {
    const result = await petService.getAllPetsService({});
    expect(result).toHaveProperty("pets");
    expect(result.pets.length).toBeGreaterThan(0);
  });

  it("mocked pets have name and age", async () => {
    const result = await petService.getAllPetsService({});
    result.pets.forEach((pet) => {
      expect(pet).toHaveProperty("name");
      expect(pet).toHaveProperty("age");
    });
  });

  it("returns pagination info", async () => {
    const result = await petService.getAllPetsService({});
    expect(result).toHaveProperty("total");
    expect(result).toHaveProperty("page", 1);
    expect(result).toHaveProperty("limit", 10);
  });
});
