import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { PlaidBalanceResponse } from "@/lib/types/account";

const getBalance = async (): Promise<PlaidBalanceResponse[]> => {
  const { data, error } = await supabase.functions.invoke("get-balance");
  if (error) {
    throw new Error(error.message);
  }
  return data as PlaidBalanceResponse[];
};

export const useFetchBalances = () => {
  return useQuery({
    queryKey: ["plaidBalance"],
    queryFn: getBalance,
    retry: false,
    enabled: true,
    staleTime: 1000 * 60 * 15, // Cache data for 15 minutes
  });
};
