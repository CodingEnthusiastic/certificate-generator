"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileImage, FileText } from "lucide-react"
import type { CertificateData } from "@/app/page"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface CertificatePreviewProps {
  data: CertificateData
}

export default function CertificatePreview({ data }: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const getTemplateStyles = (template: string) => {
    const styles = {
      elegant: {
        bg: "bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100",
        border: "border-8 border-yellow-400",
        accent: "text-yellow-600",
        title: "text-yellow-800",
        decorative: "border-yellow-300",
        titleFont: "font-serif",
        nameFont: "font-serif",
        textFont: "font-sans",
        pattern: "bg-yellow-100/30",
      },
      modern: {
        bg: "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100",
        border: "border-8 border-blue-500",
        accent: "text-blue-700",
        title: "text-blue-900",
        decorative: "border-blue-400",
        titleFont: "font-sans",
        nameFont: "font-sans",
        textFont: "font-sans",
        pattern: "bg-blue-100/30",
      },
      corporate: {
        bg: "bg-gradient-to-br from-green-50 via-emerald-50 to-green-100",
        border: "border-8 border-green-500",
        accent: "text-green-700",
        title: "text-green-900",
        decorative: "border-green-400",
        titleFont: "font-mono",
        nameFont: "font-sans",
        textFont: "font-sans",
        pattern: "bg-green-100/30",
      },
      creative: {
        bg: "bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100",
        border: "border-8 border-purple-500",
        accent: "text-purple-700",
        title: "text-purple-900",
        decorative: "border-purple-400",
        titleFont: "font-serif",
        nameFont: "font-serif",
        textFont: "font-serif",
        pattern: "bg-purple-100/30",
      },
      academic: {
        bg: "bg-gradient-to-br from-red-50 via-rose-50 to-red-100",
        border: "border-8 border-red-500",
        accent: "text-red-700",
        title: "text-red-900",
        decorative: "border-red-400",
        titleFont: "font-serif",
        nameFont: "font-serif",
        textFont: "font-serif",
        pattern: "bg-red-100/30",
      },
      minimalist: {
        bg: "bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100",
        border: "border-8 border-gray-500",
        accent: "text-gray-700",
        title: "text-gray-900",
        decorative: "border-gray-400",
        titleFont: "font-sans",
        nameFont: "font-sans",
        textFont: "font-sans",
        pattern: "bg-gray-100/30",
      },
      royal: {
        bg: "bg-gradient-to-br from-indigo-50 via-violet-50 to-indigo-100",
        border: "border-8 border-indigo-600",
        accent: "text-indigo-700",
        title: "text-indigo-900",
        decorative: "border-indigo-500",
        titleFont: "font-serif",
        nameFont: "font-serif",
        textFont: "font-serif",
        pattern: "bg-indigo-100/30",
      },
      vintage: {
        bg: "bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100",
        border: "border-8 border-amber-600",
        accent: "text-amber-800",
        title: "text-amber-900",
        decorative: "border-amber-500",
        titleFont: "font-serif",
        nameFont: "font-serif",
        textFont: "font-serif",
        pattern: "bg-amber-100/30",
      },
    }
    return styles[template as keyof typeof styles] || styles.elegant
  }

  const downloadAsJPG = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        width: certificateRef.current.offsetWidth,
        height: certificateRef.current.offsetHeight,
        scrollX: 0,
        scrollY: 0,
      })

      const link = document.createElement("a")
      link.download = `certificate-${data.awardedTo.replace(/\s+/g, "-").toLowerCase()}.jpg`
      link.href = canvas.toDataURL("image/jpeg", 1.0)
      link.click()
    } catch (error) {
      console.error("Error generating JPG:", error)
    }
  }

  const downloadAsPDF = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        width: certificateRef.current.offsetWidth,
        height: certificateRef.current.offsetHeight,
        scrollX: 0,
        scrollY: 0,
      })

      const imgData = canvas.toDataURL("image/png", 1.0)
      const pdf = new jsPDF("l", "mm", "a4")
      const imgWidth = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`certificate-${data.awardedTo.replace(/\s+/g, "-").toLowerCase()}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const styles = getTemplateStyles(data.template)

  return (
    <div className="space-y-4">
      {/* Certificate */}
      <div className="w-full overflow-x-auto">
        <div
          ref={certificateRef}
          className={`w-[800px] h-[600px] p-12 ${styles.bg} ${styles.border} rounded-lg shadow-2xl relative overflow-hidden mx-auto`}
          style={{ minWidth: "800px", minHeight: "600px" }}
        >
          {/* Background Pattern */}
          <div className={`absolute inset-0 opacity-10 ${styles.pattern}`}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px)`,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          {/* Decorative corners */}
          <div
            className={`absolute top-6 left-6 w-20 h-20 border-t-4 border-l-4 ${styles.decorative} rounded-tl-lg`}
          ></div>
          <div
            className={`absolute top-6 right-6 w-20 h-20 border-t-4 border-r-4 ${styles.decorative} rounded-tr-lg`}
          ></div>
          <div
            className={`absolute bottom-6 left-6 w-20 h-20 border-b-4 border-l-4 ${styles.decorative} rounded-bl-lg`}
          ></div>
          <div
            className={`absolute bottom-6 right-6 w-20 h-20 border-b-4 border-r-4 ${styles.decorative} rounded-br-lg`}
          ></div>

          {/* Additional decorative elements */}
          <div
            className={`absolute top-1/2 left-6 w-1 h-16 ${styles.accent.replace("text-", "bg-")} rounded-full transform -translate-y-1/2`}
          ></div>
          <div
            className={`absolute top-1/2 right-6 w-1 h-16 ${styles.accent.replace("text-", "bg-")} rounded-full transform -translate-y-1/2`}
          ></div>

          {/* Content */}
          <div className="h-full flex flex-col justify-between relative z-10">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className={`text-5xl font-bold ${styles.title} ${styles.titleFont} tracking-wider`}>
                CERTIFICATE OF
              </h1>
              <h2 className={`text-4xl font-bold ${styles.accent} ${styles.titleFont} tracking-wide`}>
                {data.specialization.toUpperCase() || "ACHIEVEMENT"}
              </h2>
              <div className={`w-48 h-1 ${styles.accent.replace("text-", "bg-")} rounded-full mx-auto`}></div>
            </div>

            {/* Main Content */}
            <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
              <p className={`text-xl ${styles.textFont} text-gray-700`}>This is to certify that</p>

              <div className="space-y-2">
                <h3
                  className={`text-5xl font-bold ${styles.accent} ${styles.nameFont} border-b-3 ${styles.decorative} pb-3 inline-block px-8`}
                >
                  {data.awardedTo || "Recipient Name"}
                </h3>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                <p className={`text-lg ${styles.textFont} text-gray-700 leading-relaxed`}>
                  {data.reason ||
                    "has successfully completed the requirements and demonstrated excellence in their field of study."}
                </p>

                {data.organization && (
                  <p className={`text-lg ${styles.textFont} ${styles.accent} font-semibold`}>at {data.organization}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div className="text-left space-y-2">
                <div className={`w-40 h-0.5 ${styles.accent.replace("text-", "bg-")}`}></div>
                <p className={`text-sm ${styles.textFont} text-gray-600`}>Date of Issue</p>
                <p className={`font-bold text-lg ${styles.textFont} ${styles.title}`}>
                  {new Date(data.date || Date.now()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="text-center space-y-2">
                {data.organization && (
                  <p className={`text-sm ${styles.textFont} text-gray-600 mb-2`}>Authorized by {data.organization}</p>
                )}
                {data.signature && (
                  <div className="mb-3">
                    <img
                      src={data.signature || "/placeholder.svg"}
                      alt="Signature"
                      className="h-16 mx-auto"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                )}
                <div className={`w-40 h-0.5 ${styles.accent.replace("text-", "bg-")}`}></div>
                <p className={`font-bold text-lg ${styles.textFont} ${styles.title}`}>
                  {data.certificateGiver || "Certificate Authority"}
                </p>
                <p className={`text-sm ${styles.textFont} text-gray-600`}>Authorized Signatory</p>
              </div>

              <div className="text-right space-y-2">
                <div className={`w-40 h-0.5 ${styles.accent.replace("text-", "bg-")}`}></div>
                <p className={`text-sm ${styles.textFont} text-gray-600`}>Certificate ID</p>
                <p className={`font-bold text-lg ${styles.textFont} ${styles.title}`}>
                  {`CERT-${Date.now().toString().slice(-6)}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={downloadAsJPG}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          disabled={!data.awardedTo || !data.certificateGiver}
        >
          <FileImage className="h-4 w-4 mr-2" />
          Download High-Quality JPG
        </Button>
        <Button
          onClick={downloadAsPDF}
          className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
          disabled={!data.awardedTo || !data.certificateGiver}
        >
          <FileText className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}
