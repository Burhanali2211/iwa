'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Building2,
  Download,
  FileText,
  BookOpen,
  School,
  Library,
  Heart,
  Phone,
  Bell,
  Clock,
  Book,
  UserPlus,
  Shield,
  Database,
  ChevronLeft
} from 'lucide-react';
import { Icon as LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const mainMenuItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Tasks', href: '/admin/tasks', icon: ClipboardList, badge: 12 },
  { name: 'Calendar', href: '/admin/calendar', icon: Calendar },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Team', href: '/admin/team', icon: Users },
];

const cmsMenuItems: NavItem[] = [
  { name: 'CMS Overview', href: '/admin/cms', icon: FileText },
  { name: 'Home Page', href: '/admin/cms/home', icon: Building2 },
  { name: 'Religious Content', href: '/admin/cms/religious', icon: Book },
  { name: 'School Management', href: '/admin/cms/school', icon: School },
  { name: 'Library', href: '/admin/cms/library', icon: Library },
  { name: 'Donations', href: '/admin/cms/donations', icon: Heart },
  { name: 'Events', href: '/admin/cms/events', icon: Calendar },
  { name: 'Contact', href: '/admin/cms/contact', icon: Phone },
];

const islamicMenuItems: NavItem[] = [
  { name: 'Prayer Times', href: '/admin/prayer-times', icon: Clock },
  { name: 'Islamic Calendar', href: '/admin/islamic-calendar', icon: Calendar },
  { name: 'Quran Content', href: '/admin/quran-content', icon: Book },
  { name: 'Khutba Management', href: '/admin/khutba', icon: Book },
  { name: 'Fatwa Database', href: '/admin/fatwa', icon: Database },
];

const userMenuItems: NavItem[] = [
  { name: 'All Users', href: '/admin/users', icon: Users },
  { name: 'Create User', href: '/admin/users/create', icon: UserPlus },
  { name: 'Roles & Permissions', href: '/admin/roles', icon: Shield },
];

const generalItems: NavItem[] = [
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Help', href: '/admin/help', icon: HelpCircle },
];

const logoutItem: NavItem = { name: 'Logout', href: '#', icon: LogOut };

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }: AdminSidebarProps) => {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link href={item.href}>
      <div
        className={`flex items-center p-3 my-1 rounded-lg transition-colors cursor-pointer
        ${
          pathname === item.href
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-text-secondary hover:bg-background'
        }`}
        title={!isSidebarOpen ? item.name : undefined}
      >
        <item.icon className="h-5 w-5" />
        {isSidebarOpen && <span className="ml-4">{item.name}</span>}
        {isSidebarOpen && item.badge && (
          <span className="ml-auto text-xs font-bold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>
    </Link>
  );

  const MenuSection = ({ title, items }: { title: string; items: NavItem[] }) => (
    <div className="mb-6">
      {isSidebarOpen && <h3 className="text-sm font-semibold text-text-muted uppercase px-3 mb-2">{title}</h3>}
      {items.map((item) => (
        <NavLink key={item.name} item={item} />
      ))}
    </div>
  );

  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-surface h-screen fixed top-0 left-0 border-r border-border flex flex-col p-4 overflow-y-auto no-scrollbar transition-all duration-300`}>
      <div className="flex items-center justify-between gap-3 p-3 mb-6">
        <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            {isSidebarOpen && <span className="text-xl font-bold text-foreground">Islamic Center</span>}
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-5 bg-surface border border-border p-1 rounded-full text-text-secondary hover:bg-background transition-all z-10"
      >
        <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${!isSidebarOpen && 'rotate-180'}`} />
      </button>

      <nav className="flex-grow">
        <MenuSection title="Main Menu" items={mainMenuItems} />
        <MenuSection title="Content Management" items={cmsMenuItems} />
        <MenuSection title="Islamic Features" items={islamicMenuItems} />
        <MenuSection title="User Management" items={userMenuItems} />
        <MenuSection title="General" items={generalItems} />
      </nav>

      <div className="mt-auto">
        <div className="mb-2">
            <NavLink item={logoutItem} />
        </div>
        <div className="bg-background border border-border p-4 rounded-lg text-center">
            {isSidebarOpen && (
              <>
                <h4 className="font-semibold text-foreground">Download App</h4>
                <p className="text-xs text-text-muted mt-1 mb-3">Get the full experience.</p>
              </>
            )}
            <button className="bg-primary w-full text-sm py-2 px-3 rounded-md font-semibold text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              {isSidebarOpen && 'Download'}
            </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar; 