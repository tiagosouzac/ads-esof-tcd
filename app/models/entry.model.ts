class Entry {
  constructor(
    public userId: number,
    public timestamp: Date,
    public type: "in" | "out",
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

export { Entry };
