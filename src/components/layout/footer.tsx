import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">BhuDhan Krishi - Your Digital AI Farmer</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop digital farming assistant for Indian farmers.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-foreground">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="text-muted-foreground hover:text-foreground">
                  Equipment
                </Link>
              </li>
              <li>
                <Link href="/expert-connect" className="text-muted-foreground hover:text-foreground">
                  Expert Connect
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-muted-foreground hover:text-foreground">
                  Government Schemes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-foreground">
                  Agricultural News
                </Link>
              </li>
              <li>
                <Link href="/weather" className="text-muted-foreground hover:text-foreground">
                  Weather Updates
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-foreground">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="text-muted-foreground hover:text-foreground">
                  AI Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: officialbhuppiiydv@gmail.com
              </li>
              <li className="text-muted-foreground">
                Phone: +91 7206110977
              </li>
              <li className="text-muted-foreground">
                Address: Rewari, Haryana, 123101
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center">
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
            <p className="text-sm font-medium">BhuDhan - Where Intelligence Meets Agriculture</p>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} BhuDhan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
