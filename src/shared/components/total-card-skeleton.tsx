import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

const TotalCardSkeleton = () => {
  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-lg sm:text-2xl font-bold">
          <Skeleton className="h-6 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalCardSkeleton;