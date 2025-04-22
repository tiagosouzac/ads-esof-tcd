class Session {
  constructor(
    public userId: number,
    public token: string,
    public expiresAt: Date,
    public id?: number,
    public createdAt?: Date
  ) {}
}

export { Session };
