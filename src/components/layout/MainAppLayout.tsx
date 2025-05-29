import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  breadcrumbTitle?: string; // Optional: to pass to TopHeader
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, breadcrumbTitle }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />
      <div className="ml-64"> {/* Adjusts for fixed sidebar width (w-64 = 16rem = 256px) */}
        <TopHeader breadcrumbTitle={breadcrumbTitle} />
        <main 
          className={cn(
            "p-6 min-w-0", // Padding and min-width for flex/grid children behavior
            "mt-[70px]" // Margin top for fixed header (h-[70px])
          )}
          // The main content area itself scrolls vertically if its content exceeds viewport height minus header height.
          // Height constraint is necessary for 'overflow-y-auto' to work as intended for a specific region.
          style={{ height: 'calc(100vh - 70px)', overflowY: 'auto' }}
        >
          {/* This inner div ensures that elements inside main stack vertically with a gap */} 
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
