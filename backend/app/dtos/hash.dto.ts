type HashPasswordDTO = {
  password: string;
};

type ComparePasswordDTO = {
  password: string;
  hashedPassword: string;
};

export { HashPasswordDTO, ComparePasswordDTO };
