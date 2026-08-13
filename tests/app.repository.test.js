jest.mock("@lib/sequelize", () => ({
  app_configs: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAndCountAll: jest.fn(),
  },
}));

const db = require("@lib/sequelize");
const AppRepository = require("../app/app.repository");

describe("app.repository", () => {
  afterEach(() => jest.clearAllMocks());

  it("findOneByField filters to active rows", async () => {
    db.app_configs.findOne.mockResolvedValue({ id: 1, name: "x" });

    const result = await AppRepository.findOneByField({ name: "x" });

    expect(db.app_configs.findOne).toHaveBeenCalledWith({
      where: { name: "x", isActive: true },
    });
    expect(result).toEqual({ id: 1, name: "x" });
  });

  it("addAppConfig creates a row with the given payload", async () => {
    const payload = { name: "max-upload-size", value: "10mb" };
    db.app_configs.create.mockResolvedValue({ id: 1, ...payload });

    const result = await AppRepository.addAppConfig(payload);

    expect(db.app_configs.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual({ id: 1, ...payload });
  });

  it("findAll paginates and filters to active rows", async () => {
    db.app_configs.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

    await AppRepository.findAll(10, 0, "DESC", "createdAt");

    expect(db.app_configs.findAndCountAll).toHaveBeenCalledWith({
      limit: 10,
      offset: 0,
      order: [["createdAt", "DESC"]],
      where: { isActive: true },
    });
  });
});
