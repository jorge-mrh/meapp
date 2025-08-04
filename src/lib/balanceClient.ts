import { useFetchBalances } from "@/hooks/balance/useFetchBalances";
import type { GroupedAccount, PlaidBalanceResponse } from "./types/account";

export interface BalanceDataRequestParams {
  data: PlaidBalanceResponse[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface BalanceDataFormatParams {
  assets: number;
  liabilities: number;
  netWorth: number;
  groupedAccounts: GroupedAccount[];
}

export function getBalanceData(): BalanceDataRequestParams {
  const balances: BalanceDataRequestParams = useFetchBalances();
  return balances;
}

export function getFormattedBalanceData(
  data: PlaidBalanceResponse[] | undefined,
): BalanceDataFormatParams {
  if (!data || !Array.isArray(data)) {
    return { assets: 0, liabilities: 0, netWorth: 0, groupedAccounts: [] };
  }

  let totalAssets = 0;
  let totalLiabilities = 0;

  const allAccounts = data.flatMap((item) => item.accounts);

  allAccounts.forEach((account) => {
    // For this summary, let's focus on personal accounts.
    if (account.holder_category !== "business") {
      if (account.type === "depository" || account.type === "investment") {
        totalAssets += account.balances.current;
      } else if (account.type === "credit" || account.type === "loan") {
        totalLiabilities += account.balances.current;
      }
    }
  });

  const grouped = data.reduce<GroupedAccount[]>((acc, item) => {
    acc.push({
      institution_name: item.item.institution_name,
      item_id: item.item.item_id,
      accounts: item.accounts,
    });
    return acc;
  }, []);

  return {
    assets: totalAssets,
    liabilities: totalLiabilities,
    netWorth: totalAssets - totalLiabilities,
    groupedAccounts: grouped,
  };
}
