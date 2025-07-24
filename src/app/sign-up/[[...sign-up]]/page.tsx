import { Metadata } from 'next';
import ClerkSignupForm from '@/components/auth/clerk-signup-form';

export const metadata: Metadata = {
  title: 'Sign Up | BhuDhan Krishi',
  description: 'Create an account on BhuDhan Krishi - Your Digital AI Farmer',
};

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-mesh-green p-4 sm:p-8 dark:from-gray-900 dark:to-green-950">
      {/* Background patterns */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20"
           style={{ backgroundImage: 'url(/patterns/grid-pattern.svg)' }} />

      {/* Floating elements */}
      <div className="pointer-events-none absolute left-10 top-20 h-24 w-24 card-morph bg-gradient-to-br from-emerald-300 to-emerald-600 opacity-20 blur-xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 h-32 w-32 card-morph bg-gradient-to-br from-amber-300 to-amber-600 opacity-20 blur-xl" style={{ animationDelay: '1s' }} />
      <div className="pointer-events-none absolute left-1/4 bottom-10 h-16 w-16 card-morph bg-gradient-to-br from-blue-300 to-blue-600 opacity-20 blur-xl" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="animate-fade-in text-shimmer text-4xl font-bold sm:text-5xl">
            BhuDhan Krishi
          </h1>
          <p className="mt-2 animate-fade-in text-green-700 opacity-90 dark:text-green-300 text-glow" style={{ animationDelay: '0.2s' }}>
            Your Digital AI Farmer
          </p>
        </div>

        <div className="animate-scale-in w-full max-w-md mx-auto" style={{ animationDelay: '0.3s' }}>
          <ClerkSignupForm />
        </div>

        <div className="mt-8 animate-fade-in text-center text-sm text-green-700/70 dark:text-green-300/70 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
          Empowering Indian farmers with technology
        </div>
      </div>
    </div>
  );
}
