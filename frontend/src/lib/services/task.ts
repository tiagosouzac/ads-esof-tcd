import type { ApproveTaskDTO, CreateTaskDTO, DeleteTaskDTO, UpdateTaskDTO } from '$lib/dtos/task';
import type { Task } from '$lib/models/task';
import { HttpClient } from '$lib/utils/http-client';

class TaskService {
	static async create(payload: CreateTaskDTO) {
		const response = await HttpClient.post<Task>({
			url: '/tasks',
			json: payload
		});

		return response.data;
	}

	static async update({ id, ...payload }: UpdateTaskDTO) {
		const response = await HttpClient.put<Task>({
			url: `/tasks/${id}`,
			json: payload
		});

		return response.data;
	}

	static async delete({ id }: DeleteTaskDTO) {
		await HttpClient.delete({ url: `/tasks/${id}` });
	}

	static async approve({ id, isApproved }: ApproveTaskDTO) {
		const response = await HttpClient.patch<Task>({
			url: `/tasks/${id}/approve`,
			json: { isApproved }
		});

		return response.data;
	}
}

export { TaskService };
