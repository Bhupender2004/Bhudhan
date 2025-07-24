'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/lib/context/language-context';

export default function BhuDhanKnowledgeBasePage() {
  useLanguage();

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      faqs: [
        {
          question: 'How do I create an account on BhuDhan?',
          answer: 'To create an account, click on the "Login" button in the top right corner, then select "Create Account". Enter your name, mobile number, and follow the OTP verification process to complete your registration.'
        },
        {
          question: 'Is BhuDhan available in my local language?',
          answer: 'Yes! BhuDhan is available in multiple languages including English, Hindi, Punjabi, Tamil, and Telugu. You can change your language preference from the language selector in the header or from your account settings.'
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach our customer support team by visiting the Contact Us page, calling us at +91 7206110977, or sending an email to officialbhuppiiydv@gmail.com. We aim to respond to all inquiries within 24 hours.'
        }
      ]
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      faqs: [
        {
          question: 'How do I purchase products from the marketplace?',
          answer: 'Browse the marketplace, select the product you want to purchase, click "Add to Cart" or "Buy Now", and follow the checkout process. You can pay using various payment methods including UPI, credit/debit cards, and cash on delivery in select areas.'
        },
        {
          question: 'Can I sell my agricultural products on BhuDhan?',
          answer: 'Yes! Farmers can list their products for sale. Go to the Marketplace section, click on "Become a Seller", complete your seller profile, and start listing your products. Our team will verify your listings before they go live.'
        },
        {
          question: 'What is the return policy for marketplace purchases?',
          answer: 'Most products can be returned within 7 days of delivery if they are damaged, defective, or significantly different from their description. Perishable items have special return policies. Check the product page for specific return information.'
        }
      ]
    },
    {
      id: 'weather',
      title: 'Weather & Forecasts',
      faqs: [
        {
          question: 'How accurate is the weather forecast?',
          answer: 'Our weather data comes from reliable meteorological sources and is typically accurate for 1-3 day forecasts. For longer-term forecasts (4-7 days), accuracy may vary. We update our weather data every 3 hours to ensure you have the most current information.'
        },
        {
          question: 'Can I get weather alerts for my specific location?',
          answer: 'Yes! Set your default location in your profile settings and enable weather notifications. You can choose to receive alerts for extreme weather conditions, rainfall predictions, and optimal farming condition updates.'
        },
        {
          question: 'How do I interpret the agricultural weather metrics?',
          answer: 'Our agricultural weather section includes specialized metrics like soil moisture, evaporation rates, and UV index. We provide simple interpretations with each metric and color-coded indicators to help you understand what\'s favorable for different crops.'
        }
      ]
    },
    {
      id: 'ai-tools',
      title: 'AI Tools & Technology',
      faqs: [
        {
          question: 'How does the crop disease detection tool work?',
          answer: 'Our AI-powered disease detection tool uses computer vision to identify plant diseases from photos. Simply upload a clear image of the affected plant part, and our system will analyze it to identify potential diseases and suggest treatment options.'
        },
        {
          question: 'Are the AI recommendations reliable?',
          answer: 'Our AI tools are trained on extensive agricultural datasets and continuously improved. While they provide valuable guidance, we recommend using them alongside traditional farming knowledge and consulting with agricultural experts for critical decisions.'
        },
        {
          question: 'Do I need internet access to use all features?',
          answer: 'Most features require internet access for real-time data. However, we\'ve designed the app to work with limited connectivity. Some basic information and previously loaded data can be accessed offline, but features like weather updates and AI tools need an internet connection.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BhuDhan Knowledge Base</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to get the most out of BhuDhan
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guides</CardTitle>
          <CardDescription>
            Get up and running with these step-by-step guides
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Learn the basics of using BhuDhan</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Marketplace Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">How to buy and sell agricultural products</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weather Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Making the most of weather forecasts for farming</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to common questions about BhuDhan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              {faqCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {faqCategories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Video Tutorials</CardTitle>
          <CardDescription>
            Visual guides to help you navigate BhuDhan
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="aspect-video rounded-md bg-primary-50 flex items-center justify-center dark:bg-primary-900/20">
            <p className="text-primary-700 dark:text-primary-300">App Navigation Tutorial</p>
          </div>
          <div className="aspect-video rounded-md bg-primary-50 flex items-center justify-center dark:bg-primary-900/20">
            <p className="text-primary-700 dark:text-primary-300">Using Weather Forecasts</p>
          </div>
          <div className="aspect-video rounded-md bg-primary-50 flex items-center justify-center dark:bg-primary-900/20">
            <p className="text-primary-700 dark:text-primary-300">Marketplace Transactions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
