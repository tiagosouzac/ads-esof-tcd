type FindProjectDTO = {
	id: string;
};

type CreateProjectDTO = {
	name: string;
	description: string;
	architect: number;
	designer: number;
	developer: number;
	qualityAnalyst: number;
};

type UpdateProjectDTO = {
	id: string;
} & CreateProjectDTO;

export type { FindProjectDTO, CreateProjectDTO, UpdateProjectDTO };
