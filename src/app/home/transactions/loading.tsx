import { DataTableSkeleton } from "@/shared/components/datatable-skeleton";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function TransactionsLoading() {
  return (
    <div className="grid grid-cols-1 gap-y-6">
      {/* Filter Form Skeleton */}
      <div className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-end md:gap-6">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      {/* Table Skeleton */}
      <DataTableSkeleton columnCount={6} rowCount={10} />
    </div>
  );
}