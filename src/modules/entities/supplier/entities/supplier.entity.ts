export class Supplier {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  country: string | null;
  city: string | null;
  company: string | null;
  address: string | null;
  user_id?: number;
  created_on: Date;
  updated_on: Date;
}
