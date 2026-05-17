'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
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
  Settings, 
  Store 
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";

const pages = [
  { label: 'Dashboard', href: '/dashboard', icon: Home, category: 'Main' },
  { label: 'Marketplace', href: '/marketplace', icon: ShoppingBag, category: 'Marketplace' },
  { label: 'Seller Dashboard', href: '/seller-dashboard', icon: Store, category: 'Marketplace' },
  { label: 'Equipment Rental', href: '/equipment', icon: Tractor, category: 'Services' },
  { label: 'Weather Forecast', href: '/weather', icon: CloudSun, category: 'Tools' },
  { label: 'Agriculture News', href: '/news', icon: Newspaper, category: 'Information' },
  { label: 'Govt Schemes', href: '/schemes', icon: FileText, category: 'Information' },
  { label: 'Expert Connect', href: '/expert-connect', icon: MessageSquare, category: 'Support' },
  { label: 'Crop Calendar', href: '/crop-calendar', icon: Calendar, category: 'Tools' },
  { label: 'AI Advisor', href: '/ai-tools', icon: Brain, category: 'AI Tools' },
  { label: 'Community', href: '/community', icon: Users, category: 'Support' },
  { label: 'Settings', href: '/settings', icon: Settings, category: 'Account' },
];

export function CommandPalette({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  const filteredPages = pages.filter((page) =>
    page.label.toLowerCase().includes(query.toLowerCase()) || 
    page.category.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const onSelect = (href: string) => {
    setOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden shadow-2xl sm:max-w-[550px] gap-0 border-slate-200 dark:border-slate-800">
        <DialogPrimitive.Title className="sr-only">Search Command Palette</DialogPrimitive.Title>
        <div className="flex items-center border-b border-slate-100 dark:border-slate-800 px-3">
          <Search className="mr-2 h-5 w-5 shrink-0 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
            placeholder="Search crops, tools, prices, or news..."
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
          {filteredPages.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No results found for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredPages.map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.href}
                    onClick={() => onSelect(page.href)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-green-50 dark:hover:bg-slate-800/80 hover:text-green-700 dark:hover:text-green-400 text-left transition-colors w-full group text-slate-700 dark:text-slate-300"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 group-hover:text-green-600 transition-colors shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{page.label}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{page.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
