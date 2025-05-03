import { USER } from '../user/user.DTO';

export type Login_Response = {
  access_token: string;
} & USER;
