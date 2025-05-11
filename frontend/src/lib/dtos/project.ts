type FindProjectDTO = {
	id: string;
};

type CreateProjectDTO = {
	name: string;
	description: string;
};

type UpdateProjectDTO = {
	id: string;
} & CreateProjectDTO;

export type { FindProjectDTO, CreateProjectDTO, UpdateProjectDTO };
