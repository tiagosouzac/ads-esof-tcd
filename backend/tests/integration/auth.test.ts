import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { cleanUpDatabase } from "../../infra/database/clean-up";
import { seedDatabase } from "../../infra/database/seed";
import { App } from "../../app/app";
import express from "express";
import { Env } from "../../config/env";

let app: express.Application;

beforeAll(async () => {
  await Env.load();
  await cleanUpDatabase();
  await seedDatabase();

  const appInstance = new App();
  await appInstance.init();
  app = appInstance.getApp();
});

describe("Authentication", () => {
  it("CT-INT-001 - should authenticate and return an valid JWT token", async () => {
    const response = await request(app).post("/auth").send({
      email: "manager@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("jwt.token");
  });
});
