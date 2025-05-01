type GenerateJwtTokenDTO = {
  id: number;
  name: string;
  email: string;
};

type VerifyJwtTokenDTO = {
  token: string;
};

export { GenerateJwtTokenDTO, VerifyJwtTokenDTO };
