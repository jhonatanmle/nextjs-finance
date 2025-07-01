import { Goal } from "@/features/goals/goals.schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { AmountUtils } from "@/shared/lib/amount";
import { cn } from "@/shared/lib/utils";

type Props = React.ComponentProps<"div"> & {
  data: Goal[];
};

const GoalsMetrics = ({ data, className }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Objetivos de ahorro</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn("overflow-auto grid grid-cols-1 gap-y-4", className)}
        >
          {data?.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <p className="font-light text-muted-foreground">{goal.name}</p>
              <Progress
                value={AmountUtils.round(
                  (goal.currentAmount! / goal.targetAmount) * 100
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsMetrics;
