export interface SignupInputDTO {
  name: string;
  nickname: string;
  email: string;
  password: string;
  role: string;
  device: string;
}

export interface SignupBandInputDTO {
  name: string;
  nickname: string;
  email: string;
  password: string;
  role: string;
  device: string;
  description: string;
}

export interface LoginInputDTO {
  emailOrNick: string;
  password: string;
  device: string;
}
