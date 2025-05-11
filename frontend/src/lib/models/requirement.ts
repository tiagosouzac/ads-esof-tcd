enum RequirementStatus {
	PENDING = 'PENDING',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED'
}

class Requirement {
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly description: string,
		public readonly status: RequirementStatus,
		public readonly createdAt: Date,
		public readonly updatedAt: Date
	) {}
}

export { Requirement, RequirementStatus };
