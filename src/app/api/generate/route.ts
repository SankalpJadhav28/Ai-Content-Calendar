import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { topic, platform, tone, audience, format } = await request.json();

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Generate 5 creative ${format} content ideas for ${platform}.
          
          Topic: ${topic}
          Tone: ${tone}
          Target audience: ${audience || "general audience"}
          
          Format as a numbered list. Each idea:
          - A catchy title (max 6 words)
          - One sentence description
          
          Example format:
          1. Title Here: Description of the idea here.`,
        },
      ],
    });

    const ideas = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ ideas });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
