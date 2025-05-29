import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  avgTime: string;
  color: string;
  showTooltip?: boolean;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, avgTime: '2 days', color: 'bg-rose-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, avgTime: '2 days', color: 'bg-amber-500', showTooltip: true },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, avgTime: '5 days', color: 'bg-indigo-600' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, avgTime: '8 days', color: 'bg-emerald-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, avgTime: '10 days', color: 'bg-purple-600' },
];

const totalActiveLeads = 600;

interface FunnelMetricsProps {
  className?: string;
}

const FunnelMetrics: React.FC<FunnelMetricsProps> = ({ className }) => {
  const totalFunnelCount = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{totalActiveLeads}</span>
          <span className="ml-2 text-sm text-muted-foreground">active leads</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-200">
            {funnelData.map((stage) => (
              <div
                key={stage.id}
                className={cn("h-full", stage.color)}
                style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
              />
            ))}
          </div>
        </div>
        <ul className="space-y-3">
          {funnelData.map((stage) => (
            <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn("h-3 w-3 rounded-full", stage.color)} />
              <span className="text-foreground truncate">{stage.name}</span>
              <span className="text-muted-foreground justify-self-end font-medium">{stage.count}</span>
              <span className="text-muted-foreground justify-self-end font-medium">${stage.value}</span>
              {stage.showTooltip ? (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <span className="text-muted-foreground justify-self-end cursor-default relative">
                        {stage.avgTime}
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full animate-ping"></div>
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></div>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 text-white border-slate-800">
                      <p>Average time on this stage</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <span className="text-muted-foreground justify-self-end">{stage.avgTime}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelMetrics;
