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

export type { CreateRequirementDTO, UpdateRequirementDTO, DeleteRequirementDTO };
