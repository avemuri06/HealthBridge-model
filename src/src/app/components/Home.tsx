import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Calendar, MessageSquare, FileText, Activity, Bell, User, Settings, LogOut } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header/Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HealthBridge</h1>
                <p className="text-xs text-gray-600">Welcome back!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <LogOut className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Your Health Dashboard</h2>
          <p className="text-blue-100">
            Stay on top of your health with personalized reminders, check-ins, and recommendations.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Appointments</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                View and manage your upcoming appointments
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Symptom Check-in</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Log your daily symptoms and health status
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Messages</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with your healthcare providers
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Health Records</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access your medical history and reports
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled healthcare visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Dr. Sarah Johnson - Primary Care</p>
                    <p className="text-sm text-gray-600">Monday, March 31, 2026 at 10:00 AM</p>
                    <p className="text-xs text-gray-500 mt-1">Annual checkup and health screening</p>
                  </div>
                  <Button size="sm" variant="outline">Reschedule</Button>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Maria Rodriguez - Dietitian</p>
                    <p className="text-sm text-gray-600">Wednesday, April 2, 2026 at 2:30 PM</p>
                    <p className="text-xs text-gray-500 mt-1">Nutrition consultation and meal planning</p>
                  </div>
                  <Button size="sm" variant="outline">Details</Button>
                </div>

                <Button className="w-full" variant="outline">
                  View All Appointments
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your health updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Appointment reminder sent</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Symptom check-in completed</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New message from Dr. Johnson</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lab results available</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lifestyle Recommendations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Personalized Lifestyle Recommendations</CardTitle>
            <CardDescription>Tips to help you maintain a healthier lifestyle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <h4 className="font-medium text-gray-900 mb-2">💪 Stay Active</h4>
                <p className="text-sm text-gray-700">
                  Try to walk for 30 minutes today. Regular physical activity helps maintain cardiovascular health.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <h4 className="font-medium text-gray-900 mb-2">🥗 Nutrition Focus</h4>
                <p className="text-sm text-gray-700">
                  Include more leafy greens in your diet. They're rich in vitamins and support overall wellness.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <h4 className="font-medium text-gray-900 mb-2">😴 Sleep Well</h4>
                <p className="text-sm text-gray-700">
                  Aim for 7-8 hours of sleep tonight. Quality rest is essential for recovery and health.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
