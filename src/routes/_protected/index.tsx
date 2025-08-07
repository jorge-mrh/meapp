import { createFileRoute } from "@tanstack/react-router";
import { PlaidLink } from "@/components/plaid/PlaidLink";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useMemo } from "react";
import {
  getBalanceData,
  getFormattedBalanceData,
  type BalanceDataFormatParams,
} from "@/lib/balanceClient";
import { formatCurrency } from "@/util/currencyHelper";
import type { HomeCard } from "@/lib/types/card";
import { SectionCards } from "@/components/section-cards";

export const Route = createFileRoute("/_protected/")({
  component: Index,
});

function Index() {
  const { data, isLoading, error } = getBalanceData();

  const formattedBalanceData: BalanceDataFormatParams = useMemo(() => {
    const balanceData: BalanceDataFormatParams = getFormattedBalanceData(data);
    return balanceData;
  }, [data]);

  console.log({formattedBalanceData});
  const cardsData: HomeCard[] = useMemo(() => {
    const assetsCard: HomeCard = {
      title: 'Total Assets',
      description: 'This is the sum of what you currently have in your linked accounts',
      value: formatCurrency(formattedBalanceData.assets),
      relatedAccounts: formattedBalanceData.groupedAccounts,
    }

    const liabilitiesCard: HomeCard = {
      title: 'Total Liabilities',
      description: 'This is the sum of what you currently owe in your linked accounts',
      value: formatCurrency(formattedBalanceData.liabilities),
      relatedAccounts: formattedBalanceData.groupedAccounts
    }

    const netWorthCard: HomeCard = {
      title: 'Net Worth',
      description: 'This is your networth, based on your linked accounts',
      value: formatCurrency(formattedBalanceData.netWorth),
      relatedAccounts: formattedBalanceData.groupedAccounts,
    }

    return [assetsCard, liabilitiesCard, netWorthCard];
  }, [formattedBalanceData])


  return (
    <div className="flex flex-1 flex-col @container/main">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
        {/* Main Financial Summary Card */}
        <SectionCards cardsToShow={cardsData} isDataLoading={isLoading}></SectionCards>

        {/* Linked Accounts Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Linked Accounts</h2>
          <PlaidLink />
        </div>

        {isLoading && <p>Loading accounts...</p>}
        {error && !isLoading && (
          <p className="text-sm text-muted-foreground">
            No account linked yet. Link an account to see your balance.
          </p>
        )}

        {formattedBalanceData.groupedAccounts.length > 0 && (
          <div className="flex flex-col gap-4">
            {formattedBalanceData.groupedAccounts.map((group) => (
              <Card key={group.item_id}>
                <CardHeader>
                  <CardTitle>{group.institution_name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {group.accounts.map((account) => (
                    <div
                      key={account.account_id}
                      className="flex justify-between items-center rounded-md border p-3"
                    >
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {account.official_name || account.subtype} (
                          {account.mask})
                        </p>
                      </div>
                      <p className="font-semibold text-lg">
                        {formatCurrency(account.balances.current)}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
