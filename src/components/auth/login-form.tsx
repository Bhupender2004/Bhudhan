'use client';

import { useState, useEffect } from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '@/lib/auth/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/lib/utils/toast';
import { useLanguage } from '@/lib/context/language-context';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage(); // Use language context for translations

  useEffect(() => {
    // Initialize recaptcha verifier
    if (typeof window !== 'undefined' && !recaptchaVerifier && auth) {
      try {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });
        setRecaptchaVerifier(verifier);
      } catch (error) {
        console.error('Error initializing RecaptchaVerifier:', error);
        // We'll handle the demo without actual Firebase verification
      }
    }

    return () => {
      // Clean up recaptcha verifier
      if (recaptchaVerifier) {
        try {
          recaptchaVerifier.clear();
        } catch (error) {
          console.error('Error clearing RecaptchaVerifier:', error);
        }
      }
    };
  }, [recaptchaVerifier]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      toast.title('Invalid Phone Number', {
        description: 'Please enter a valid phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Format phone number with country code if needed

      // For demo purposes, we'll simulate OTP sending
      // In a real app, this would use Firebase authentication

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Demo mode - skip actual Firebase verification
      setStep('otp');
      toast.success('OTP Sent (Demo Mode)');
      toast.info('For demo, use any 6-digit number as OTP');

      /* Real implementation would be:
      if (recaptchaVerifier) {
        const result = await sendOTP(formattedPhone, recaptchaVerifier);
        setConfirmationResult(result);
        setStep('otp');
        toast.success('OTP Sent');
      }
      */
    } catch (error) {
      // Error sending OTP
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.title('Invalid OTP', {
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Format phone number with country code if needed
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

      // For demo purposes, we'll simulate successful authentication
      // In a real app, this would verify with Firebase and NextAuth

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Demo mode - skip actual verification
      toast.success('Login Successful (Demo Mode)');
      toast.info('Welcome to BhuDhan Krishi your digital AI farmer');

      // Create a demo user

      // Save to demo auth context
      // login(demoUser); // Removed as useDemoAuth is no longer used

      // Store login state in localStorage for persistence
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', name || 'Demo Farmer');
      localStorage.setItem('userPhone', formattedPhone);

      // Force redirect to dashboard
      window.location.href = '/dashboard';

      /* Real implementation would be:
      // Sign in with NextAuth
      const result = await signIn('credentials', {
        phone: formattedPhone,
        otp,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success('Login Successful');
      router.push('/dashboard');
      */
    } catch (error) {
      // Error verifying OTP
      toast.title('Error', {
        description: 'Failed to verify OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/80 glass-card">
      <div className="absolute inset-0 -z-10 bg-gradient-vibrant opacity-10" />

      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold text-shimmer">
          {step === 'phone' ? t('welcome') : t('verifyOTP')}
        </CardTitle>
        <CardDescription className="text-center">
          {step === 'phone'
            ? t('enterPhoneForOTP')
            : t('enter6DigitCode')}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="animate-fade-in">
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  {t('fullName')}
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 border-primary-200 bg-white/50 backdrop-blur-sm focus:border-primary-400 focus:ring-primary-400 dark:border-primary-800 dark:bg-gray-800/50 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  {t('phoneNumber')}
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 border-primary-200 bg-white/50 pl-10 backdrop-blur-sm focus:border-primary-400 focus:ring-primary-400 dark:border-primary-800 dark:bg-gray-800/50 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                    required
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-500 dark:text-primary-400">
                    +91
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">We will send a verification code to this number</p>
              </div>

              <div id="recaptcha-container" className="hidden"></div>

              <Button
                type="submit"
                disabled={loading}
                className="btn-glow h-11 bg-gradient-vibrant font-medium text-white transition-all hover:shadow-md"
              >
                {loading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    {t('sendingOTP')}
                  </>
                ) : (
                  t('sendOTP')
                )}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="animate-fade-in">
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="otp" className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  {t('verificationCode')}
                </Label>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="h-11 border-primary-200 bg-white/50 text-center text-lg tracking-widest backdrop-blur-sm focus:border-primary-400 focus:ring-primary-400 dark:border-primary-800 dark:bg-gray-800/50 dark:focus:border-primary-600 dark:focus:ring-primary-600"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Enter the code we sent to {phone}</p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="btn-glow h-11 bg-gradient-vibrant font-medium text-white transition-all hover:shadow-md"
              >
                {loading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    {t('verifying')}
                  </>
                ) : (
                  t('verifyAndLogin')
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-center pb-6">
        {step === 'otp' && (
          <Button
            variant="link"
            onClick={() => setStep('phone')}
            disabled={loading}
            className="text-shimmer btn-hover"
          >
            ← Change Phone Number
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
