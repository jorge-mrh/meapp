import { createFileRoute } from "@tanstack/react-router";
import { PlaidLink } from "@/components/plaid/PlaidLink";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

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
      <div className="p-4 grid grid-cols-1">
        {/* Main Financial Summary Card */}
        <SectionCards cardsToShow={cardsData} isDataLoading={isLoading}></SectionCards>

        {/* Linked Accounts Section */}
        <Card className="mt-5">          
          {/* <CardHeader>
            <CardTitle>
            {isLoading && <p>Loading accounts...</p>}
            {error && !isLoading && (
              <p className="text-sm text-muted-foreground">
                No account linked yet. Link an account to see your balance.
              </p>
            )}
            {!error && !isLoading && (
              <p>Accounts</p>
            )}
            </CardTitle>
            <CardDescription>
              Accounts that you have linked
            </CardDescription>
            <CardAction><Info size='16px'></Info></CardAction>
          </CardHeader> */}
          <CardContent>
            <div>
              {formattedBalanceData.groupedAccounts.map((acc) => (
                <Badge 
                  key={acc.item_id}
                  variant="secondary" 
                  className="bg-blue-500 mr-8"
                >
                  {acc.institution_name}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <PlaidLink />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
