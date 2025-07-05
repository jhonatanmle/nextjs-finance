import TotalCardSkeleton from "@/shared/components/total-card-skeleton";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="grid gap-6">
      {/* Metrics Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
          <TotalCardSkeleton />
          <TotalCardSkeleton />
          <TotalCardSkeleton />
          <TotalCardSkeleton />
        </section>
      </div>

      {/* Charts and Recent Transactions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Skeleton */}
        <Card className="col-span-4">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="pl-2">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>

        {/* Recent Transactions Skeleton */}
        <Card className="col-span-3">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Section Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-2 w-full rounded-full" />
                  <div className="mt-2 flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
