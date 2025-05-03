import { USER } from '../core/user/user.DTO';

export type Login_Response = {
  access_token: string;
} & USER;
