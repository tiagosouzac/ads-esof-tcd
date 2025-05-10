class HttpError {
	constructor(
		public readonly status: number,
		public readonly name: string,
		public readonly message: string,
		public readonly details?: Record<string, unknown>
	) {}
}

export { HttpError };
