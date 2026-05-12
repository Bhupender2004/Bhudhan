import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Government Schemes | BhuDhan Krishi',
  description: 'Agricultural schemes and subsidies for farmers in India. Empowering Indian agriculture through financial aid, insurance, and technological support.',
};

export default function SchemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
