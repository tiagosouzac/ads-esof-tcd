import type { TaskStatus } from '$lib/models/task';
import type { ApprovalStatus } from '$lib/models/approval_status';

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

type ApproveTaskDTO = {
	id: string;
	isApproved: ApprovalStatus;
};

export type { CreateTaskDTO, UpdateTaskDTO, DeleteTaskDTO, ApproveTaskDTO };
