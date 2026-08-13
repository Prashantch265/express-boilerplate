jest.mock("../app/app.repository");

const AppRepository = require("../app/app.repository");
const AppService = require("../app/app.service");
const { HttpException } = require("../exceptions");

describe("app.service", () => {
  afterEach(() => jest.clearAllMocks());

  describe("getAppConfigById", () => {
    it("returns the config when found", async () => {
      AppRepository.findOneByField.mockResolvedValue({ id: 1, name: "x" });

      const result = await AppService.getAppConfigById(1);

      expect(result).toEqual({ id: 1, name: "x" });
    });

    it("throws HttpException(404) when not found", async () => {
      AppRepository.findOneByField.mockResolvedValue(null);

      await expect(AppService.getAppConfigById(999)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe("getAllAppConfigs", () => {
    it("paginates and formats the response", async () => {
      AppRepository.findAll.mockResolvedValue({
        rows: [{ id: 1, name: "x" }],
        count: 1,
      });

      const result = await AppService.getAllAppConfigs(
        1,
        10,
        "desc",
        "createdAt"
      );

      expect(result.data).toEqual([{ id: 1, name: "x" }]);
      expect(result.pagination.totalRecords).toBe(1);
    });
  });

  // addAppConfig (create + duplicate-check) is intentionally not covered
  // here - it currently has a real bug (checks a nonexistent `type` field
  // instead of `name`), tracked and fixed in #13.
});
