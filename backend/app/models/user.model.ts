class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: "admin" | "manager" | "hr" | "user",
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

export { User };
