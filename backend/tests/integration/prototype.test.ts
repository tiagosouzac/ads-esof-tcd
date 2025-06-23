import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import express from "express";
import { Env } from "../../config/env";
import { cleanUpDatabase } from "../../infra/database/clean-up";
import { seedDatabase } from "../../infra/database/seed";
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
    email: "designer@mail.com",
    password: "12345678",
  });

  authTokens["designer"] = authResponse.body.jwt.token;
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

const prototypePayload = {
  name: "New Prototype",
  link: "https://figma.com/",
  projectId: 1,
};

const expectedPrototype = {
  id: expect.any(Number),
  name: prototypePayload.name,
  link: prototypePayload.link,
  projectId: prototypePayload.projectId,
  isApproved: "PENDING",
};

describe("Prototype", () => {
  it("CT-INT-007 - should create a prototype", async () => {
    const response = await request(app)
      .post("/prototypes")
      .send(prototypePayload)
      .set("Authorization", `Bearer ${authTokens["designer"]}`);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expectedPrototype);
  });

  it("CT-INT-008 - should update a prototype", async () => {
    const createResponse = await request(app)
      .post("/prototypes")
      .send(prototypePayload)
      .set("Authorization", `Bearer ${authTokens["designer"]}`);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toMatchObject(expectedPrototype);

    const updatedPrototypePayload = {
      ...prototypePayload,
      link: "https://new-link.com/",
    };

    const updateResponse = await request(app)
      .put(`/prototypes/${createResponse.body.id}`)
      .send(updatedPrototypePayload)
      .set("Authorization", `Bearer ${authTokens["designer"]}`);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toMatchObject({
      ...expectedPrototype,
      link: updatedPrototypePayload.link,
      id: createResponse.body.id,
    });
  });

  it("CT-INT-009 - should delete a prototype", async () => {
    const createResponse = await request(app)
      .post("/prototypes")
      .send(prototypePayload)
      .set("Authorization", `Bearer ${authTokens["designer"]}`);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toMatchObject(expectedPrototype);

    const deleteResponse = await request(app)
      .delete(`/prototypes/${createResponse.body.id}`)
      .set("Authorization", `Bearer ${authTokens["designer"]}`);

    expect(deleteResponse.status).toBe(204);
  });
});
