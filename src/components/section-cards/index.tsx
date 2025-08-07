import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { HomeCard } from "@/lib/types/card";
import { Info } from "lucide-react";
import { Badge } from "../ui/badge";
import { Skeleton } from "@/components/ui/skeleton"

interface SectionCardsProps {
  cardsToShow: HomeCard[]
  isDataLoading: boolean;
}

//Skeleton for section cards
function SkeletonCard() {
  return (
    <div className="p-4 flex flex-col space-y-4 border border-border rounded-lg">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="h-8 w-1/3" />
      <div className="flex space-x-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  );
}

export function SectionCards({
  cardsToShow,
  isDataLoading,
}: SectionCardsProps) {

  if (isDataLoading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsToShow.map((card) => (
          <Card>          
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>
                {card.description}
              </CardDescription>
              <CardAction><Info size='16px'></Info></CardAction>
            </CardHeader>
            <CardContent>
              {card.value}
            </CardContent>
            <CardFooter>
              <div>
                {card.relatedAccounts.map((acc) => (
                  <Badge 
                    key={acc.item_id}
                    variant="secondary" 
                    className="bg-blue-500 mr-8"
                  >
                    {acc.institution_name}
                  </Badge>
                ))}
              </div>

            </CardFooter>
          </Card>
        ))}

      </div>
  );
}
