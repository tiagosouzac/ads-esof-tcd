import type { ApprovalStatus } from '$lib/models/approval_status';

type ListPrototypeDTO = {
	projectId: number;
};

type FindPrototypeDTO = {
	id: string;
};

type CreatePrototypeDTO = {
	name: string;
	link: string;
	projectId: number;
};

type UpdatePrototypeDTO = {
	id: string;
	name?: string;
	link?: string;
	projectId?: number;
};

type DeletePrototypeDTO = {
	id: string;
};

type ApprovePrototypeDTO = {
	id: string;
	isApproved: ApprovalStatus;
};

export type {
	ListPrototypeDTO,
	FindPrototypeDTO,
	CreatePrototypeDTO,
	UpdatePrototypeDTO,
	DeletePrototypeDTO,
	ApprovePrototypeDTO
};
