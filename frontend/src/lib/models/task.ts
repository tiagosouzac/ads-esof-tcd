import type { ApprovalStatus } from './approval_status';

enum TaskStatus {
	PENDING = 'PENDING',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED'
}

class Task {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly description: string,
		public readonly status: TaskStatus,
		public readonly assignee: { id: string; name: string } | null,
		public readonly isApproved: ApprovalStatus,
		public readonly createdAt: Date,
		public readonly updatedAt: Date
	) {}
}

export { Task, TaskStatus };
