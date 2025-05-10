enum Role {
	ADMIN = 'ADMIN',
	PO = 'PO',
	PM = 'PM',
	DESIGNER = 'DESIGNER',
	DEVELOPER = 'DEVELOPER',
	VIEWER = 'VIEWER'
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
