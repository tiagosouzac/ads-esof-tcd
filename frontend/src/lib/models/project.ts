import type { Requirement } from './requirement';
import type { Task } from './task';
import type { Prototype } from './prototype';

class Project {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly description: string,
		public readonly requirements: Requirement[],
		public readonly tasks: Task[],
		public readonly prototypes: Prototype[],
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
		public readonly architectId?: string,
		public readonly designerId?: string,
		public readonly developerId?: string,
		public readonly qualityAnalystId?: string
	) {}
}

export { Project };
