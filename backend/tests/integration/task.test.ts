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
    email: "developer@mail.com",
    password: "12345678",
  });

  authTokens["developer"] = authResponse.body.jwt.token;
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

const taskPayload = {
  title: "New Task",
  description: "Task description",
  status: "PENDING",
  projectId: 1,
  assigneeId: 4,
};

const expectedTask = {
  id: expect.any(Number),
  title: taskPayload.title,
  description: taskPayload.description,
  status: taskPayload.status,
  assignee: { id: taskPayload.assigneeId, name: expect.any(String) },
  isApproved: "PENDING",
};

describe("Task", () => {
  it("CT-INT-010 - should create a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send(taskPayload)
      .set("Authorization", `Bearer ${authTokens["developer"]}`);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expectedTask);
  });

  it("CT-INT-011 - should update a task", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send(taskPayload)
      .set("Authorization", `Bearer ${authTokens["developer"]}`);

    const taskId = createResponse.body.id;

    const updatePayload = {
      title: "Updated Task",
      description: "Updated description",
      status: "IN_PROGRESS",
    };

    const updateResponse = await request(app)
      .put(`/tasks/${taskId}`)
      .send(updatePayload)
      .set("Authorization", `Bearer ${authTokens["developer"]}`);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toMatchObject({
      ...expectedTask,
      id: taskId,
      title: updatePayload.title,
      description: updatePayload.description,
      status: updatePayload.status,
    });
  });

  it("CT-INT-012 - should delete a task", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send(taskPayload)
      .set("Authorization", `Bearer ${authTokens["developer"]}`);

    const taskId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authTokens["developer"]}`);

    expect(deleteResponse.status).toBe(204);

    const findResponse = await request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${authTokens["developer"]}`);

    expect(findResponse.status).toBe(404);
  });
});
