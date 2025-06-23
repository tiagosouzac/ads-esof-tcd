import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { Env } from "../../config/env";
import { cleanUpDatabase } from "../../infra/database/clean-up";
import { seedDatabase } from "../../infra/database/seed";
import express from "express";
import { App } from "../../app/app";

let app: express.Application;
let authTokens: Record<string, string> = {};

beforeAll(async () => {
  await Env.load();
  await cleanUpDatabase();
  await seedDatabase();

  const appInstance = new App();
  await appInstance.init();
  app = appInstance.getApp();

  const authResponse = await request(app).post("/auth").send({
    email: "architect@mail.com",
    password: "12345678",
  });

  authTokens["architect"] = authResponse.body.jwt.token;
});

beforeEach(async () => {
  await cleanUpDatabase();
  await seedDatabase();

  if (!authTokens["manager"]) {
    const authResponse = await request(app).post("/auth").send({
      email: "manager@mail.com",
      password: "12345678",
    });

    authTokens["manager"] = authResponse.body.jwt.token;
  }

  await request(app)
    .post("/projects")
    .send({
      name: "Test Project",
      description: "Project description",
      architect: 2,
      designer: 3,
      developer: 4,
      qualityAnalyst: 5,
    })
    .set("Authorization", `Bearer ${authTokens["manager"]}`);
});

const requirementPayload = {
  title: "New Requirement",
  description: "Requirement description",
  projectId: 1,
  status: "PENDING",
};

const expectedRequirement = {
  id: expect.any(Number),
  title: requirementPayload.title,
  description: requirementPayload.description,
  projectId: requirementPayload.projectId,
  status: requirementPayload.status,
  isApproved: "PENDING",
};

describe("Requirement", () => {
  it("CT-INT-004 - should create a new requirement", async () => {
    const response = await request(app)
      .post("/requirements")
      .send(requirementPayload)
      .set("Authorization", `Bearer ${authTokens["architect"]}`);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expectedRequirement);
  });

  it("CT-INT-005 - should return a list of requirements", async () => {
    await request(app)
      .post("/requirements")
      .send(requirementPayload)
      .set("Authorization", `Bearer ${authTokens["architect"]}`);

    const response = await request(app)
      .get("/requirements?projectId=1")
      .set("Authorization", `Bearer ${authTokens["architect"]}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedRequirement)])
    );
  });

  it("CT-INT-006 - should delete a requirement", async () => {
    const createResponse = await request(app)
      .post("/requirements")
      .send(requirementPayload)
      .set("Authorization", `Bearer ${authTokens["architect"]}`);

    const requirementId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/requirements/${requirementId}`)
      .set("Authorization", `Bearer ${authTokens["architect"]}`);

    expect(deleteResponse.status).toBe(204);
    expect(deleteResponse.body).toEqual({});
  });
});
