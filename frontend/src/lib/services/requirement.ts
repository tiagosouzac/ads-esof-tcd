import type {
	CreateRequirementDTO,
	DeleteRequirementDTO,
	UpdateRequirementDTO,
	ApproveRequirementDTO
} from '$lib/dtos/requirement';
import type { Requirement } from '$lib/models/requirement';
import { HttpClient } from '$lib/utils/http-client';

class RequirementService {
	static async create(payload: CreateRequirementDTO) {
		const response = await HttpClient.post<Requirement>({
			url: '/requirements',
			json: payload
		});

		return response.data;
	}

	static async update({ id, ...payload }: UpdateRequirementDTO) {
		const response = await HttpClient.put<Requirement>({
			url: `/requirements/${id}`,
			json: payload
		});

		return response.data;
	}

	static async delete({ id }: DeleteRequirementDTO) {
		await HttpClient.delete({ url: `/requirements/${id}` });
	}

	static async approve({ id, isApproved }: ApproveRequirementDTO) {
		const response = await HttpClient.patch<Requirement>({
			url: `/requirements/${id}/approve`,
			json: { isApproved }
		});

		return response.data;
	}
}

export { RequirementService };
