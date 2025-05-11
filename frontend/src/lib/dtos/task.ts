import type { TaskStatus } from '$lib/models/task';

type CreateTaskDTO = {
	title: string;
	description: string;
	status: TaskStatus;
	projectId: string;
	assigneeId: number | null;
};

type UpdateTaskDTO = {
	id: string;
} & CreateTaskDTO;

type DeleteTaskDTO = {
	id: string;
};

export type { CreateTaskDTO, UpdateTaskDTO, DeleteTaskDTO };
