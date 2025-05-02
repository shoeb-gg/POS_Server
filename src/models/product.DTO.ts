model PRODUCTS {
    id                String             
    created_at        DateTime           
    updated_at        DateTime            
    name              String
    quantity_type     String              
    price_amount      Float?
    price_unit        String?            
    category          String?             
    subcategory       String?             
    description       String?
    stockCount             String              
  }
  