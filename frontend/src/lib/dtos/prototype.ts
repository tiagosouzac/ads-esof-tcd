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

export type {
	ListPrototypeDTO,
	FindPrototypeDTO,
	CreatePrototypeDTO,
	UpdatePrototypeDTO,
	DeletePrototypeDTO
};
