import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { Env } from "../../config/env";
import { cleanUpDatabase } from "../../infra/database/clean-up";
import { seedDatabase } from "../../infra/database/seed";
import express from "express";
import { App } from "../../app/app";

let app: express.Application;
let authToken: string;

beforeAll(async () => {
  await Env.load();
  await cleanUpDatabase();
  await seedDatabase();

  const appInstance = new App();
  await appInstance.init();
  app = appInstance.getApp();

  const authResponse = await request(app).post("/auth").send({
    email: "manager@mail.com",
    password: "12345678",
  });

  authToken = authResponse.body.jwt.token;
});

beforeEach(async () => {
  await cleanUpDatabase();
  await seedDatabase();
});

const projectPayload = {
  name: "New Project",
  description: "Project description",
  architect: 2,
  designer: 3,
  developer: 4,
  qualityAnalyst: 5,
};

const expectedProject = {
  id: expect.any(Number),
  name: projectPayload.name,
  description: projectPayload.description,
  architectId: projectPayload.architect,
  designerId: projectPayload.designer,
  developerId: projectPayload.developer,
  qualityAnalystId: projectPayload.qualityAnalyst,
};

describe("Projects", () => {
  it("CT-INT-002 - should create a new project", async () => {
    const response = await request(app)
      .post("/projects")
      .send(projectPayload)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expectedProject);
  });

  it("CT-INT-003 - should return a list of projects", async () => {
    await request(app)
      .post("/projects")
      .send(projectPayload)
      .set("Authorization", `Bearer ${authToken}`);

    const response = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toMatchObject(expectedProject);
  });
});
