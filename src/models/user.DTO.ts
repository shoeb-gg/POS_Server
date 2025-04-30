import { user_type } from 'generated/prisma/client';

export type USER = {
  last_name: string;
  first_name: string;
  email: string;
  password?: string;
  phone: string;
  created_at?: Date;
  updates_at?: Date;
  user_type_col: user_type;
  id?: number;
};
