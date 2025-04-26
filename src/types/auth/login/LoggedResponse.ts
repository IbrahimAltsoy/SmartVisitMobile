import { AccessToken } from "../token/AccessToken";

export interface LoggedResponse {
  accessToken: AccessToken;
  user: LoginUserDto;
  requiredAuthenticatorType: AuthenticatorType;
}
export interface LoginUserDto {
  id: string;
  name: string;
  email: string;
}
export enum AuthenticatorType {
  None = 0,
  Email = 1,
  Otp = 2,
}
