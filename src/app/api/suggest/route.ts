import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { currentScript, platform, tone, title } = await request.json();

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `You are helping write a ${platform} script about "${title}".

Current script so far:
"${currentScript}"

Suggest ONLY the next 1-2 sentences to continue this naturally. 
Tone: ${tone}
Be concise. No explanation. Just the continuation text.`,
        },
      ],
    });

    const suggestion = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ suggestion });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
