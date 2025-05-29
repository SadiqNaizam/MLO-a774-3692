import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonStat {
  id: string;
  percentage: number;
  description: string;
}

const reasonsData: ReasonStat[] = [
  { id: 'proposalUnclear1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, description: 'However venture pursuit' },
  { id: 'other', percentage: 10, description: 'Other' },
  { id: 'proposalUnclear2', percentage: 30, description: 'The proposal is unclear' }, // As per image, this text is repeated
];

interface ReasonsStatsGridProps {
  className?: string;
}

const ReasonsStatsGrid: React.FC<ReasonsStatsGridProps> = ({ className }) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          {reasonsData.map((reason) => (
            <div key={reason.id} className="flex flex-col">
              <span className="text-3xl font-bold text-foreground">{reason.percentage}%</span>
              <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonsStatsGrid;
