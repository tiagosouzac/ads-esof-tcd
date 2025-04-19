class Exception extends Error {
  readonly details?: Record<string, any>;

  constructor(message: string, details?: Record<string, any>) {
    super(message);
    this.name = "Exception";
    this.details = details;
  }
}

export { Exception };
