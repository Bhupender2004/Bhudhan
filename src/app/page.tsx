'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';
import FeaturesSection from '@/components/home/features-section';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-mesh-green dark:from-gray-900 dark:to-green-950">
      {/* Background patterns */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20"
           style={{ backgroundImage: 'url(/patterns/grid-pattern.svg)' }} />

      {/* Floating elements */}
      <div className="pointer-events-none absolute left-10 top-20 h-24 w-24 card-morph bg-gradient-to-br from-emerald-300 to-emerald-600 opacity-20 blur-xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 h-32 w-32 card-morph bg-gradient-to-br from-amber-300 to-amber-600 opacity-20 blur-xl" style={{ animationDelay: '1s' }} />
      <div className="pointer-events-none absolute left-1/4 bottom-10 h-16 w-16 card-morph bg-gradient-to-br from-blue-300 to-blue-600 opacity-20 blur-xl" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm animate-glow overflow-hidden">
            <Image
              src="/bhudhan url logo.jpg"
              alt="BhuDhan Logo"
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-shimmer text-2xl font-bold">BhuDhan</span>
            <span className="text-xs text-gray-600 dark:text-gray-300">Where Intelligence Meets Agriculture</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="btn-hover hover:bg-green-50 dark:hover:bg-green-900/30">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-vibrant text-white btn-glow">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-green-800 sm:text-5xl md:text-6xl dark:text-green-200">
              {t('digitalFarming').split(' ').map((word, i) => (
                <span key={i}>
                  {i === 1 ? <span className="text-shimmer">{word}</span> : word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('platformDescription')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="bg-gradient-vibrant text-white btn-glow">
                  {t('getStarted')}
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/30 btn-ripple">
                  {t('learnMore')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] w-full glass-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <Image
                src="/image.webp"
                alt="BhuDhan Krishi your digital AI farmer"
                fill={true}
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-vibrant p-8 md:p-12">
          <div className="pointer-events-none absolute inset-0 z-0 opacity-10"
               style={{ backgroundImage: 'url(/patterns/crop-pattern.svg)' }} />

          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4 text-white">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to transform your farming?</h2>
              <p className="text-green-100">Join thousands of farmers already using BhuDhan Krishi to improve their yields and increase profits.</p>
              <Link href="/login">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 btn-ripple">
                  Get Started Now
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="h-64 w-64 card-morph bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-full w-full items-center justify-center card-morph bg-white/20 text-6xl animate-bounce-subtle">
                  🌾
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm overflow-hidden">
                  <Image
                    src="/bhudhan url logo.jpg"
                    alt="BhuDhan Logo"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="text-lg font-bold text-green-800 dark:text-green-200">BhuDhan Krishi</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Your Digital AI Farmer</p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-green-800 dark:text-green-200">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Marketplace</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Expert Connect</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Weather Updates</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">AI Tools</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-green-800 dark:text-green-200">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help-center" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Krishi Knowledge Base</Link></li>
                <li><Link href="/farming-guides" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Seasonal Crop Calendars</Link></li>
                <li><Link href="/community" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Farmer Success Stories</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Agricultural Innovations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase text-green-800 dark:text-green-200">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-600 dark:text-gray-400">Email: officialbhuppiiydv@gmail.com</li>
                <li className="text-gray-600 dark:text-gray-400">Phone: +91 7206110977</li>
                <li className="text-gray-600 dark:text-gray-400">Address: Rewari, Haryana, 123101</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
            <div className="mb-4 flex justify-center space-x-4">
              <Link
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700 transition-colors"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                  <polygon points="10 15 15 12 10 9"></polygon>
                </svg>
              </Link>
              <Link
                href="https://wa.me/917206110977"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-500 p-2 text-white hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M17.6 6.8A7.8 7.8 0 0 0 12 4c-4.4 0-8 3.6-8 8 0 1.4.4 2.8 1 4l-1 4 4.1-1c1.2.7 2.6 1 4 1 4.4 0 8-3.6 8-8 0-2.1-.8-4.1-2.3-5.5z"></path>
                  <path d="M15 12.5a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-.5a7 7 0 0 1-5-2 7 7 0 0 1-2-5v-.5a3 3 0 0 1 3-3h1a1 1 0 0 1 1 1 1 1 0 0 0 1 1h2a1 1 0 0 0 1-1 1 1 0 0 1 1-1h1a3 3 0 0 1 3 3v.5a7 7 0 0 1-2 5 7 7 0 0 1-5 2h-.5a3 3 0 0 1-3-3v-1a1 1 0 0 1 1-1"></path>
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 p-2 text-white hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-black p-2 text-white hover:bg-gray-800 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M4 4l11.5 11.5"></path>
                  <path d="M20 4L8.5 15.5"></path>
                  <path d="M4 20l7.5-7.5"></path>
                  <path d="M12 12l4 4"></path>
                  <path d="M20 20h-4"></path>
                  <path d="M4 4h4"></path>
                  <path d="M16 4h4"></path>
                </svg>
              </Link>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">BhuDhan - Where Intelligence Meets Agriculture</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} BhuDhan. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
