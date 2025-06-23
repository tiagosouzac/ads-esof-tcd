import type { ApprovalStatus } from '$lib/models/approval_status';
import type { RequirementStatus } from '$lib/models/requirement';

type CreateRequirementDTO = {
	title: string;
	description: string;
	status: RequirementStatus;
	projectId: string;
};

type UpdateRequirementDTO = {
	id: string;
} & CreateRequirementDTO;

type DeleteRequirementDTO = {
	id: string;
};

type ApproveRequirementDTO = {
	id: string;
	isApproved: ApprovalStatus;
};

export type {
	CreateRequirementDTO,
	UpdateRequirementDTO,
	DeleteRequirementDTO,
	ApproveRequirementDTO
};
