// app/services/__mocks__/petService.js
// mock version — returns a promise resolving to canned data, no database

const getAllPetsService = jest.fn(() => {
  return Promise.resolve({
    pets: [
      { name: "Luna", type: "Cat", age: 3 },
      { name: "Rex", type: "Dog", age: 7 },
      { name: "Bandit", type: "Dog", age: 12 },
    ],
    total: 3,
    page: 1,
    limit: 10,
  });
});

module.exports = { getAllPetsService };
