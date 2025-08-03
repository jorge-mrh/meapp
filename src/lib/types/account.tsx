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
