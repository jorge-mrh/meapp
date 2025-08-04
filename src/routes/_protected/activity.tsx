import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PlaidTransaction } from "@/lib/types/account";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import {
  getFormattedTransactionData,
  getTransactionData,
  type TransactionDataFormatParams,
  type TransactionDataRequestParams,
} from "@/lib/txClient";
import { formatCurrency } from "@/util/currencyHelper";

export const Route = createFileRoute("/_protected/activity")({
  component: ActivityComponent,
});

function TransactionRow({ tx }: { tx: PlaidTransaction }) {
  const isExpense = tx.amount > 0;
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-none">
      <div className="flex flex-col gap-1">
        <p className="font-medium">{tx.name}</p>
        <p className="text-sm text-muted-foreground">{tx.date}</p>
        <Badge variant="outline">
          {tx.personal_finance_category?.primary || "General"}
        </Badge>
      </div>
      <p className={`font-semibold ${isExpense ? "" : "text-green-600"}`}>
        {isExpense ? "" : "-"}
        {formatCurrency(Math.abs(tx.amount))}
      </p>
    </div>
  );
}

function ActivityComponent() {
  const {
    data: transactionData,
    isLoading,
    error,
  }: TransactionDataRequestParams = getTransactionData();

  const {
    currentMonthIncome,
    currentMonthExpenses,
    averageIncome,
    averageExpenses,
  }: TransactionDataFormatParams = useMemo(() => {
    const txData: TransactionDataFormatParams =
      getFormattedTransactionData(transactionData);

    return txData;
  }, [transactionData]);

  return (
    <div className="flex flex-1 flex-col @container/main">
      <div className="flex flex-col gap-4 p-4 pt-24 md:gap-6 md:p-6">
        <h1 className="text-3xl font-bold">Activity</h1>

        {/* --- NEW: Monthly Averages Card --- */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cash Flow</CardTitle>
            <CardDescription>
              Your income and expenses for the current month compared to your
              average.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 @sm/main:grid-cols-3">
            <div className="rounded-lg border bg-secondary p-4">
              <p className="text-sm text-secondary-foreground">
                Current Income
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(currentMonthIncome)}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Current Expenses</p>
              <p className="text-2xl font-bold text-destructive">
                {formatCurrency(currentMonthExpenses)}
              </p>
            </div>
            <div className={`rounded-lg border p-4`}>
              <p className={`text-sm text-muted-foreground`}>Average Flow</p>
              <div className="text-lg font-semibold">
                <p className="text-green-600">
                  {formatCurrency(averageIncome)} (Income)
                </p>
                <p className="text-destructive">
                  {formatCurrency(averageExpenses)} (Expenses)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* --- END: New Card --- */}

        {isLoading && <p>Loading transactions...</p>}
        {error && (
          <p className="text-destructive">
            Error fetching transactions: {error.message}
          </p>
        )}

        {transactionData && transactionData.length === 0 && (
          <p>No transactions found for your linked accounts.</p>
        )}

        <div className="flex flex-col gap-6">
          {transactionData?.map((item) => (
            <Card key={item.institution_id}>
              <CardHeader>
                <CardTitle>{item.institution_name}</CardTitle>
                <CardDescription>
                  Recent transactions from this account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {item.transactions.length > 0 ? (
                  item.transactions.map((tx) => (
                    <TransactionRow key={tx.transaction_id} tx={tx} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No transactions to display for this institution.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
