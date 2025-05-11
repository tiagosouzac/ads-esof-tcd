import type { CreateProjectDTO, FindProjectDTO, UpdateProjectDTO } from '$lib/dtos/project';
import type { Project } from '$lib/models/project';
import { HttpClient } from '$lib/utils/http-client';

class ProjectService {
	static async list() {
		const response = await HttpClient.get<Project[]>({ url: '/projects' });
		return response.data;
	}

	static async find({ id }: FindProjectDTO) {
		const response = await HttpClient.get<Project>({
			url: `/projects/${id}`
		});

		return response.data;
	}

	static async create(payload: CreateProjectDTO) {
		const response = await HttpClient.post<Project>({
			url: '/projects',
			json: payload
		});

		return response.data;
	}

	static async update({ id, ...payload }: UpdateProjectDTO & { id: string }) {
		const response = await HttpClient.put<Project>({
			url: `/projects/${id}`,
			json: payload
		});

		return response.data;
	}
}

export { ProjectService };
