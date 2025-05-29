import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus } from 'lucide-react';

interface TopHeaderProps {
  breadcrumbTitle?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ breadcrumbTitle = "Dashboard" }) => {
  const createMenuItems = [
    { label: "New Lead", action: () => console.log("Create New Lead") },
    { label: "New Contact", action: () => console.log("Create New Contact") },
    { label: "New Company", action: () => console.log("Create New Company") },
    { label: "New Deal", action: () => console.log("Create New Deal") },
    { label: "New Task", action: () => console.log("Create New Task"), separator: true },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-64 right-0 h-[70px] z-10",
        "bg-card text-foreground",
        "flex items-center justify-between px-6 border-b border-border shadow-sm"
      )}
    >
      <div>
        {/* In a real app, breadcrumbs would be more dynamic */} 
        <h1 className="text-xl font-semibold text-foreground">{breadcrumbTitle}</h1>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {createMenuItems.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.separator && <DropdownMenuSeparator />}
                <DropdownMenuItem onClick={item.action} className="cursor-pointer">
                  {item.label}
                </DropdownMenuItem>
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
