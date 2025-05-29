import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { CalendarDays } from 'lucide-react';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 65, closedLost: 80 },
  { month: 'April', closedWon: 59, closedLost: 35 },
  { month: 'May', closedWon: 80, closedLost: 40 },
  { month: 'June', closedWon: 62, closedLost: 10 },
  { month: 'July', closedWon: 75, closedLost: 42 },
  { month: 'August', closedWon: 90, closedLost: 30 },
];

const totalClosedLeads = 680;
const totalLostLeads = 70;

interface LeadsTrackingChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-card p-2 shadow-lg border border-border">
        <p className="text-sm font-medium text-card-foreground">{label}</p>
        {payload.map((pld: any) => (
          <p key={pld.dataKey} style={{ color: pld.color }} className="text-xs">
            {pld.name}: {pld.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  const [activeFilter, setActiveFilter] = React.useState<'came' | 'converted' | 'size'>('converted');

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
            <div className="mt-1 space-x-4">
              <span className="text-2xl font-bold text-foreground">{totalClosedLeads}</span>
              <span className="text-sm text-muted-foreground">total closed</span>
              <span className="text-2xl font-bold text-foreground">{totalLostLeads}</span>
              <span className="text-sm text-muted-foreground">total lost</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <div className="flex items-center space-x-1 rounded-md border p-0.5">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveFilter('came')}
                className={cn(
                  "h-7 px-2 text-xs",
                  activeFilter === 'came' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:bg-muted/50'
                )}
              >
                Leads came
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveFilter('converted')}
                className={cn(
                  "h-7 px-2 text-xs",
                  activeFilter === 'converted' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:bg-muted/50'
                )}
              >
                Leads Converted
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveFilter('size')}
                className={cn(
                  "h-7 px-2 text-xs",
                  activeFilter === 'size' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-muted-foreground hover:bg-muted/50'
                )}
              >
                Total deals size
              </Button>
            </div>
            <Select defaultValue="last-6-months">
              <SelectTrigger className="w-auto text-xs h-8 px-2 border-none focus:ring-0 focus:ring-offset-0 bg-transparent text-muted-foreground hover:text-foreground">
                <CalendarDays className="h-3 w-3 mr-1.5" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="last-6-months">Last 6 months</SelectItem>
                <SelectItem value="last-12-months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                tickFormatter={(value) => `${value}`}
                domain={[0, 'dataMax + 10']}
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Legend 
                verticalAlign="bottom" 
                align="left" 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ paddingTop: '20px', paddingLeft: '10px' }}
                formatter={(value, entry) => <span style={{ color: 'hsl(var(--foreground))', marginLeft: '4px' }}>{value}</span>}
              />
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--accent))', strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))', fill: 'hsl(var(--accent))' }} />
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--destructive))', strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))', fill: 'hsl(var(--destructive))' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
