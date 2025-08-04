import { useFetchTransactions } from "@/hooks/transaction/useFetchTransactions";
import type { PlaidTransactionResponse } from "./types/account";

export interface TransactionDataRequestParams {
  data: PlaidTransactionResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface TransactionDataFormatParams {
  currentMonthIncome: number;
  currentMonthExpenses: number;
  averageIncome: number;
  averageExpenses: number;
}

export function getTransactionData(): TransactionDataRequestParams {
  const transactions: TransactionDataRequestParams = useFetchTransactions();
  return transactions;
}

export function getFormattedTransactionData(
  transactionData: PlaidTransactionResponse | undefined,
): TransactionDataFormatParams {
  if (!transactionData || !Array.isArray(transactionData)) {
    return {
      currentMonthIncome: 0,
      currentMonthExpenses: 0,
      averageIncome: 0,
      averageExpenses: 0,
    };
  }

  const allTransactions = transactionData.flatMap((item) => item.transactions);

  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const monthlyTotals: Record<string, { income: number; expenses: number }> =
    {};

  allTransactions.forEach((tx) => {
    const category = tx.personal_finance_category?.primary;
    const isTransfer = category === "TRANSFER" || category === "LOAN_PAYMENTS";
    const isLikelyInternal =
      tx.name.includes("PAYMENT") || tx.name.includes("DEPOSIT");

    if (isTransfer || isLikelyInternal) {
      return;
    }

    const month = tx.date.substring(0, 7);
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = { income: 0, expenses: 0 };
    }

    if (tx.amount < 0) {
      monthlyTotals[month].income += Math.abs(tx.amount);
    } else {
      monthlyTotals[month].expenses += tx.amount;
    }
  });

  // Calculate current month's totals
  const currentMonthIncome = monthlyTotals[currentMonthStr]?.income || 0;
  const currentMonthExpenses = monthlyTotals[currentMonthStr]?.expenses || 0;

  // Calculate averages from previous months
  const previousMonths = Object.keys(monthlyTotals).filter(
    (month) => month !== currentMonthStr,
  );

  let averageIncome = 0;
  let averageExpenses = 0;

  if (previousMonths.length > 0) {
    const totalPastIncome = previousMonths.reduce(
      (sum, month) => sum + monthlyTotals[month].income,
      0,
    );
    const totalPastExpenses = previousMonths.reduce(
      (sum, month) => sum + monthlyTotals[month].expenses,
      0,
    );
    averageIncome = totalPastIncome / previousMonths.length;
    averageExpenses = totalPastExpenses / previousMonths.length;
  }

  return {
    currentMonthIncome,
    currentMonthExpenses,
    averageIncome,
    averageExpenses,
  };
}
