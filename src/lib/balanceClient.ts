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

  const personalAccounts: GroupedAccount[] = [];
  const liabilityAccounts: GroupedAccount[] = [];
  data.forEach((d:PlaidBalanceResponse) => {    
    //Gather all personal accounts
    const basePersonalAccounts = d.accounts.filter((acc => acc.holder_category === 'personal'))
    const personalAccountsGrouped: GroupedAccount = {
      accounts: basePersonalAccounts,
      institution_name: d.item.institution_name,
      item_id: d.item.item_id,
    }
    personalAccounts.push(personalAccountsGrouped);

    //Gather all liability accounts
    const baseLiabilityAccounts = d.accounts.filter((acc => !acc.holder_category && acc.type === 'loan' || acc.type === "credit"));
      const liabilityAccountsGrouped: GroupedAccount = {
        accounts: baseLiabilityAccounts,
        institution_name: d.item.institution_name,
        item_id: d.item.item_id,
    }
    liabilityAccounts.push(liabilityAccountsGrouped);
  })

  let totalAssets = 0;
  let totalLiabilities = 0;

  const allPersonalAccounts = personalAccounts.flatMap((item) => item.accounts);
  const allCurrentBalances = allPersonalAccounts.flatMap((item) => item.balances.current);
  totalAssets = allCurrentBalances.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const allLiabilityAccounts = liabilityAccounts.flatMap((item) => item.accounts);
  const allCurrentLiabilityValues = allLiabilityAccounts.flatMap((item) => item.balances.current);
  totalLiabilities = allCurrentLiabilityValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


  return {
    assets: totalAssets,
    liabilities: totalLiabilities,
    netWorth: totalAssets - totalLiabilities,
    groupedAccounts: personalAccounts,
  };
}
