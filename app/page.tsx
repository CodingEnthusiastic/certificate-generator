"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Palette, Sparkles, FileText, ImageIcon } from "lucide-react"
import CertificatePreview from "@/components/certificate-preview"
import SignatureCanvas from "@/components/signature-canvas"

export interface CertificateData {
  certificateGiver: string
  awardedTo: string
  organization: string
  specialization: string
  reason: string
  date: string
  template: string
  signature: string
}

export default function CertificateGenerator() {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    certificateGiver: "",
    awardedTo: "",
    organization: "",
    specialization: "",
    reason: "",
    date: new Date().toISOString().split("T")[0],
    template: "elegant",
    signature: "",
  })

  const [activeTab, setActiveTab] = useState("details")
  const [isGenerating, setIsGenerating] = useState(false)

  const templates = [
    { id: "elegant", name: "Elegant Gold", description: "Classic gold border with serif typography", color: "🟡" },
    { id: "modern", name: "Modern Blue", description: "Clean sans-serif design with blue accents", color: "🔵" },
    { id: "corporate", name: "Corporate Green", description: "Professional monospace headers", color: "🟢" },
    { id: "creative", name: "Creative Purple", description: "Artistic serif design with purple theme", color: "🟣" },
    { id: "academic", name: "Academic Red", description: "Traditional serif academic style", color: "🔴" },
    { id: "minimalist", name: "Minimalist Gray", description: "Clean sans-serif minimalist design", color: "⚫" },
    { id: "royal", name: "Royal Indigo", description: "Regal serif design with indigo theme", color: "🟦" },
    { id: "vintage", name: "Vintage Amber", description: "Classic serif with warm amber tones", color: "🟠" },
  ]

  const handleInputChange = (field: keyof CertificateData, value: string) => {
    setCertificateData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignatureChange = (signature: string) => {
    setCertificateData((prev) => ({ ...prev, signature }))
  }

  const generateWithAI = async () => {
    setIsGenerating(true)
    try {
      // AI enhancement for certificate text
      const response = await fetch("/api/enhance-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          specialization: certificateData.specialization,
          reason: certificateData.reason,
        }),
      })

      if (response.ok) {
        const enhanced = await response.json()
        setCertificateData((prev) => ({
          ...prev,
          reason: enhanced.enhancedReason || prev.reason,
        }))
      }
    } catch (error) {
      console.error("AI enhancement failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Certificate Generator Pro
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional certificates with AI-powered enhancements, multiple templates, and instant downloads
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Enhanced
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Palette className="h-3 w-3 mr-1" />6 Templates
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Download className="h-3 w-3 mr-1" />
              PDF & JPG
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Certificate Details
              </CardTitle>
              <CardDescription className="text-purple-100">Fill in the certificate information below</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="template">Template</TabsTrigger>
                  <TabsTrigger value="signature">Signature</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="awardedTo" className="text-sm font-medium text-gray-700">
                        Awarded To *
                      </Label>
                      <Input
                        id="awardedTo"
                        placeholder="Recipient's full name"
                        value={certificateData.awardedTo}
                        onChange={(e) => handleInputChange("awardedTo", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certificateGiver" className="text-sm font-medium text-gray-700">
                        Certificate Giver *
                      </Label>
                      <Input
                        id="certificateGiver"
                        placeholder="Issuer's name"
                        value={certificateData.certificateGiver}
                        onChange={(e) => handleInputChange("certificateGiver", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organization" className="text-sm font-medium text-gray-700">
                        Organization *
                      </Label>
                      <Input
                        id="organization"
                        placeholder="Organization name"
                        value={certificateData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialization" className="text-sm font-medium text-gray-700">
                        Specialization *
                      </Label>
                      <Input
                        id="specialization"
                        placeholder="Field of expertise"
                        value={certificateData.specialization}
                        onChange={(e) => handleInputChange("specialization", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                      Reason for Award *
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Describe the achievement or reason for this certificate"
                      value={certificateData.reason}
                      onChange={(e) => handleInputChange("reason", e.target.value)}
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={certificateData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    onClick={generateWithAI}
                    disabled={isGenerating || !certificateData.specialization || !certificateData.reason}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enhancing with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Enhance with AI
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="template" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Choose Template</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            certificateData.template === template.id
                              ? "border-purple-500 bg-purple-50 shadow-md"
                              : "border-gray-200 hover:border-purple-300 hover:shadow-sm"
                          }`}
                          onClick={() => handleInputChange("template", template.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{template.color}</span>
                              <div>
                                <h3 className="font-medium text-gray-900">{template.name}</h3>
                                <p className="text-sm text-gray-600">{template.description}</p>
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                certificateData.template === template.id
                                  ? "border-purple-500 bg-purple-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {certificateData.template === template.id && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="signature" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Add Signature</Label>
                    <SignatureCanvas onSignatureChange={handleSignatureChange} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Right Panel - Preview */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Certificate Preview
              </CardTitle>
              <CardDescription className="text-blue-100">Live preview of your certificate</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CertificatePreview data={certificateData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
