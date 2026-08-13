const request = require("supertest");

describe("app boot smoke test", () => {
  let app;

  beforeAll(() => {
    app = require("../app");
  });

  it("boots without throwing and responds on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ msg: "hello" });
  });
});
