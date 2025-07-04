import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_API_KEY = "AIzaSyAaZooWxlIEf6-_nI61YZyKDMHsn6lj4Nk"

export async function POST(request: NextRequest) {
  try {
    const { specialization, reason } = await request.json()

    if (!specialization || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Using Google's Generative AI API to enhance the certificate text
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Please enhance this certificate description to make it more professional and impactful. 
            
            Specialization: ${specialization}
            Current reason: ${reason}
            
            Please provide a more formal, professional version that would be appropriate for a certificate. Keep it concise but impactful (2-3 sentences maximum). Focus on achievement and excellence.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error("Failed to enhance certificate text")
    }

    const data = await response.json()
    const enhancedReason = data.candidates?.[0]?.content?.parts?.[0]?.text || reason

    return NextResponse.json({ enhancedReason })
  } catch (error) {
    console.error("Error enhancing certificate:", error)
    return NextResponse.json({ error: "Failed to enhance certificate" }, { status: 500 })
  }
}
