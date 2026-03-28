import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Heart, ArrowLeft, User, Mail, Phone, Lock, Bell, Shield, CreditCard, CheckCircle, Camera, LogOut, Trash2, Eye, EyeOff, Check } from "lucide-react";

export function ProfileSettings() {
  const [fullName, setFullName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@email.com");
  const [phone, setPhone] = useState("(555) 867-5309");
  const [dateOfBirth, setDateOfBirth] = useState("1985-06-15");
  const [gender, setGender] = useState("prefer-not");
  const [preferredLanguage, setPreferredLanguage] = useState("english");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [reminderTiming, setReminderTiming] = useState("24h");
  const [savedPersonal, setSavedPersonal] = useState(false);
  const [savedPassword, setSavedPassword] = useState(false);
  const [savedNotifications, setSavedNotifications] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedPersonal(true);
    setTimeout(() => setSavedPersonal(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword !== confirmPassword) { setPasswordError("New passwords do not match."); return; }
    if (newPassword.length < 8) { setPasswordError("Password must be at least 8 characters."); return; }
    setSavedPassword(true);
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setTimeout(() => setSavedPassword(false), 3000);
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotifications(true);
    setTimeout(() => setSavedNotifications(false), 3000);
  };

  const ToggleSwitch = ({ enabled, onChange, id }: { enabled: boolean; onChange: (v: boolean) => void; id: string }) => (
    <button type="button" id={id} role="switch" aria-checked={enabled} onClick={() => onChange(!enabled)} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${enabled ? "bg-blue-600" : "bg-gray-200"}`}>
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/home" className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthBridge</h1>
                <p className="text-xs text-gray-500">Account Settings</p>
              </div>
            </div>
            <Link to="/home"><Button variant="ghost" size="sm" className="gap-2 text-gray-600"><ArrowLeft className="w-4 h-4" />Back to Dashboard</Button></Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardContent className="py-6">
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">AJ</span>
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                  <Camera className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-900">Alex Johnson</h2>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">Premium</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">alex.johnson@email.com</p>
                <p className="text-xs text-gray-400 mt-1">Member since January 2025</p>
              </div>
              <div className="hidden sm:flex flex-col gap-2">
                <Link to="/"><Button variant="outline" size="sm" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"><LogOut className="w-4 h-4" />Sign Out</Button></Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="personal" className="gap-1.5 text-xs sm:text-sm"><User className="w-4 h-4" /><span className="hidden sm:inline">Personal</span></TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5 text-xs sm:text-sm"><Lock className="w-4 h-4" /><span className="hidden sm:inline">Security</span></TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5 text-xs sm:text-sm"><Bell className="w-4 h-4" /><span className="hidden sm:inline">Notifications</span></TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5 text-xs sm:text-sm"><CreditCard className="w-4 h-4" /><span className="hidden sm:inline">Billing</span></TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-blue-600" />Personal Information</CardTitle><CardDescription>Update your name, contact details, and preferences</CardDescription></CardHeader>
              <CardContent>
                {savedPersonal && (<Alert className="mb-4 border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">Your personal information has been saved successfully.</AlertDescription></Alert>)}
                <form onSubmit={handleSavePersonal} className="space-y-5">
                  <div className="space-y-2"><Label htmlFor="fullName">Full Name</Label><div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10" required /></div></div>
                  <div className="space-y-2"><Label htmlFor="email">Email Address</Label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required /></div><p className="text-xs text-gray-500">A verification email will be sent if you change this.</p></div>
                  <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><div className="relative"><Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" /></div></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="dob">Date of Birth</Label><Input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="gender">Gender</Label><Select value={gender} onValueChange={setGender}><SelectTrigger id="gender"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="non-binary">Non-binary</SelectItem><SelectItem value="prefer-not">Prefer not to say</SelectItem></SelectContent></Select></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="language">Preferred Language</Label><Select value={preferredLanguage} onValueChange={setPreferredLanguage}><SelectTrigger id="language"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="english">English</SelectItem><SelectItem value="spanish">Spanish</SelectItem><SelectItem value="french">French</SelectItem><SelectItem value="mandarin">Mandarin</SelectItem><SelectItem value="portuguese">Portuguese</SelectItem></SelectContent></Select></div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-blue-600" />Change Password</CardTitle><CardDescription>Use a strong, unique password to keep your account secure</CardDescription></CardHeader>
                <CardContent>
                  {savedPassword && (<Alert className="mb-4 border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">Your password has been updated successfully.</AlertDescription></Alert>)}
                  {passwordError && (<Alert className="mb-4 border-red-200 bg-red-50"><AlertDescription className="text-red-800">{passwordError}</AlertDescription></Alert>)}
                  <form onSubmit={handleSavePassword} className="space-y-4">
                    <div className="space-y-2"><Label htmlFor="currentPassword">Current Password</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="currentPassword" type={showCurrentPassword ? "text" : "password"} placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="pl-10 pr-10" required /><button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">{showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
                    <div className="space-y-2"><Label htmlFor="newPassword">New Password</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="newPassword" type={showNewPassword ? "text" : "password"} placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pl-10 pr-10" required /><button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">{showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div><p className="text-xs text-gray-500">Must be at least 8 characters</p></div>
                    <div className="space-y-2"><Label htmlFor="confirmPassword">Confirm New Password</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10" required /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Update Password</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-green-600" />Two-Factor Authentication</CardTitle><CardDescription>Add an extra layer of security to your account</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"><div><p className="font-medium text-gray-900 text-sm">Authenticator App</p><p className="text-xs text-gray-500 mt-0.5">Use an app like Google Authenticator or Authy</p></div><Badge className="bg-gray-100 text-gray-600 border-gray-200">Not enabled</Badge></div>
                  <Button variant="outline" className="mt-4 w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50">Enable Two-Factor Auth</Button>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader><CardTitle className="flex items-center gap-2 text-red-600"><Trash2 className="w-5 h-5" />Danger Zone</CardTitle><CardDescription>Irreversible account actions</CardDescription></CardHeader>
                <CardContent>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200"><p className="font-medium text-gray-900 text-sm mb-1">Delete Account</p><p className="text-xs text-gray-600 mb-4">Permanently delete your account and all associated health data. This action cannot be undone.</p><Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-100">Delete My Account</Button></div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-blue-600" />Notification Preferences</CardTitle><CardDescription>Choose how and when you'd like to be contacted</CardDescription></CardHeader>
              <CardContent>
                {savedNotifications && (<Alert className="mb-4 border-green-200 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-800">Notification preferences saved.</AlertDescription></Alert>)}
                <form onSubmit={handleSaveNotifications} className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-3">Notification Channels</p>
                    <div className="space-y-4">
                      {[
                        { id: "emailReminders", label: "Email Reminders", description: "Appointment and check-in reminders via email", value: emailReminders, setter: setEmailReminders },
                        { id: "smsReminders", label: "SMS / Text Reminders", description: "Appointment reminders sent to your phone number", value: smsReminders, setter: setSmsReminders },
                        { id: "appNotifications", label: "In-App Notifications", description: "Alerts inside the HealthBridge app", value: appNotifications, setter: setAppNotifications },
                        { id: "marketingEmails", label: "Marketing & Tips", description: "Health tips, feature updates, and promotional emails", value: marketingEmails, setter: setMarketingEmails },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div><label htmlFor={item.id} className="text-sm font-medium text-gray-900 cursor-pointer">{item.label}</label><p className="text-xs text-gray-500 mt-0.5">{item.description}</p></div>
                          <ToggleSwitch id={item.id} enabled={item.value} onChange={item.setter} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="reminderTiming">Appointment Reminder Timing</Label><Select value={reminderTiming} onValueChange={setReminderTiming}><SelectTrigger id="reminderTiming"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="2h">2 hours before</SelectItem><SelectItem value="24h">24 hours before</SelectItem><SelectItem value="48h">48 hours before</SelectItem><SelectItem value="1w">1 week before</SelectItem></SelectContent></Select><p className="text-xs text-gray-500">How far in advance you'd like appointment reminders</p></div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Save Preferences</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader><div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-600" />Current Plan</CardTitle><Badge className="bg-blue-600 text-white">Active</Badge></div></CardHeader>
                <CardContent>
                  <div className="flex items-end gap-1 mb-3"><span className="text-3xl font-bold text-gray-900">$29</span><span className="text-gray-500 mb-1">/month</span><span className="ml-2 text-sm font-semibold text-blue-700">Premium Plan</span></div>
                  <ul className="space-y-1.5 mb-4">{["Lifestyle recommendations","Direct provider messaging","Video consultations","Health analytics"].map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-green-600 flex-shrink-0" />{f}</li>))}</ul>
                  <div className="flex flex-wrap gap-2"><Link to="/pricing"><Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">Change Plan</Button></Link><Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">Cancel Subscription</Button></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Payment Method</CardTitle><CardDescription>Your saved payment information</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4"><div className="flex items-center gap-3"><div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center"><span className="text-white text-xs font-bold">VISA</span></div><div><p className="text-sm font-medium text-gray-900">Visa ending in 4242</p><p className="text-xs text-gray-500">Expires 08/28</p></div></div><Badge className="bg-green-100 text-green-700 border-green-200">Default</Badge></div>
                  <Button variant="outline" size="sm" className="gap-2"><CreditCard className="w-4 h-4" />Update Payment Method</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Billing History</CardTitle><CardDescription>Your recent invoices</CardDescription></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[{ date: "Mar 1, 2026", amount: "$29.00", status: "Paid" },{ date: "Feb 1, 2026", amount: "$29.00", status: "Paid" },{ date: "Jan 1, 2026", amount: "$29.00", status: "Paid" }].map((invoice, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"><div><p className="text-sm font-medium text-gray-900">Premium Plan</p><p className="text-xs text-gray-500">{invoice.date}</p></div><div className="flex items-center gap-3"><span className="text-sm font-medium text-gray-900">{invoice.amount}</span><Badge className="bg-green-100 text-green-700 border-green-200 text-xs">{invoice.status}</Badge></div></div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 w-full">View All Invoices</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}