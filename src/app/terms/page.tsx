'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 flex items-center text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: April 10, 2025</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to BhuDhan (we, our, or us). These Terms and Conditions govern your use of the BhuDhan website and services, including the marketplace and seller platform.
            </p>
            <p>
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Seller Registration and Account</h2>
            <p>
              To become a seller on BhuDhan, you must:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Complete the registration process accurately</li>
              <li>Provide valid business documentation as required</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
            <p>
              We reserve the right to reject any seller application or suspend/terminate accounts that violate our terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Listing Products</h2>
            <p>
              As a seller, you are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing accurate and complete information about your products</li>
              <li>Setting fair and transparent pricing</li>
              <li>Ensuring your products comply with all applicable laws and regulations</li>
              <li>Maintaining adequate inventory of listed products</li>
              <li>Promptly updating product information when changes occur</li>
            </ul>
            <p>
              BhuDhan reserves the right to remove any product listings that violate our policies or applicable laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Order Fulfillment and Shipping</h2>
            <p>
              Sellers are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing orders promptly</li>
              <li>Packaging products securely to prevent damage during transit</li>
              <li>Shipping products within the timeframe specified in your listing</li>
              <li>Providing tracking information when available</li>
              <li>Addressing any delivery issues or delays</li>
            </ul>
            <p>
              Failure to fulfill orders as described may result in penalties, including account suspension.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Payments and Fees</h2>
            <p>
              By selling on BhuDhan, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pay the applicable commission on each sale as outlined in our Fee Schedule</li>
              <li>Accept payments through our approved payment methods</li>
              <li>Receive payouts according to our payment schedule</li>
              <li>Comply with all tax obligations related to your sales</li>
            </ul>
            <p>
              We reserve the right to modify our fee structure with reasonable notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Returns and Refunds</h2>
            <p>
              Sellers must:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Clearly state their return policy in product listings</li>
              <li>Honor the stated return policy</li>
              <li>Process returns and refunds promptly</li>
              <li>Resolve customer disputes in good faith</li>
            </ul>
            <p>
              BhuDhan may intervene in disputes between sellers and buyers to ensure fair resolution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Prohibited Products</h2>
            <p>
              The following products are prohibited on BhuDhan:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Illegal or counterfeit items</li>
              <li>Hazardous materials not properly classified or labeled</li>
              <li>Products that infringe on intellectual property rights</li>
              <li>Banned pesticides or chemicals</li>
              <li>Products that make false or misleading claims</li>
              <li>Any other products prohibited by law</li>
            </ul>
            <p>
              Listing prohibited products may result in immediate account termination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Seller Performance Standards</h2>
            <p>
              We evaluate seller performance based on:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Order fulfillment rate</li>
              <li>On-time shipping</li>
              <li>Customer satisfaction ratings</li>
              <li>Return rate</li>
              <li>Communication responsiveness</li>
            </ul>
            <p>
              Sellers who consistently fail to meet our performance standards may face restrictions or account suspension.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Intellectual Property</h2>
            <p>
              By using our platform, you agree:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Not to infringe on any third-party intellectual property rights</li>
              <li>To grant BhuDhan a license to use your product images and descriptions for promotional purposes</li>
              <li>To respect BhuDhan intellectual property rights</li>
            </ul>
            <p>
              We take intellectual property violations seriously and will respond to legitimate notices of alleged copyright infringement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">10. Termination</h2>
            <p>
              BhuDhan reserves the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Suspend or terminate seller accounts for violations of these Terms</li>
              <li>Remove product listings that violate our policies</li>
              <li>Hold funds during investigations of potential violations</li>
            </ul>
            <p>
              Sellers may terminate their account at any time, subject to fulfilling any outstanding orders.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">11. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, BhuDhan shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Damages arising from transactions between buyers and sellers</li>
              <li>Service interruptions or technical issues</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">12. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time by posting the revised terms on our website. Your continued use of the platform after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">14. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: officialbhuppiiydv@gmail.com<br />
              Phone: +91 7206110977<br />
              Address: Rewari, Haryana, 123101
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
