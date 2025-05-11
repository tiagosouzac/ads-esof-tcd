import type { Requirement } from './requirement';
import type { Task } from './task';

class Project {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly description: string,
		public readonly requirements: Requirement[],
		public readonly tasks: Task[],
		public readonly createdAt: Date,
		public readonly updatedAt: Date
	) {}
}

export { Project };
