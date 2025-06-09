class Prototype {
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly link: string,
		public readonly projectId: number | null,
		public readonly createdAt: Date,
		public readonly updatedAt: Date
	) {}
}

export { Prototype };
