import type {
	ListPrototypeDTO,
	FindPrototypeDTO,
	CreatePrototypeDTO,
	UpdatePrototypeDTO,
	DeletePrototypeDTO,
	ApprovePrototypeDTO
} from '$lib/dtos/prototype';
import type { Prototype } from '$lib/models/prototype';
import { HttpClient } from '$lib/utils/http-client';

class PrototypeService {
	static async list({ projectId }: ListPrototypeDTO) {
		const response = await HttpClient.get<Prototype[]>({
			url: '/prototypes',
			params: { projectId: projectId.toString() }
		});
		return response.data;
	}

	static async find({ id }: FindPrototypeDTO) {
		const response = await HttpClient.get<Prototype>({
			url: `/prototypes/${id}`
		});

		return response.data;
	}

	static async create(payload: CreatePrototypeDTO) {
		const response = await HttpClient.post<Prototype>({
			url: '/prototypes',
			json: payload
		});

		return response.data;
	}

	static async update({ id, ...payload }: UpdatePrototypeDTO) {
		const response = await HttpClient.put<Prototype>({
			url: `/prototypes/${id}`,
			json: payload
		});

		return response.data;
	}

	static async delete({ id }: DeletePrototypeDTO) {
		await HttpClient.delete({
			url: `/prototypes/${id}`
		});
	}

	static async approve({ id, isApproved }: ApprovePrototypeDTO) {
		const response = await HttpClient.patch<Prototype>({
			url: `/prototypes/${id}/approve`,
			json: { isApproved }
		});

		return response.data;
	}
}

export { PrototypeService };
