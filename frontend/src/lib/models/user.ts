enum Role {
	MANAGER = 'MANAGER',
	ARCHITECT = 'ARCHITECT',
	DESIGNER = 'DESIGNER',
	DEVELOPER = 'DEVELOPER',
	QUALITY_ANALYST = 'QUALITY_ANALYST'
}

class User {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly email: string,
		public readonly password: string,
		public readonly role: Role,
		public readonly createdAt: Date,
		public readonly updatedAt: Date
	) {}
}

export { User, Role };
