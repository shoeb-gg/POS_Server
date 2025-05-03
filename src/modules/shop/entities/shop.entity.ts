export class Shop {
  id: number;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  address: string;
  type_of_shop?: string | null;
  description?: string | null;
  user_id: number;
}
