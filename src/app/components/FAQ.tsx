import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Heart, ArrowLeft, MessageCircle, Mail, Phone } from "lucide-react";

export function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HealthBridge FAQ</h1>
              <p className="text-gray-600">Frequently Asked Questions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"><ArrowLeft className="w-4 h-4" />Back to Login</Link>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>General Questions</CardTitle><CardDescription>Learn about HealthBridge and how it works</CardDescription></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1"><AccordionTrigger>What is HealthBridge?</AccordionTrigger><AccordionContent>HealthBridge is a comprehensive healthcare platform that connects patients with healthcare providers, social workers, and dietitians. We provide appointment reminders, resource referrals, symptom check-ins, and personalized lifestyle recommendations to help you maintain better health and live longer.</AccordionContent></AccordionItem>
                <AccordionItem value="item-2"><AccordionTrigger>Who can use HealthBridge?</AccordionTrigger><AccordionContent>HealthBridge is designed for patients who want to better manage their health, as well as healthcare providers, social workers, and dietitians who want to coordinate care and communicate with their patients more effectively.</AccordionContent></AccordionItem>
                <AccordionItem value="item-3"><AccordionTrigger>Is HealthBridge secure and HIPAA compliant?</AccordionTrigger><AccordionContent>Yes, HealthBridge takes your privacy seriously. We are fully HIPAA compliant and use industry-standard encryption to protect your personal health information. Your data is stored securely and is only accessible to you and your authorized healthcare providers.</AccordionContent></AccordionItem>
                <AccordionItem value="item-4"><AccordionTrigger>How much does HealthBridge cost?</AccordionTrigger><AccordionContent>HealthBridge offers several pricing tiers. Basic features like appointment reminders and symptom check-ins are available for free. Premium features including personalized lifestyle recommendations and direct provider messaging are available through our paid plans.<div className="mt-3"><Link to="/pricing"><Button variant="outline" size="sm" className="w-full">View Pricing Plans</Button></Link></div></AccordionContent></AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Account & Login</CardTitle><CardDescription>Manage your account and access</CardDescription></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5"><AccordionTrigger>How do I create an account?</AccordionTrigger><AccordionContent>Click on the "Register" tab on the login page. Fill in your personal information including your full name, email, phone number, and create a secure password. After registration, you may need to verify your email address before you can fully access the platform.</AccordionContent></AccordionItem>
                <AccordionItem value="item-6"><AccordionTrigger>I forgot my password. What should I do?</AccordionTrigger><AccordionContent>Click on "Forgot password?" on the login page. Enter your registered email address, and we'll send you instructions to reset your password. If you don't receive the email within a few minutes, check your spam folder or contact support.</AccordionContent></AccordionItem>
                <AccordionItem value="item-7"><AccordionTrigger>I forgot my username. How can I recover it?</AccordionTrigger><AccordionContent>Click on "Forgot username?" on the login page. You can choose to receive your username via email or SMS by providing your registered email address or phone number.</AccordionContent></AccordionItem>
                <AccordionItem value="item-8"><AccordionTrigger>Can I change my email or phone number?</AccordionTrigger><AccordionContent>Yes, you can update your email address and phone number from your account settings once you're logged in. For security purposes, you may need to verify the new contact information before the change takes effect.</AccordionContent></AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Features & Services</CardTitle><CardDescription>How to use HealthBridge's main features</CardDescription></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-9"><AccordionTrigger>How do appointment reminders work?</AccordionTrigger><AccordionContent>HealthBridge sends you appointment reminders via your preferred method (email, SMS, or app notification). You'll receive reminders 24 hours before your appointment and again 2 hours before. You can customize these settings in your notification preferences.</AccordionContent></AccordionItem>
                <AccordionItem value="item-10"><AccordionTrigger>What are symptom check-ins?</AccordionTrigger><AccordionContent>Symptom check-ins are periodic assessments that help you and your healthcare providers monitor your health status. You'll receive prompts to report symptoms, track medications, and note any changes in your condition.</AccordionContent></AccordionItem>
                <AccordionItem value="item-11"><AccordionTrigger>How do I access lifestyle recommendations?</AccordionTrigger><AccordionContent>Once logged in, navigate to your dashboard where you'll find personalized lifestyle recommendations based on your health profile, goals, and recent check-ins.</AccordionContent></AccordionItem>
                <AccordionItem value="item-12"><AccordionTrigger>Can I communicate with my healthcare provider through HealthBridge?</AccordionTrigger><AccordionContent>Yes, HealthBridge includes secure messaging features that allow you to communicate with your healthcare providers, social workers, and dietitians. Messages are HIPAA-compliant and you'll receive notifications when you have new messages.</AccordionContent></AccordionItem>
                <AccordionItem value="item-13"><AccordionTrigger>Are there voice options for accessibility?</AccordionTrigger><AccordionContent>Yes, HealthBridge is committed to accessibility. We offer voice-to-text and text-to-voice options for users who prefer or require voice interaction. These features can be enabled in your accessibility settings.</AccordionContent></AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Technical Support</CardTitle><CardDescription>Troubleshooting and technical help</CardDescription></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-14"><AccordionTrigger>What browsers are supported?</AccordionTrigger><AccordionContent>HealthBridge works best on the latest versions of Chrome, Firefox, Safari, and Edge. We also have mobile apps available for iOS and Android devices.</AccordionContent></AccordionItem>
                <AccordionItem value="item-15"><AccordionTrigger>I'm not receiving notifications. What should I check?</AccordionTrigger><AccordionContent>First, verify that notifications are enabled in your account settings. Then check that your email address and phone number are correct. For app notifications, ensure that you've granted notification permissions in your device settings.</AccordionContent></AccordionItem>
                <AccordionItem value="item-16"><AccordionTrigger>The app is running slowly. What can I do?</AccordionTrigger><AccordionContent>Try clearing your browser cache or app data. Make sure you have a stable internet connection. If you're using the mobile app, ensure it's updated to the latest version.</AccordionContent></AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageCircle className="w-5 h-5 text-blue-600" />Still Need Help?</CardTitle>
              <CardDescription>Our support team is here to assist you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-blue-600 mt-1" /><div><p className="font-medium text-gray-900">Email Support</p><p className="text-sm text-gray-600">support@healthbridge.com</p><p className="text-xs text-gray-500 mt-1">Response within 24 hours</p></div></div>
              <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-blue-600 mt-1" /><div><p className="font-medium text-gray-900">Phone Support</p><p className="text-sm text-gray-600">1-800-HEALTH-1 (1-800-432-5841)</p><p className="text-xs text-gray-500 mt-1">Monday-Friday, 8am-8pm EST</p></div></div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}