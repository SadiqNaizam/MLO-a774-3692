import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface OtherStat {
  id: string;
  value: string;
  label: string;
  showInfo?: boolean;
  infoText?: string;
}

const otherStatsData: OtherStat[] = [
  { id: 'totalLeads', value: '900', label: 'total leads count' },
  { id: 'avgConversionTime', value: '12', label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: '30', label: 'inactive leads', showInfo: true, infoText: 'Leads with no activity in the last 30 days.' },
];

interface OtherStatsGridProps {
  className?: string;
}

const OtherStatsGrid: React.FC<OtherStatsGridProps> = ({ className }) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Other data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {otherStatsData.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.showInfo && (
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground ml-1.5 cursor-help flex-shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-slate-800 text-white border-slate-800 max-w-xs">
                        <p>{stat.infoText || 'Additional information.'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherStatsGrid;
