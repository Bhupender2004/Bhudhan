import Link from 'next/link';
import { FaYoutube, FaWhatsapp, FaInstagram, FaXTwitter } from 'react-icons/fa6';

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
              className="rounded-full bg-[#FF0000] p-2.5 text-white hover:bg-red-700 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube className="h-5 w-5" />
            </Link>
            <Link
              href="https://wa.me/917206110977"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] p-2.5 text-white hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-2.5 text-white hover:opacity-90 transition-opacity"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black p-2.5 text-white hover:bg-gray-800 transition-colors"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="h-5 w-5" />
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
