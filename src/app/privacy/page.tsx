'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 10, 2025</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p>
              BhuDhan (we, our, or us) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, including our marketplace and seller platform.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our platform, including:
            </p>
            <h3 className="text-lg font-medium mt-4">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Business information (for sellers), including business name, GST number, and PAN details</li>
              <li>Payment information, including bank account details and UPI IDs</li>
              <li>Profile pictures and other images you upload</li>
              <li>Communication preferences</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4">Usage Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address, browser type, operating system</li>
              <li>Pages visited and features used</li>
              <li>Time spent on the platform</li>
              <li>Referring websites or sources</li>
              <li>Device information</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4">Transaction Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products purchased or sold</li>
              <li>Transaction amounts</li>
              <li>Payment methods</li>
              <li>Shipping details</li>
              <li>Order history</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. How We Collect Information</h2>
            <p>
              We collect information through:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Direct interactions when you register, list products, or make purchases</li>
              <li>Automated technologies such as cookies and similar tracking technologies</li>
              <li>Third-party sources, including payment processors and shipping partners</li>
              <li>Customer feedback and reviews</li>
              <li>Public sources for business verification</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Verify seller identities and business credentials</li>
              <li>Communicate with you about products, services, and promotions</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues, fraud, or illegal activities</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Disclosure of Your Information</h2>
            <p>
              We may disclose your personal information to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Buyers and sellers to facilitate transactions (limited to necessary information)</li>
              <li>Service providers who perform services on our behalf (payment processors, shipping companies, etc.)</li>
              <li>Business partners with whom we jointly offer products or services</li>
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>Potential buyers in the event of a merger, acquisition, or sale of assets</li>
            </ul>
            <p>
              We do not sell your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Secure server infrastructure</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
              <li>Staff training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Your Rights and Choices</h2>
            <p>
              You have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and update your personal information through your account settings</li>
              <li>Request deletion of your personal information (subject to legal retention requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Set browser cookies preferences</li>
              <li>Request a copy of your personal data</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the Contact Us section.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining how long to retain information, we consider:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The amount, nature, and sensitivity of the information</li>
              <li>The potential risk of harm from unauthorized use or disclosure</li>
              <li>The purposes for which we process the information</li>
              <li>Legal, regulatory, accounting, or reporting requirements</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Children Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information from our records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than the one in which you reside. These countries may have data protection laws that differ from those in your country. By using our services, you consent to the transfer of your information to countries outside of your country of residence, including India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">11. Changes to Our Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the Last updated date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
