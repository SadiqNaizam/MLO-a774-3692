import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { CalendarDays, Info } from 'lucide-react';

interface SourceDataPoint {
  name: string;
  value: number; // Represents the monetary value, e.g., $3000
  leads: number; // Represents the percentage or raw count of leads
  color: string;
}

const sourceData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, leads: 50, color: 'hsl(var(--chart-color-2))' }, // Orange
  { name: 'Behance', value: 1000, leads: 40, color: 'hsl(var(--chart-color-1))' }, // Yellow
  { name: 'Instagram', value: 1000, leads: 25, color: 'hsl(var(--chart-color-3))' }, // Blue
  { name: 'Dribbble', value: 1000, leads: 15, color: 'hsl(var(--chart-color-4))' }, // Green
  { name: 'Referral', value: 800, leads: 10, color: 'hsl(var(--chart-color-5))' }, // Purple
];

interface SourcePieChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-card p-2 shadow-lg border border-border">
        <p className="text-sm font-medium text-card-foreground">{`${payload[0].name}`}</p>
        <p className="text-xs text-muted-foreground">{`Value: $${payload[0].payload.value.toLocaleString()}`}</p>
        <p className="text-xs text-muted-foreground">{`Leads: ${payload[0].payload.leads}%`}</p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="mt-4 space-y-2 text-sm">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center justify-between">
          <div className="flex items-center">
            <span style={{ backgroundColor: entry.color }} className="mr-2 h-3 w-3 rounded-full inline-block" />
            <span className="text-foreground">{entry.value}</span>
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground mr-3">${entry.payload.payload.value.toLocaleString()}</span>
            <span className="text-foreground w-8 text-right">{entry.payload.payload.leads}%</span>
            {entry.value === 'Dribbble' && (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground ml-1 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 text-white border-slate-800">
                      <p>From leads total</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
            )}
          </div> 
        </li>
      ))}
    </ul>
  );
};

const SourcePieChart: React.FC<SourcePieChartProps> = ({ className }) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Sources</CardTitle>
        <Select defaultValue="last-6-months">
          <SelectTrigger className="w-auto text-xs h-8 px-2 border-none focus:ring-0 focus:ring-offset-0 bg-transparent text-muted-foreground hover:text-foreground">
            <CalendarDays className="h-3 w-3 mr-1.5" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-12-months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }}/>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="leads" // The value that determines pie slice size
                nameKey="name"
                legendType="none"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
              <Legend content={renderLegend} verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcePieChart;
