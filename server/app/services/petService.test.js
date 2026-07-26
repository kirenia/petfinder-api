// app/services/petService.test.js
const petService = require("./petService");
const mongoose = require("mongoose");
require("dotenv").config();

describe("Pet Service", () => {
  // connect to the DB before the tests run
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  // close the connection when done so jest exits clean
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("getAllPetsService", () => {
    it("should return all pets with default pagination", async () => {
      const queryParams = {};
      const result = await petService.getAllPetsService(queryParams);
      expect(result).toHaveProperty("pets");
      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("page", 1);
      expect(result).toHaveProperty("limit", 10);
    });

    it("should filter pets by age range", async () => {
      const queryParams = { minAge: 2, maxAge: 5 };
      const result = await petService.getAllPetsService(queryParams);
      result.pets.forEach((pet) => {
        expect(pet.age).toBeGreaterThanOrEqual(2);
        expect(pet.age).toBeLessThanOrEqual(5);
      });
    });

    it("should select specific fields", async () => {
      const queryParams = { select: "name,type" };
      const result = await petService.getAllPetsService(queryParams);
      result.pets.forEach((pet) => {
        expect(pet).toHaveProperty("name");
        expect(pet).toHaveProperty("type");
        expect(pet.age).toBeUndefined();
      });
    });

    it("should sort pets by age in descending order", async () => {
      const queryParams = { sort: "-age" };
      const result = await petService.getAllPetsService(queryParams);
      const ages = result.pets.map((pet) => pet.age);
      for (let i = 0; i < ages.length - 1; i++) {
        expect(ages[i]).toBeGreaterThanOrEqual(ages[i + 1]);
      }
    });

    it("should sort pets by age in ascending order", async () => {
      const queryParams = { sort: "age" };
      const result = await petService.getAllPetsService(queryParams);
      const ages = result.pets.map((pet) => pet.age);
      for (let i = 0; i < ages.length - 1; i++) {
        expect(ages[i]).toBeLessThanOrEqual(ages[i + 1]);
      }
    });
  });
});
