class JwtDTO {
  constructor(
    public readonly token: string,
    public readonly expiresIn: number
  ) {}
}

type GenerateJwtTokenDTO = {
  id: number;
  name: string;
  email: string;
};

type VerifyJwtTokenDTO = {
  token: string;
};

export { JwtDTO, GenerateJwtTokenDTO, VerifyJwtTokenDTO };
