'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthRedirect({ targetPath = '/dashboard' }: { targetPath?: string }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the target path
    router.push(targetPath);
  }, [router, targetPath]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Redirecting...</h2>
        <p className="mt-2 text-muted-foreground">Please wait while we redirect you.</p>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full animate-pulse rounded-full bg-primary" style={{ width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
}
