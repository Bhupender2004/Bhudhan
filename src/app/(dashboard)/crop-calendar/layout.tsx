import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Calendar | BhuDhan',
  description: 'Plan your farming activities with our seasonal crop calendar',
};

export default function CropCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-6">
      {children}
    </div>
  );
}
