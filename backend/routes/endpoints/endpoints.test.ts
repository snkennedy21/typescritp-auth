import express from "express";
import { describe, it, expect } from "vitest";
import supertest from "supertest";
import { endpointsRouter } from "../../routes/endpoints/endpoints";

const app = express();
app.use(endpointsRouter);

describe("Endpoints Route", () => {
  it("GET /unprotected should return a message indicating that the content is not protected", async () => {
    await supertest(app)
      .get("/unprotected")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          message: "This content is not protected",
        });
      });
  });
});
