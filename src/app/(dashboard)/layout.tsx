import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: {
    template: '%s | BhuDhan Krishi',
    default: 'BhuDhan Krishi - Your Digital AI Farmer',
  },
  description: 'A comprehensive platform for Indian farmers with marketplace, expert connect, weather updates, and more',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
