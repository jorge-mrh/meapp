import { createFileRoute } from "@tanstack/react-router";
import { useFetchTransactions } from "@/hooks/transaction/useFetchTransactions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PlaidTransaction } from "@/lib/types/account";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_protected/activity")({
  component: ActivityComponent,
});

// A simple utility to format currency
const formatCurrency = (value: number, currency: string) => {
  return value.toLocaleString("de-DE", {
    style: "currency",
    currency: currency,
  });
};

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
        {formatCurrency(Math.abs(tx.amount), tx.iso_currency_code)}
      </p>
    </div>
  );
}

function ActivityComponent() {
  const { data: transactionData, isLoading, error } = useFetchTransactions();

  return (
    <div className="flex flex-1 flex-col @container/main">
      <div className="flex flex-col gap-4 p-4 pt-24 md:gap-6 md:p-6">
        <h1 className="text-3xl font-bold">Activity</h1>

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
