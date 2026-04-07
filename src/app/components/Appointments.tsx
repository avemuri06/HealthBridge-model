import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Heart, Calendar, Clock, MapPin, User, Phone, Video, ArrowLeft, Plus, Search, Filter } from "lucide-react";

interface Appointment {
  id: string;
  providerName: string;
  providerType: string;
  date: string;
  time: string;
  location: string;
  type: "in-person" | "video";
  reason: string;
  status: "upcoming" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    providerName: "Dr. Sarah Johnson",
    providerType: "Primary Care Physician",
    date: "2026-03-31",
    time: "10:00 AM",
    location: "HealthBridge Medical Center, Suite 200",
    type: "in-person",
    reason: "Annual checkup and health screening",
    status: "upcoming"
  },
  {
    id: "2",
    providerName: "Maria Rodriguez",
    providerType: "Registered Dietitian",
    date: "2026-04-02",
    time: "2:30 PM",
    location: "Virtual Consultation",
    type: "video",
    reason: "Nutrition consultation and meal planning",
    status: "upcoming"
  },
  {
    id: "3",
    providerName: "Dr. Michael Chen",
    providerType: "Cardiologist",
    date: "2026-04-10",
    time: "11:15 AM",
    location: "Heart Health Clinic, Floor 3",
    type: "in-person",
    reason: "Follow-up appointment for blood pressure",
    status: "upcoming"
  },
  {
    id: "4",
    providerName: "Dr. Sarah Johnson",
    providerType: "Primary Care Physician",
    date: "2026-03-15",
    time: "9:00 AM",
    location: "HealthBridge Medical Center, Suite 200",
    type: "in-person",
    reason: "Flu symptoms check",
    status: "completed"
  },
];

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  // New appointment form
  const [newProvider, setNewProvider] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newType, setNewType] = useState<"in-person" | "video">("in-person");
  const [newReason, setNewReason] = useState("");

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === "all" || apt.status === filter;
    const matchesSearch = apt.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.providerType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      providerName: newProvider,
      providerType: "Healthcare Provider",
      date: newDate,
      time: newTime,
      location: newType === "video" ? "Virtual Consultation" : "HealthBridge Medical Center",
      type: newType,
      reason: newReason,
      status: "upcoming"
    };
    setAppointments([newAppointment, ...appointments]);
    setShowNewAppointment(false);
    setNewProvider("");
    setNewDate("");
    setNewTime("");
    setNewReason("");
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: "cancelled" as const } : apt
    ));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/home">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
                <p className="text-xs text-gray-600">Manage your healthcare visits</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowNewAppointment(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by provider or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-blue-600" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
              className={filter === "upcoming" ? "bg-blue-600" : ""}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-blue-600" : ""}
            >
              Completed
            </Button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">No appointments found</p>
                <Button 
                  onClick={() => setShowNewAppointment(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Schedule Your First Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                        appointment.status === "upcoming" ? "bg-blue-100" :
                        appointment.status === "completed" ? "bg-green-100" : "bg-gray-100"
                      }`}>
                        {appointment.type === "video" ? (
                          <Video className={`w-7 h-7 ${
                            appointment.status === "upcoming" ? "text-blue-600" :
                            appointment.status === "completed" ? "text-green-600" : "text-gray-600"
                          }`} />
                        ) : (
                          <Calendar className={`w-7 h-7 ${
                            appointment.status === "upcoming" ? "text-blue-600" :
                            appointment.status === "completed" ? "text-green-600" : "text-gray-600"
                          }`} />
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {appointment.providerName}
                          </h3>
                          <p className="text-sm text-gray-600">{appointment.providerType}</p>
                        </div>
                        <Badge 
                          className={
                            appointment.status === "upcoming" ? "bg-blue-100 text-blue-700" :
                            appointment.status === "completed" ? "bg-green-100 text-green-700" :
                            "bg-gray-100 text-gray-700"
                          }
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 sm:col-span-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Reason:</span> {appointment.reason}
                        </p>
                      </div>

                      {/* Actions */}
                      {appointment.status === "upcoming" && (
                        <div className="flex flex-wrap gap-2">
                          {appointment.type === "video" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Video className="w-4 h-4 mr-2" />
                              Join Video Call
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowReschedule(true);
                            }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancel
                          </Button>
                          <Button size="sm" variant="outline">
                            Get Directions
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Schedule New Appointment Modal */}
      <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Book an appointment with your healthcare provider
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleScheduleAppointment}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Healthcare Provider</Label>
                <Select value={newProvider} onValueChange={setNewProvider} required>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson - Primary Care</SelectItem>
                    <SelectItem value="Maria Rodriguez">Maria Rodriguez - Dietitian</SelectItem>
                    <SelectItem value="Dr. Michael Chen">Dr. Michael Chen - Cardiologist</SelectItem>
                    <SelectItem value="Dr. Emily White">Dr. Emily White - Dermatologist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select value={newType} onValueChange={(value: "in-person" | "video") => setNewType(value)}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person Visit</SelectItem>
                    <SelectItem value="video">Video Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Describe the reason for your appointment..."
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowNewAppointment(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Schedule Appointment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reschedule Modal */}
      <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Choose a new date and time for your appointment with {selectedAppointment?.providerName}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            setShowReschedule(false);
          }}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reschedule-date">New Date</Label>
                  <Input
                    id="reschedule-date"
                    type="date"
                    defaultValue={selectedAppointment?.date}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reschedule-time">New Time</Label>
                  <Input
                    id="reschedule-time"
                    type="time"
                    defaultValue={selectedAppointment?.time}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reschedule-reason">Reason for Rescheduling (Optional)</Label>
                <Textarea
                  id="reschedule-reason"
                  placeholder="Let us know why you need to reschedule..."
                  rows={2}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowReschedule(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Confirm Reschedule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}