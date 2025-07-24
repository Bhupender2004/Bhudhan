'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        // Redirect to login page if not signed in
        router.push('/login');
      }
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
          <p className="mt-2 text-muted-foreground">Please wait while we check your authentication.</p>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full animate-pulse rounded-full bg-primary" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return <>{children}</>;
}
