import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Heart, Check, ArrowLeft, CreditCard, Lock } from "lucide-react";

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
  {
    id: "free",
    name: "Basic",
    price: "$0",
    period: "forever",
    description: "Essential features to get started with health management",
    features: [
      "Appointment reminders (email & SMS)",
      "Basic symptom check-ins",
      "Medication tracking",
      "Health goal setting",
      "Access to educational resources",
      "Community forum access",
    ],
    cta: "Get Started Free",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$29",
    period: "per month",
    description: "Advanced features for comprehensive health management",
    recommended: true,
    features: [
      "Everything in Basic, plus:",
      "Personalized lifestyle recommendations",
      "Direct provider messaging",
      "Video consultation scheduling",
      "Advanced health analytics",
      "Nutrition & meal planning",
      "Priority customer support",
      "Family member access (up to 5)",
    ],
    cta: "Start Premium",
  },
  {
    id: "enterprise",
    name: "Healthcare Provider",
    price: "Custom",
    period: "pricing",
    description: "Complete solution for healthcare organizations",
    features: [
      "Everything in Premium, plus:",
      "Multi-provider dashboard",
      "Patient management system",
      "Custom integrations (EHR, etc.)",
      "Advanced reporting & analytics",
      "HIPAA-compliant data storage",
      "Dedicated account manager",
      "White-label options available",
      "24/7 priority support",
    ],
    cta: "Contact Sales",
  },
];

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    if (plan.id === "free") {
      // For free plan, no payment needed
      console.log("Selected free plan");
      // Could redirect to registration or dashboard
    } else if (plan.id === "enterprise") {
      // For enterprise, redirect to contact
      console.log("Contact sales for enterprise plan");
    } else {
      // Show payment modal for premium
      setShowPayment(true);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    console.log("Processing payment:", {
      plan: selectedPlan?.name,
      cardNumber: cardNumber.slice(-4),
      cardName,
      expiryDate,
      billingEmail,
    });
    
    // Simulate payment success
    setTimeout(() => {
      setPaymentComplete(true);
    }, 1000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Choose Your Plan</h1>
                <p className="text-gray-600">Select the perfect plan for your health journey</p>
              </div>
            </div>
            <Link to="/faq">
              <Button variant="outline">View FAQ</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.recommended
                  ? "border-blue-600 border-2 shadow-xl"
                  : "border-gray-200"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-6">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full ${
                    plan.recommended
                      ? "bg-blue-600 hover:bg-blue-700"
                      : plan.id === "enterprise"
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Healthcare Provider Partnership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                Many healthcare providers offer HealthBridge as part of their care packages. 
                Check with your provider to see if you're eligible for free or discounted access.
              </p>
              <Button variant="outline" className="w-full">
                Find Participating Providers
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg">Questions About Pricing?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                Our team is here to help you choose the right plan for your needs. 
                Contact us for personalized recommendations or custom enterprise solutions.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-[500px]">
          {!paymentComplete ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Complete Your Purchase
                </DialogTitle>
                <DialogDescription>
                  Subscribe to {selectedPlan?.name} plan - {selectedPlan?.price}/{selectedPlan?.period}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handlePayment}>
                <div className="space-y-4 py-4">
                  {/* Card Number */}
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        className="pl-10"
                        maxLength={19}
                        required
                      />
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Billing Email */}
                  <div className="space-y-2">
                    <Label htmlFor="billing-email">Billing Email</Label>
                    <Input
                      id="billing-email"
                      type="email"
                      placeholder="john@example.com"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Billing Cycle */}
                  <div className="space-y-2">
                    <Label htmlFor="billing-cycle">Billing Cycle</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger id="billing-cycle">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly - ${selectedPlan?.price}</SelectItem>
                        <SelectItem value="annual">Annual - Save 20% (Coming Soon)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-700">
                      Your payment information is encrypted and secure. We never store your 
                      full card details on our servers.
                    </p>
                  </div>
                </div>

                <DialogFooter className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPayment(false);
                      setSelectedPlan(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Pay {selectedPlan?.price}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <DialogTitle className="text-center">Payment Successful!</DialogTitle>
                <DialogDescription className="text-center">
                  Welcome to HealthBridge {selectedPlan?.name}
                </DialogDescription>
              </DialogHeader>

              <div className="py-6 text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Your subscription is now active. A confirmation email has been sent to{" "}
                  <strong>{billingEmail}</strong>.
                </p>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Subscription Details</p>
                  <p className="font-medium text-gray-900">{selectedPlan?.name} Plan</p>
                  <p className="text-sm text-gray-600">
                    {selectedPlan?.price}/{selectedPlan?.period}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setShowPayment(false);
                    setPaymentComplete(false);
                    setSelectedPlan(null);
                    // Could redirect to dashboard here
                  }}
                >
                  Get Started
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}