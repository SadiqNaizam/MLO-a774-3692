import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming React Router for navigation
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutGrid,
  Users,
  UserRound,
  FileText,
  FileSpreadsheet,
  ShoppingBag,
  Mail as MailIcon, // Renamed to avoid conflict if Mail component exists
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon, // Renamed to avoid conflict
  Menu
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  activeMatcher?: (pathname: string) => boolean;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutGrid, activeMatcher: (pathname) => pathname === '/' },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Customers", href: "/customers", icon: UserRound },
  { label: "Proposals", href: "/proposals", icon: FileText },
  { label: "Invoices", href: "/invoices", icon: FileSpreadsheet },
  { label: "Items", href: "/items", icon: ShoppingBag },
  { label: "Mail", href: "/mail", icon: MailIcon },
  { label: "Shoebox", href: "/shoebox", icon: Archive },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
];

const bottomNavItems: NavItem[] = [
  { label: "Help", href: "/help", icon: HelpCircle },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
  // As per image, there's a second Help link at the very bottom
  { label: "Support", href: "/support", icon: HelpCircle }, // Using 'Support' for distinct key/href
];

const SidebarNav: React.FC = () => {
  const location = useLocation();

  const renderNavItem = (item: NavItem, index: number) => {
    const IconComponent = item.icon;
    const isActive = item.activeMatcher ? item.activeMatcher(location.pathname) : location.pathname.startsWith(item.href) && item.href !== '/';
    const effectiveIsActive = item.href === '/' ? location.pathname === '/' : isActive;

    return (
      <li key={`${item.label}-${index}">
        <Link
          to={item.href}
          className={cn(
            "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150",
            effectiveIsActive
              ? "bg-primary/10 text-primary"
              : "text-sidebar-foreground/80 hover:bg-primary/5 hover:text-primary"
          )}
        >
          <IconComponent className="h-5 w-5 flex-shrink-0" />
          <span>{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-sidebar text-sidebar-foreground flex flex-col border-r border-border z-20">
      <div className="flex items-center space-x-2 p-4 h-[70px] border-b border-sidebar-foreground/10">
        <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-foreground/10">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary shrink-0">
          <span className="text-lg font-bold text-primary-foreground">DO</span>
        </div>
        {/* Optional: App Name if needed next to logo 
        <span className="text-lg font-semibold">App Name</span> 
        */} 
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
        <ul className="space-y-1.5">
          {mainNavItems.map(renderNavItem)}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-sidebar-foreground/10">
        <ul className="space-y-1.5">
          {bottomNavItems.map(renderNavItem)}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarNav;
