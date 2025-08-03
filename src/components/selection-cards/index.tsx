import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PlaidAccount } from "@/lib/types/account";
import { Wallet, Briefcase, DollarSign } from "lucide-react";

interface SectionCardsProps {
  personalBalance: number;
  businessBalance: number;
  uncategorizedAccounts: PlaidAccount[];
  isLoading: boolean;
  hasLinkedAccount: boolean;
}

export function SectionCards({
  personalBalance,
  businessBalance,
  uncategorizedAccounts,
  isLoading,
  hasLinkedAccount,
}: SectionCardsProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
    });
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
        <Card className="animate-pulse bg-muted/50 h-[150px]"></Card>
        <Card className="animate-pulse bg-muted/50 h-[150px]"></Card>
      </div>
    );
  }

  if (!hasLinkedAccount) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Personal Balance Card */}
      <Card>
        <CardHeader>
          <CardDescription>Personal Net Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {formatCurrency(personalBalance)}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="flex gap-2 font-medium items-center text-sm">
            <Wallet className="size-4" /> Assets minus debts.
          </div>
        </CardFooter>
      </Card>

      {/* Business Balance Card */}
      <Card>
        <CardHeader>
          <CardDescription>Business Net Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {formatCurrency(businessBalance)}
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="flex gap-2 font-medium items-center text-sm">
            <Briefcase className="size-4" /> Assets minus debts.
          </div>
        </CardFooter>
      </Card>

      {/* Cards for Uncategorized Accounts */}
      {uncategorizedAccounts.map((account) => (
        <Card key={account.account_id}>
          <CardHeader>
            <CardDescription>{account.name}</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {formatCurrency(account.balances.current)}
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex gap-2 font-medium items-center text-sm">
              <DollarSign className="size-4" /> {account.subtype}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
