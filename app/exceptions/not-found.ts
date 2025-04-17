class NotFoundException extends Error {
  constructor(message = "The requested resource was not found.") {
    super(message);
    this.name = "Not Found";
  }
}

export { NotFoundException };
