import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
}

export function DataTableSkeleton({ 
  columnCount, 
  rowCount = 5 
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array(columnCount)
                .fill(null)
                .map((_, index) => (
                  <TableHead key={`header-skeleton-${index}`}>
                    <Skeleton className="w-full h-4" />
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(rowCount)
              .fill(null)
              .map((_, index) => (
                <TableRow key={`skeleton-row-${index}`}>
                  {Array(columnCount)
                    .fill(null)
                    .map((_, indexColumn) => (
                      <TableCell key={`skeleton-cell-${indexColumn}`}>
                        <Skeleton className="w-full h-4" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-24 h-4" />
        <div className="flex space-x-2">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-20 h-8" />
        </div>
      </div>
    </div>
  );
}