import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs as ShadcnTabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface TabsProps {
  className?: string;
}

const TabsComponent: React.FC<TabsProps> = ({ className }) => {
  return (
    <ShadcnTabs defaultValue="leads" className={cn("w-full", className)}>
      <TabsList className="grid w-full grid-cols-2 md:w-[200px]">
        <TabsTrigger value="sales">Sales</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
      </TabsList>
      <TabsContent value="sales">
        {/* Sales content can be added here */}
        <div className="p-4 text-center text-muted-foreground">
          Sales data and components will be displayed here.
        </div>
      </TabsContent>
      <TabsContent value="leads">
        {/* Leads content (other components like FunnelMetrics, Charts, etc.) will be children of this TabContent in the page layout */}
        {/* For this component, we are just setting up the tab structure. Actual content will be managed by the parent page. */}
        {/* This div is a placeholder to ensure TabsContent has a child */}
        <div></div>
      </TabsContent>
    </ShadcnTabs>
  );
};

export default TabsComponent;
