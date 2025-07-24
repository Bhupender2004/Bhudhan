'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestPage() {
  const [message, setMessage] = useState('This is a test page');

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
          <CardDescription>This is a test page to check if the application is working</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => setMessage('Button clicked!')}>Click Me</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
