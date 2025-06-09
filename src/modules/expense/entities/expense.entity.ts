import { Currency } from 'src/modules/utils/currency/entities/currency.entity';
import { ExpenseCategory } from '../expense-category/entities/expense-category.entity';

export class Expense {
  id?: number;
  name: string;
  expense_category?: number;
  amount: string;
  shop_id: number;
  currency?: number;
  expense_to_currency: Currency;
  expense_to_expense_category: ExpenseCategory;
}
