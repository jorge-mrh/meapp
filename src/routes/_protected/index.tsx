import { SectionCards } from "@/components/selection-cards";
import { createFileRoute } from "@tanstack/react-router";
import { PlaidLink } from "@/components/plaid/PlaidLink";
import { useAccountBalance } from "@/hooks/balance/useAccountBalance";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useMemo } from "react";

export const Route = createFileRoute("/_protected/")({
  component: Index,
});

function Index() {
  const { data: data, isLoading, error } = useAccountBalance();
  const personalTotalBalance = useMemo(() => {
    if (!data) return 0;
    return data.accounts
      .filter((acc) => acc.holder_category === "personal")
      .reduce((total, account) => {
        const balance = account.balances.current;
        if (account.type === "depository") return total + balance;
        if (account.type === "credit" || account.type === "loan")
          return total - balance;
        return total;
      }, 0);
  }, [data]);

  const businessTotalBalance = useMemo(() => {
    if (!data) return 0;
    return data.accounts
      .filter((acc) => acc.holder_category === "business")
      .reduce((total, account) => {
        const balance = account.balances.current;
        if (account.type === "depository") return total + balance;
        if (account.type === "credit" || account.type === "loan")
          return total - balance;
        return total;
      }, 0);
  }, [data]);

  const uncategorizedAccounts = useMemo(() => {
    if (!data) return [];
    return data.accounts.filter(
      (acc) =>
        acc.holder_category === null || acc.holder_category === undefined,
    );
  }, [data]);

  const hasLinkedAccount = !!data && data.accounts.length > 0 && !error;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 md:pt-20">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Bank Account</CardTitle>
                <CardDescription>
                  Link your bank account to see your current balance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlaidLink />
                <div className="mt-4 text-lg">
                  {isLoading && <p>Loading balance...</p>}
                  {error && !isLoading && (
                    <p className="text-sm text-muted-foreground">
                      No account linked yet. Link an account to see your
                      balance.
                    </p>
                  )}
                  {hasLinkedAccount && (
                    <p>
                      Total Net Worth:{" "}
                      <span className="font-bold">
                        {(
                          personalTotalBalance + businessTotalBalance
                        ).toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <SectionCards
            personalBalance={personalTotalBalance}
            businessBalance={businessTotalBalance}
            uncategorizedAccounts={uncategorizedAccounts}
            isLoading={isLoading}
            hasLinkedAccount={hasLinkedAccount}
          />
        </div>
      </div>
    </div>
  );
}
