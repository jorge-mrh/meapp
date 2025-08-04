import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { PlaidBalanceResponse } from "@/lib/types/account";

const getBalance = async (): Promise<PlaidBalanceResponse[]> => {
  const { data, error } = await supabase.functions.invoke("get-balance");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useAccountBalance = () => {
  return useQuery({
    queryKey: ["plaidBalance"],
    queryFn: getBalance,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
