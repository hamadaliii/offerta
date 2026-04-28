export interface CompanyProfile {
  id?: string;
  user_id?: string;
  company_name: string;
  org_nr: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  default_tax_rate: number;
}

export interface LineItem {
  desc: string;
  qty: number;
  unit: string;
  price: number;
  row_total?: number;
}

export interface QuoteData {
  client_name: string;
  client_ref_person: string;
  client_address: string;
  currency: string;
  items: LineItem[];
  subtotal?: number;
  tax_amount?: number;
  grand_total?: number;
  debug_transcript?: string;
  error?: string;
}
