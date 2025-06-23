import type { ApprovalStatus } from './approval_status';

class Prototype {
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly link: string,
		public readonly projectId: number | null,
		public readonly isApproved: ApprovalStatus,
		public readonly createdAt: Date,
		public readonly updatedAt: Date
	) {}
}

export { Prototype };
