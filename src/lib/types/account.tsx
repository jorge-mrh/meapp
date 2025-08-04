//BALANCES

export interface PlaidBalances {
  available: number | null;
  current: number;
  iso_currency_code: string;
  limit: number | null;
  unofficial_currency_code: string | null;
}

export interface PlaidAccount {
  account_id: string;
  balances: PlaidBalances;
  holder_category: "personal" | "business" | null;
  mask: string;
  name: string;
  official_name: string | null;
  subtype: string;
  type: "depository" | "credit" | "loan" | "investment" | "other";
}

export interface PlaidItem {
  available_products: string[];
  billed_products: string[];
  consent_expiration_time: string | null;
  error: null;
  institution_id: string;
  institution_name: string;
  item_id: string;
  products: string[];
  update_type: string;
  webhook: string;
}

export interface PlaidBalanceResponse {
  accounts: PlaidAccount[];
  item: PlaidItem;
  request_id: string;
}

//TRANSACTIONS

export interface PlaidTransactionCategory {
  detailed: string;
  primary: string;
}

export interface PlaidTransactionLocation {
  address: string | null;
  city: string | null;
  region: string | null;
  postal_code: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  store_number: string | null;
}

export interface PlaidTransaction {
  account_id: string;
  amount: number;
  iso_currency_code: string;
  date: string; // YYYY-MM-DD format
  datetime: string | null; // Full ISO 8601 timestamp
  name: string;
  merchant_name: string | null;
  payment_channel: "online" | "in store" | "other";
  pending: boolean;
  transaction_id: string;
  personal_finance_category: PlaidTransactionCategory | null;
  location: PlaidTransactionLocation;
}

export interface PlaidTransactionItem {
  institution_id: string;
  institution_name: string;
  transactions: PlaidTransaction[];
  error?: boolean;
}

export type PlaidTransactionResponse = PlaidTransactionItem[];
