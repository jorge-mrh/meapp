import { createFileRoute } from "@tanstack/react-router";
import { PlaidLink } from "@/components/plaid/PlaidLink";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useMemo } from "react";
import {
  getBalanceData,
  getFormattedBalanceData,
  type BalanceDataFormatParams,
} from "@/lib/balanceClient";
import { formatCurrency } from "@/util/currencyHelper";

export const Route = createFileRoute("/_protected/")({
  component: Index,
});

function Index() {
  const { data, isLoading, error } = getBalanceData();

  const {
    assets,
    liabilities,
    netWorth,
    groupedAccounts,
  }: BalanceDataFormatParams = useMemo(() => {
    const balanceData: BalanceDataFormatParams = getFormattedBalanceData(data);

    return balanceData;
  }, [data]);

  console.log({ assets, liabilities, netWorth, groupedAccounts });

  return (
    <div className="flex flex-1 flex-col @container/main">
      <div className="flex flex-col gap-4 p-4 pt-24 md:gap-6 md:p-6">
        {/* Main Financial Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>
              A summary of your linked personal accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 @sm/main:grid-cols-3">
            <div className="rounded-lg border bg-secondary p-4">
              <p className="text-sm text-secondary-foreground">Total Assets</p>
              <p className="text-2xl font-bold text-secondary-foreground">
                {formatCurrency(assets)}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Total Liabilities</p>
              <p className="text-2xl font-bold text-destructive">
                {formatCurrency(liabilities)}
              </p>
            </div>
            <div className="rounded-lg border bg-primary p-4">
              <p className="text-sm text-primary-foreground">Net Worth</p>
              <p className="text-2xl font-bold text-primary-foreground">
                {formatCurrency(netWorth)}
              </p>
            </div>
          </CardContent>
        </Card>

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

        {groupedAccounts.length > 0 && (
          <div className="flex flex-col gap-4">
            {groupedAccounts.map((group) => (
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
