import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scheme Details | BhuDhan Krishi',
  description: 'Detailed information about government schemes for farmers. Benefits, eligibility, and application process.',
};

export default function SchemeDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
