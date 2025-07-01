import { ReactNode, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";

type Props = {
  title?: ReactNode;
  value?: number;
  suffix?: ReactNode;
  prefix?: ReactNode;
  loading?: boolean;
  contentClassName?: string;
};

const TotalCard = ({
  title,
  value,
  prefix,
  suffix,
  loading,
  contentClassName,
}: Props) => {
  const formatValue = useMemo(() => {
    return (value ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [value]);

  return (
    <Card className="gap-0">
      {!loading ? (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "flex items-center text-lg sm:text-2xl font-bold",
                contentClassName
              )}
            >
              {prefix && <span>{prefix}</span>}
              {Number.isFinite(value) ? (
                formatValue
              ) : (
                <Skeleton className="h-4 w-full ml-2" />
              )}
              {suffix && <span className="ml-1">{suffix}</span>}
            </div>
          </CardContent>
        </>
      ) : (
        <div className="h-full flex flex-col w-full justify-center gap-3 p-4">
          <Skeleton className="h-4  w-[100px]" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}
    </Card>
  );
};

export default TotalCard;
