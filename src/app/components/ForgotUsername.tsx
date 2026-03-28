import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, Mail, Phone, ArrowLeft, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ForgotUsername() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState<"email" | "phone">("email");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username recovery requested via:", recoveryMethod, { email, phone });
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setEmail("");
    setPhone("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 hover:bg-blue-700 transition-colors">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recover Username</h1>
          <p className="text-gray-600">We'll help you retrieve your username</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forgot Your Username?</CardTitle>
            <CardDescription>Choose a recovery method to receive your username</CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <Tabs defaultValue="email" onValueChange={(value) => setRecoveryMethod(value as "email" | "phone")}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="email">Via Email</TabsTrigger>
                  <TabsTrigger value="phone">Via Phone</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="email" type="email" placeholder="Enter your registered email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                      </div>
                      <p className="text-xs text-gray-500">We'll send your username to this email address</p>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Send Username via Email</Button>
                  </form>
                </TabsContent>
                <TabsContent value="phone">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="phone" type="tel" placeholder="(123) 456-7890" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" required />
                      </div>
                      <p className="text-xs text-gray-500">We'll send your username via SMS to this number</p>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Send Username via SMS</Button>
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Username sent!</strong>
                  <p className="mt-2">{recoveryMethod === "email" ? `We've sent your username to ${email}. Please check your inbox.` : `We've sent your username via SMS to ${phone}.`}</p>
                  <p className="mt-2 text-sm">Didn't receive it? {recoveryMethod === "email" ? "Check your spam folder or" : ""}{" "}<button onClick={resetForm} className="text-blue-600 hover:underline font-medium">try again</button></p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"><ArrowLeft className="w-4 h-4" />Back to Login</Link>
            <div className="w-full h-px bg-gray-200" />
            <div className="flex justify-between w-full text-sm">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
              <Link to="/faq" className="text-blue-600 hover:underline">Visit FAQ</Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 text-center">
          <p className="text-sm text-gray-600">Still need assistance? Contact our support team</p>
          <p className="text-sm text-blue-600 font-medium mt-1">support@healthbridge.com</p>
        </div>
      </div>
    </div>
  );
}