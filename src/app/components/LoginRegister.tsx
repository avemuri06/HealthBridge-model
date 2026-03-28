import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Heart, Mail, Lock, User, Phone, Check, CreditCard, ArrowLeft, CheckCircle } from "lucide-react";

type PlanType = "free" | "premium" | "enterprise";

interface Plan {
  id: PlanType;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

const plans: Plan[] = [
  { id: "free", name: "Basic", price: "$0", period: "forever", description: "Essential features to get started", features: ["Appointment reminders","Basic symptom check-ins","Medication tracking","Health goal setting","Educational resources"], cta: "Start with Basic" },
  { id: "premium", name: "Premium", price: "$29", period: "per month", description: "Advanced health management", recommended: true, features: ["Everything in Basic","Lifestyle recommendations","Direct provider messaging","Video consultations","Health analytics","Nutrition planning","Priority support"], cta: "Choose Premium" },
  { id: "enterprise", name: "Healthcare Provider", price: "Custom", period: "pricing", description: "For healthcare organizations", features: ["Everything in Premium","Multi-provider dashboard","Patient management","Custom integrations","Advanced reporting","Dedicated support"], cta: "Contact Sales" },
];

export function LoginRegister() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [currentTab, setCurrentTab] = useState("login");
  const [showPricingSelection, setShowPricingSelection] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); navigate("/home"); };
  const handleRegister = (e: React.FormEvent) => { e.preventDefault(); setShowPricingSelection(true); };
  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    if (plan.id === "free") { navigate("/home"); }
    else if (plan.id === "enterprise") { console.log("Contact sales"); }
    else { setBillingEmail(registerEmail); setShowPayment(true); }
  };
  const handlePayment = (e: React.FormEvent) => { e.preventDefault(); setTimeout(() => { setPaymentComplete(true); }, 1000); };
  const formatCardNumber = (value: string) => { const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, ""); const matches = v.match(/\d{4,16}/g); const match = (matches && matches[0]) || ""; const parts = []; for (let i = 0, len = match.length; i < len; i += 4) { parts.push(match.substring(i, i + 4)); } if (parts.length) { return parts.join(" "); } else { return value; } };
  const formatExpiryDate = (value: string) => { const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, ""); if (v.length >= 2) { return v.slice(0, 2) + "/" + v.slice(2, 4); } return v; };
  const resetRegistration = () => { setShowPricingSelection(false); setSelectedPlan(null); setShowPayment(false); setPaymentComplete(false); setCardNumber(""); setCardName(""); setExpiryDate(""); setCvv(""); setBillingEmail(""); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HealthBridge</h1>
          <p className="text-gray-600">Connecting Care, Empowering Health</p>
        </div>

        {!showPricingSelection ? (
          <div className="max-w-md mx-auto">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader><CardTitle>Welcome Back</CardTitle><CardDescription>Sign in to access your health dashboard</CardDescription></CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2"><Label htmlFor="login-email">Email</Label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="login-email" type="email" placeholder="Enter your email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="pl-10" required /></div></div>
                      <div className="space-y-2"><Label htmlFor="login-password">Password</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="login-password" type="password" placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="pl-10" required /></div></div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <div className="flex justify-between w-full text-sm"><Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link><Link to="/forgot-username" className="text-blue-600 hover:underline">Forgot username?</Link></div>
                    <div className="w-full h-px bg-gray-200" />
                    <div className="flex justify-between w-full text-sm"><Link to="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link><Link to="/pricing" className="text-gray-600 hover:text-blue-600">View Pricing</Link></div>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="register">
                <Card>
                  <CardHeader><CardTitle>Create Account</CardTitle><CardDescription>Join HealthBridge to manage your health journey</CardDescription></CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2"><Label htmlFor="register-name">Full Name</Label><div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="register-name" placeholder="John Doe" value={registerName} onChange={(e) => setRegisterName(e.target.value)} className="pl-10" required /></div></div>
                      <div className="space-y-2"><Label htmlFor="register-email">Email</Label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="register-email" type="email" placeholder="john@example.com" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className="pl-10" required /></div></div>
                      <div className="space-y-2"><Label htmlFor="register-phone">Phone Number</Label><div className="relative"><Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="register-phone" type="tel" placeholder="(123) 456-7890" value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} className="pl-10" /></div></div>
                      <div className="space-y-2"><Label htmlFor="register-password">Password</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="register-password" type="password" placeholder="Create a password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className="pl-10" required /></div></div>
                      <div className="space-y-2"><Label htmlFor="register-confirm">Confirm Password</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="register-confirm" type="password" placeholder="Confirm your password" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} className="pl-10" required /></div></div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Create Account</Button>
                    </form>
                  </CardContent>
                  <CardFooter><div className="flex justify-between w-full text-sm"><Link to="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link><Link to="/pricing" className="text-gray-600 hover:text-blue-600">View Pricing</Link></div></CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center"><h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2><p className="text-gray-600">Select the plan that works best for you</p></div>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.recommended ? "border-blue-600 border-2 shadow-xl" : "border-gray-200"}`}>
                  {plan.recommended && (<div className="absolute -top-4 left-1/2 transform -translate-x-1/2"><Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge></div>)}
                  <CardHeader className="text-center"><CardTitle className="text-xl">{plan.name}</CardTitle><div className="my-2"><span className="text-3xl font-bold text-gray-900">{plan.price}</span><span className="text-gray-600 ml-1">/{plan.period}</span></div><CardDescription className="text-sm">{plan.description}</CardDescription></CardHeader>
                  <CardContent><ul className="space-y-2.5">{plan.features.map((feature, index) => (<li key={index} className="flex items-start gap-2"><Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-700">{feature}</span></li>))}</ul></CardContent>
                  <CardFooter><Button onClick={() => handleSelectPlan(plan)} className={`w-full ${plan.recommended ? "bg-blue-600 hover:bg-blue-700" : plan.id === "enterprise" ? "bg-gray-900 hover:bg-gray-800" : "bg-green-600 hover:bg-green-700"}`}>{plan.cta}</Button></CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center"><button onClick={resetRegistration} className="text-sm text-gray-600 hover:text-blue-600 inline-flex items-center gap-2"><ArrowLeft className="w-4 h-4" />Back to Registration</button></div>
          </div>
        )}
      </div>

      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-[500px]">
          {!paymentComplete ? (
            <>
              <DialogHeader><DialogTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-600" />Complete Your Purchase</DialogTitle><DialogDescription>Subscribe to {selectedPlan?.name} plan - {selectedPlan?.price}/{selectedPlan?.period}</DialogDescription></DialogHeader>
              <form onSubmit={handlePayment}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2"><Label htmlFor="card-number">Card Number</Label><div className="relative"><CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="card-number" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} className="pl-10" maxLength={19} required /></div></div>
                  <div className="space-y-2"><Label htmlFor="card-name">Cardholder Name</Label><Input id="card-name" placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value)} required /></div>
                  <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="expiry">Expiry Date</Label><Input id="expiry" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))} maxLength={5} required /></div><div className="space-y-2"><Label htmlFor="cvv">CVV</Label><Input id="cvv" type="password" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))} maxLength={4} required /></div></div>
                  <div className="space-y-2"><Label htmlFor="billing-email">Billing Email</Label><Input id="billing-email" type="email" placeholder="john@example.com" value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="billing-cycle">Billing Cycle</Label><Select defaultValue="monthly"><SelectTrigger id="billing-cycle"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="monthly">Monthly - {selectedPlan?.price}</SelectItem><SelectItem value="annual">Annual - Save 20% (Coming Soon)</SelectItem></SelectContent></Select></div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"><Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" /><p className="text-xs text-gray-700">Your payment information is encrypted and secure.</p></div>
                </div>
                <DialogFooter className="flex gap-2"><Button type="button" variant="outline" onClick={() => { setShowPayment(false); setSelectedPlan(null); }}>Cancel</Button><Button type="submit" className="bg-blue-600 hover:bg-blue-700">Pay {selectedPlan?.price}</Button></DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader><div className="flex justify-center mb-4"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"><Check className="w-8 h-8 text-green-600" /></div></div><DialogTitle className="text-center">Payment Successful!</DialogTitle><DialogDescription className="text-center">Welcome to HealthBridge {selectedPlan?.name}</DialogDescription></DialogHeader>
              <div className="py-6 text-center space-y-4"><p className="text-sm text-gray-600">Your subscription is now active. A confirmation email has been sent to <strong>{billingEmail}</strong>.</p><div className="p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500 mb-1">Subscription Details</p><p className="font-medium text-gray-900">{selectedPlan?.name} Plan</p><p className="text-sm text-gray-600">{selectedPlan?.price}/{selectedPlan?.period}</p></div></div>
              <DialogFooter><Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => { setShowPayment(false); setPaymentComplete(false); navigate("/home"); }}>Get Started</Button></DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}