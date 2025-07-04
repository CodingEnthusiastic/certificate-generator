"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Upload, Pen } from "lucide-react"

interface SignatureCanvasProps {
  onSignatureChange: (signature: string) => void
}

export default function SignatureCanvas({ onSignatureChange }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [signatureType, setSignatureType] = useState<"draw" | "upload" | "text">("draw")
  const [textSignature, setTextSignature] = useState("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)

    const canvas = canvasRef.current
    if (!canvas) return

    const dataURL = canvas.toDataURL("image/png")
    onSignatureChange(dataURL)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    onSignatureChange("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      onSignatureChange(result)
    }
    reader.readAsDataURL(file)
  }

  const generateTextSignature = () => {
    if (!textSignature.trim()) return

    const canvas = document.createElement("canvas")
    canvas.width = 300
    canvas.height = 100
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#000000"
    ctx.font = "32px cursive"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(textSignature, canvas.width / 2, canvas.height / 2)

    const dataURL = canvas.toDataURL()
    onSignatureChange(dataURL)
  }

  return (
    <div className="space-y-4">
      <Tabs value={signatureType} onValueChange={(value) => setSignatureType(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="draw" className="flex items-center gap-2">
            <Pen className="h-4 w-4" />
            Draw
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              className="border border-gray-200 rounded cursor-crosshair w-full max-w-md"
              style={{ touchAction: "none" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          <Button onClick={clearCanvas} variant="outline" className="w-full bg-transparent">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Signature
          </Button>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div>
            <Label htmlFor="signature-upload" className="text-sm font-medium text-gray-700">
              Upload Signature Image
            </Label>
            <Input id="signature-upload" type="file" accept="image/*" onChange={handleFileUpload} className="mt-1" />
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div>
            <Label htmlFor="text-signature" className="text-sm font-medium text-gray-700">
              Type Your Signature
            </Label>
            <Input
              id="text-signature"
              placeholder="Enter your name"
              value={textSignature}
              onChange={(e) => setTextSignature(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button onClick={generateTextSignature} className="w-full" disabled={!textSignature.trim()}>
            Generate Text Signature
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
