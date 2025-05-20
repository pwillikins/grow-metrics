import path from "path";
import request from "supertest";
import { createApp } from "../app";

const TEST_CSV_PATH = path.join(__dirname, "../../testData.csv")

describe("GET /:column/histogram", () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp(TEST_CSV_PATH);
  });

  it("should return a histogram for the 'Attribute' column", async () => {
    const response = await request(app).get("/Attribute/histogram");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ column: "Attribute", histogram: { "Harvested acres": 48, "Planted acres": 12 } });
  });
});
