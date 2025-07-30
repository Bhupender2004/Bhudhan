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

      {/* Floating elements - Hidden on mobile for better performance */}
      <div className="pointer-events-none absolute left-4 sm:left-10 top-16 sm:top-20 h-16 w-16 sm:h-24 sm:w-24 card-morph bg-gradient-to-br from-emerald-300 to-emerald-600 opacity-10 sm:opacity-20 blur-xl hidden sm:block" />
      <div className="pointer-events-none absolute right-4 sm:right-10 bottom-16 sm:bottom-20 h-20 w-20 sm:h-32 sm:w-32 card-morph bg-gradient-to-br from-amber-300 to-amber-600 opacity-10 sm:opacity-20 blur-xl hidden sm:block" style={{ animationDelay: '1s' }} />
      <div className="pointer-events-none absolute left-1/4 bottom-8 sm:bottom-10 h-12 w-12 sm:h-16 sm:w-16 card-morph bg-gradient-to-br from-blue-300 to-blue-600 opacity-10 sm:opacity-20 blur-xl hidden sm:block" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-4 sm:py-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm animate-glow overflow-hidden">
            <Image
              src="/bhudhan url logo.jpg"
              alt="BhuDhan Logo"
              width={40}
              height={40}
              className="rounded-full object-cover sm:w-14 sm:h-14"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-shimmer text-lg sm:text-2xl font-bold">BhuDhan</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">Where Intelligence Meets Agriculture</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm" className="btn-hover hover:bg-green-50 dark:hover:bg-green-900/30 text-xs sm:text-sm px-2 sm:px-4">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm" className="bg-gradient-vibrant text-white btn-glow text-xs sm:text-sm px-2 sm:px-4">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16 md:py-24">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-4 sm:space-y-6 animate-fade-in order-2 md:order-1">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-green-800 dark:text-green-200">
              {t('digitalFarming').split(' ').map((word, i) => (
                <span key={i}>
                  {i === 1 ? <span className="text-shimmer">{word}</span> : word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
              {t('platformDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button size="lg" className="bg-gradient-vibrant text-white btn-glow w-full sm:w-auto">
                  {t('getStarted')}
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/30 btn-ripple w-full sm:w-auto">
                  {t('learnMore')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full glass-card animate-fade-in order-1 md:order-2" style={{ animationDelay: '0.3s' }}>
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
      <section className="container mx-auto px-4 py-8 sm:py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-vibrant p-6 sm:p-8 md:p-12">
          <div className="pointer-events-none absolute inset-0 z-0 opacity-10"
               style={{ backgroundImage: 'url(/patterns/crop-pattern.svg)' }} />

          <div className="relative z-10 grid gap-6 sm:gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-3 sm:space-y-4 text-white text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Ready to transform your farming?</h2>
              <p className="text-green-100 text-sm sm:text-base">Join thousands of farmers already using BhuDhan Krishi to improve their yields and increase profits.</p>
              <Link href="/login" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 btn-ripple w-full sm:w-auto">
                  Get Started Now
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 card-morph bg-white/10 p-2 sm:p-4 backdrop-blur-sm">
                <div className="flex h-full w-full items-center justify-center card-morph bg-white/20 text-3xl sm:text-4xl md:text-6xl animate-bounce-subtle">
                  🌾
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 sm:py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm overflow-hidden">
                  <Image
                    src="/bhudhan url logo.jpg"
                    alt="BhuDhan Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-cover sm:w-12 sm:h-12"
                  />
                </div>
                <span className="text-base sm:text-lg font-bold text-green-800 dark:text-green-200">BhuDhan Krishi</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">Your Digital AI Farmer</p>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="mb-3 sm:mb-4 text-sm font-semibold uppercase text-green-800 dark:text-green-200">Features</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm">
                <li><Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Marketplace</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Expert Connect</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Weather Updates</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">AI Tools</Link></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="mb-3 sm:mb-4 text-sm font-semibold uppercase text-green-800 dark:text-green-200">Resources</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm">
                <li><Link href="/help-center" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Knowledge Base</Link></li>
                <li><Link href="/farming-guides" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Crop Calendars</Link></li>
                <li><Link href="/community" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Success Stories</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">Innovations</Link></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="mb-3 sm:mb-4 text-sm font-semibold uppercase text-green-800 dark:text-green-200">Contact</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm">
                <li className="text-gray-600 dark:text-gray-400 break-all">officialbhuppiiydv@gmail.com</li>
                <li className="text-gray-600 dark:text-gray-400">+91 7206110977</li>
                <li className="text-gray-600 dark:text-gray-400">Rewari, Haryana, 123101</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-6 sm:pt-8 text-center dark:border-gray-800">
            <div className="mb-4 flex justify-center space-x-3 sm:space-x-4">
              <Link
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-600 p-2 sm:p-3 text-white hover:bg-red-700 transition-colors"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                  <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                  <polygon points="10 15 15 12 10 9"></polygon>
                </svg>
              </Link>
              <Link
                href="https://wa.me/917206110977"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-500 p-2 sm:p-3 text-white hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                  <path d="M17.6 6.8A7.8 7.8 0 0 0 12 4c-4.4 0-8 3.6-8 8 0 1.4.4 2.8 1 4l-1 4 4.1-1c1.2.7 2.6 1 4 1 4.4 0 8-3.6 8-8 0-2.1-.8-4.1-2.3-5.5z"></path>
                  <path d="M15 12.5a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-.5a7 7 0 0 1-5-2 7 7 0 0 1-2-5v-.5a3 3 0 0 1 3-3h1a1 1 0 0 1 1 1 1 1 0 0 0 1 1h2a1 1 0 0 0 1-1 1 1 0 0 1 1-1h1a3 3 0 0 1 3 3v.5a7 7 0 0 1-2 5 7 7 0 0 1-5 2h-.5a3 3 0 0 1-3-3v-1a1 1 0 0 1 1-1"></path>
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 p-2 sm:p-3 text-white hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-black p-2 sm:p-3 text-white hover:bg-gray-800 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
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
            <div className="text-center space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">BhuDhan - Where Intelligence Meets Agriculture</p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} BhuDhan. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
