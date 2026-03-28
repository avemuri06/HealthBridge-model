import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 hover:bg-blue-700 transition-colors">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">We'll help you get back to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forgot Your Password?</CardTitle>
            <CardDescription>Enter your email address and we'll send you instructions to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="email" type="email" placeholder="Enter your registered email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Send Reset Instructions</Button>
              </form>
            ) : (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Check your email!</strong>
                  <p className="mt-2">We've sent password reset instructions to <strong>{email}</strong>. Please check your inbox and follow the link to reset your password.</p>
                  <p className="mt-2 text-sm">Didn't receive the email? Check your spam folder or{" "}<button onClick={() => setSubmitted(false)} className="text-blue-600 hover:underline font-medium">try again</button></p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"><ArrowLeft className="w-4 h-4" />Back to Login</Link>
            <div className="w-full h-px bg-gray-200" />
            <div className="flex justify-between w-full text-sm">
              <Link to="/forgot-username" className="text-blue-600 hover:underline">Forgot username?</Link>
              <Link to="/faq" className="text-blue-600 hover:underline">Visit FAQ</Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 text-center">
          <p className="text-sm text-gray-600">Still having trouble? Contact our support team</p>
          <p className="text-sm text-blue-600 font-medium mt-1">support@healthbridge.com</p>
        </div>
      </div>
    </div>
  );
}