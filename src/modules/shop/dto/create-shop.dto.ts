export class CreateShopDto {
  created_at?: Date;
  updated_at?: Date;
  name: string;
  address: string;
  type_of_shop?: string;
  description?: string;
  user_id: number;
}
