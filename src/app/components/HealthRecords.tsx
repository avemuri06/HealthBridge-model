import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heart, ArrowLeft, FileText, Pill, FlaskConical, Download, Search, Calendar } from "lucide-react";

interface LabResult {
  id: string;
  date: string;
  testName: string;
  result: string;
  range: string;
  status: "normal" | "abnormal" | "pending";
  provider: string;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  prescribedDate: string;
  refillsRemaining: number;
  status: "active" | "completed" | "cancelled";
}

interface MedicalDocument {
  id: string;
  title: string;
  type: string;
  date: string;
  provider: string;
  size: string;
}

const mockLabResults: LabResult[] = [
  {
    id: "1",
    date: "2026-03-20",
    testName: "Complete Blood Count (CBC)",
    result: "Normal",
    range: "Within normal limits",
    status: "normal",
    provider: "Dr. Sarah Johnson"
  },
  {
    id: "2",
    date: "2026-03-20",
    testName: "Cholesterol Panel",
    result: "Total: 195 mg/dL",
    range: "Desirable: <200 mg/dL",
    status: "normal",
    provider: "Dr. Sarah Johnson"
  },
  {
    id: "3",
    date: "2026-03-20",
    testName: "Blood Glucose",
    result: "105 mg/dL",
    range: "Normal: 70-100 mg/dL",
    status: "abnormal",
    provider: "Dr. Sarah Johnson"
  },
  {
    id: "4",
    date: "2026-02-15",
    testName: "Vitamin D",
    result: "28 ng/mL",
    range: "Normal: 30-100 ng/mL",
    status: "abnormal",
    provider: "Dr. Sarah Johnson"
  },
];

const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Sarah Johnson",
    prescribedDate: "2026-01-15",
    refillsRemaining: 3,
    status: "active"
  },
  {
    id: "2",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily with meals",
    prescribedBy: "Dr. Michael Chen",
    prescribedDate: "2026-02-01",
    refillsRemaining: 2,
    status: "active"
  },
  {
    id: "3",
    medication: "Vitamin D3",
    dosage: "2000 IU",
    frequency: "Once daily",
    prescribedBy: "Dr. Sarah Johnson",
    prescribedDate: "2026-02-20",
    refillsRemaining: 5,
    status: "active"
  },
  {
    id: "4",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    prescribedBy: "Dr. Sarah Johnson",
    prescribedDate: "2026-01-05",
    refillsRemaining: 0,
    status: "completed"
  },
];

const mockDocuments: MedicalDocument[] = [
  {
    id: "1",
    title: "Annual Physical Exam Report",
    type: "Medical Report",
    date: "2026-03-15",
    provider: "Dr. Sarah Johnson",
    size: "245 KB"
  },
  {
    id: "2",
    title: "Cardiology Consultation Notes",
    type: "Consultation",
    date: "2026-02-10",
    provider: "Dr. Michael Chen",
    size: "180 KB"
  },
  {
    id: "3",
    title: "Chest X-Ray Results",
    type: "Imaging",
    date: "2026-01-22",
    provider: "Radiology Department",
    size: "1.2 MB"
  },
  {
    id: "4",
    title: "Vaccination Record",
    type: "Immunization",
    date: "2025-12-01",
    provider: "HealthBridge Clinic",
    size: "95 KB"
  },
];

export function HealthRecords() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("labs");

  const filteredLabResults = mockLabResults.filter(lab =>
    lab.testName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPrescriptions = mockPrescriptions.filter(rx =>
    rx.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-700";
      case "abnormal": return "bg-yellow-100 text-yellow-700";
      case "pending": return "bg-blue-100 text-blue-700";
      case "active": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-gray-100 text-gray-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
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
              <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-600 rounded-full">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Health Records</h1>
                <p className="text-xs text-gray-600">Access your medical history</p>
              </div>
            </div>
            
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Download className="w-4 h-4 mr-2" />
              Export Records
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          {/* Lab Results Tab */}
          <TabsContent value="labs" className="space-y-4">
            {filteredLabResults.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FlaskConical className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">No lab results found</p>
                </CardContent>
              </Card>
            ) : (
              filteredLabResults.map((lab) => (
                <Card key={lab.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FlaskConical className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{lab.testName}</h3>
                          <p className="text-sm text-gray-600">Ordered by {lab.provider}</p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(lab.date)}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(lab.status)}>
                        {lab.status.charAt(0).toUpperCase() + lab.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Result</p>
                        <p className="font-medium text-gray-900">{lab.result}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Reference Range</p>
                        <p className="font-medium text-gray-900">{lab.range}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-4">
            {filteredPrescriptions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Pill className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">No prescriptions found</p>
                </CardContent>
              </Card>
            ) : (
              filteredPrescriptions.map((rx) => (
                <Card key={rx.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Pill className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{rx.medication}</h3>
                          <p className="text-sm text-gray-600">Prescribed by {rx.prescribedBy}</p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(rx.prescribedDate)}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(rx.status)}>
                        {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Dosage</p>
                        <p className="font-medium text-gray-900">{rx.dosage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Frequency</p>
                        <p className="font-medium text-gray-900">{rx.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Refills</p>
                        <p className="font-medium text-gray-900">{rx.refillsRemaining} remaining</p>
                      </div>
                    </div>

                    {rx.status === "active" && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Request Refill
                        </Button>
                        <Button size="sm" variant="outline">
                          Set Reminder
                        </Button>
                        <Button size="sm" variant="outline">
                          View Instructions
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">No documents found</p>
                </CardContent>
              </Card>
            ) : (
              filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                            <p className="text-sm text-gray-600">{doc.provider}</p>
                          </div>
                          <Badge variant="outline">{doc.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(doc.date)}
                          </span>
                          <span>{doc.size}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Lab Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Tests</span>
                      <span className="font-semibold text-gray-900">{mockLabResults.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Normal Results</span>
                      <span className="font-semibold text-green-600">
                        {mockLabResults.filter(l => l.status === "normal").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Needs Attention</span>
                      <span className="font-semibold text-yellow-600">
                        {mockLabResults.filter(l => l.status === "abnormal").length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Active</span>
                      <span className="font-semibold text-gray-900">
                        {mockPrescriptions.filter(p => p.status === "active").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Low Refills</span>
                      <span className="font-semibold text-yellow-600">
                        {mockPrescriptions.filter(p => p.refillsRemaining <= 2 && p.status === "active").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="font-semibold text-gray-600">
                        {mockPrescriptions.filter(p => p.status === "completed").length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Documents</span>
                      <span className="font-semibold text-gray-900">{mockDocuments.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Added</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(mockDocuments[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Storage Used</span>
                      <span className="font-semibold text-gray-900">1.7 MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your health records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export All Records
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Records
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Pill className="w-4 h-4 mr-2" />
                    Medication List
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FlaskConical className="w-4 h-4 mr-2" />
                    Lab History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}