import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const data = [
  { day: "Mon", steps: 6120 },
  { day: "Tue", steps: 7420 },
  { day: "Wed", steps: 6890 },
  { day: "Thu", steps: 8010 },
  { day: "Fri", steps: 9340 },
  { day: "Sat", steps: 10420 },
  { day: "Sun", steps: 7520 },
];

export default function WellbeingChart() {
  return (
    <div className="mt-5 rounded-lg border bg-transparent supports-[backdrop-filter]:bg-background/20 backdrop-blur-sm p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium">Weekly activity</p>
        <p className="text-xs text-muted-foreground">steps</p>
      </div>
      <ChartContainer
        config={{ steps: { label: "Steps", color: "hsl(var(--primary))" } }}
        className="h-36 w-full"
      >
        <AreaChart data={data} margin={{ left: 6, right: 6 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} dy={6} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Area
            dataKey="steps"
            type="monotone"
            fill="var(--color-steps)"
            fillOpacity={0.2}
            stroke="var(--color-steps)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
