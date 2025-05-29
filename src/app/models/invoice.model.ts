export interface Invoice {
  id?: number;
  transactionDate: string;
  discount?: number;
  totalAmount?: number;
  balanceAmount?: number;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id?: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}