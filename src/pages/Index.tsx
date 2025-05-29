import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FunnelMetrics from '../components/Dashboard/FunnelMetrics';
import SourcePieChart from '../components/Dashboard/SourcePieChart';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import ReasonsStatsGrid from '../components/Dashboard/ReasonsStatsGrid';
import OtherStatsGrid from '../components/Dashboard/OtherStatsGrid';
import { Card, CardContent } from '@/components/ui/card'; // For sales tab placeholder content styling

const DashboardOverviewPage: React.FC = () => {
  return (
    <MainAppLayout breadcrumbTitle="Dashboard">
      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[200px]">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        <TabsContent value="sales">
          <Card>
            <CardContent className="pt-6">
              <div className="p-10 text-center text-muted-foreground">
                Sales data and components will be displayed here.
                <br />
                (This is placeholder content for the Sales tab)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leads" className="flex flex-col gap-6 mt-4 md:mt-0">
          {/* Row 1: Funnel Metrics and Source Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <FunnelMetrics className="lg:col-span-2" />
            <SourcePieChart className="lg:col-span-3" />
          </div>

          {/* Row 2: Leads Tracking Chart */}
          <LeadsTrackingChart />

          {/* Row 3: Reasons Stats Grid and Other Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReasonsStatsGrid />
            <OtherStatsGrid />
          </div>
        </TabsContent>
      </Tabs>
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
