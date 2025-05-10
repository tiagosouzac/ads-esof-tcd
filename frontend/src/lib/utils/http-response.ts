class HttpResponse<T> {
	constructor(
		public readonly status: number,
		public readonly data: T
	) {}
}

export { HttpResponse };
