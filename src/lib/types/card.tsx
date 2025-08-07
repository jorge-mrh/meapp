import type { GroupedAccount } from "./account";

export interface HomeCard {
    title: string;
    description: string;
    value: string;
    relatedAccounts: GroupedAccount[];
}