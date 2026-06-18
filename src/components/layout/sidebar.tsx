'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/context/language-context';
import {
  Home,
  ShoppingBag,
  Tractor,
  CloudSun,
  Newspaper,
  FileText,
  MessageSquare,
  Calendar,
  Brain,
  Users,
  Award,
  Settings,
  Store
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onRouteClick?: () => void;
}

export default function Sidebar({ className, onRouteClick, ...props }: SidebarProps) {
  const pathname = usePathname();
  const { t }: { t: (key: string) => string } = useLanguage();

  const routes = [
    {
      label: t('dashboard'),
      icon: Home,
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      label: t('marketplace'),
      icon: ShoppingBag,
      href: '/marketplace',
      active: pathname === '/marketplace' || pathname.startsWith('/marketplace/'),
    },
    {
      label: 'Seller Dashboard',
      icon: Store,
      href: '/seller-dashboard',
      active: pathname === '/seller-dashboard' || pathname.startsWith('/seller-dashboard/'),
    },
    {
      label: t('equipment'),
      icon: Tractor,
      href: '/equipment',
      active: pathname === '/equipment' || pathname.startsWith('/equipment/'),
    },
    {
      label: t('weather'),
      icon: CloudSun,
      href: '/weather',
      active: pathname === '/weather',
    },
    {
      label: t('news'),
      icon: Newspaper,
      href: '/news',
      active: pathname === '/news',
    },
    {
      label: t('schemes'),
      icon: FileText,
      href: '/schemes',
      active: pathname === '/schemes' || pathname.startsWith('/schemes/'),
    },
    {
      label: t('expertConnect'),
      icon: MessageSquare,
      href: '/expert-connect',
      active: pathname === '/expert-connect' || pathname.startsWith('/expert-connect/'),
    },
    {
      label: t('cropCalendar'),
      icon: Calendar,
      href: '/crop-calendar',
      active: pathname === '/crop-calendar',
    },
    {
      label: t('aiTools'),
      icon: Brain,
      href: '/ai-tools',
      active: pathname === '/ai-tools' || pathname.startsWith('/ai-tools/'),
    },
    {
      label: t('community'),
      icon: Users,
      href: '/community',
      active: pathname === '/community' || pathname.startsWith('/community/'),
    },
    {
      label: t('rewards'),
      icon: Award,
      href: '/rewards',
      active: pathname === '/rewards' || pathname.startsWith('/rewards/'),
    },
    {
      label: t('settings'),
      icon: Settings,
      href: '/settings',
      active: pathname === '/settings',
    },
  ];

  return (
    <nav
      className={cn(
        'flex flex-col space-y-1 py-4 md:w-64 md:border-r md:border-r-primary-100 md:py-6 dark:md:border-r-primary-900/50',
        className
      )}
      {...props}
    >
      <div className="mb-4 px-3 py-2">
        <h3 className="text-xs font-medium uppercase text-primary-500 dark:text-primary-400">Main Menu</h3>
      </div>

      {routes.map((route, index) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'group relative flex items-center overflow-hidden rounded-md px-3 py-2.5 text-sm font-medium transition-all hover:translate-x-1',
            route.active
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
              : 'text-gray-600 hover:bg-primary-50/50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-400'
          )}
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={onRouteClick}
        >
          {/* Active indicator */}
          {route.active && (
            <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500 rounded-r-full shadow-md" />
          )}

          {/* Icon with gradient background for active items */}
          <div className={cn(
            'mr-3 flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300 group-hover:scale-110',
            route.active
              ? 'bg-gradient-primary text-white'
              : 'text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400'
          )}>
            <route.icon className="h-5 w-5" />
          </div>

          <span>{route.label}</span>

          {/* Subtle hover effect */}
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-100/0 via-primary-100/50 to-primary-100/0 opacity-0 transition-all duration-500 group-hover:opacity-100 dark:from-primary-900/0 dark:via-primary-900/30 dark:to-primary-900/0" />
        </Link>
      ))}

      <div className="mt-auto px-3 pt-6">
        <div className="rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 p-4 dark:from-primary-900/50 dark:to-primary-900/30">
          <h4 className="mb-2 font-medium text-primary-700 dark:text-primary-300">Need Help?</h4>
          <p className="mb-3 text-xs text-primary-600/80 dark:text-primary-400/80">
            Contact us for assistance with your farming needs.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
