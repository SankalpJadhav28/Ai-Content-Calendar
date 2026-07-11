import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { weeklyReview, ratings, month } = await request.json();

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `You are a social media strategist. Based on this week's review, create a next week content plan.

WEEKLY REVIEW:
${weeklyReview}

POST RATINGS:
${ratings.map((r: { title: string; rating: number }) => `"${r.title}" — ${r.rating}/5`).join("\n")}

Respond ONLY with a JSON object in this exact format, no other text:
{
  "schedule": [
    { "day": "Monday", "platform": "Instagram", "format": "Reel", "idea": "Short idea title", "reason": "One sentence why" },
    { "day": "Wednesday", "platform": "YouTube", "format": "Short", "idea": "Short idea title", "reason": "One sentence why" },
    { "day": "Thursday", "platform": "LinkedIn", "format": "Post", "idea": "Short idea title", "reason": "One sentence why" },
    { "day": "Saturday", "platform": "Instagram", "format": "Carousel", "idea": "Short idea title", "reason": "One sentence why" }
  ],
  "focus": "One sentence overall focus for next week"
}`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const plan = JSON.parse(clean);
    return NextResponse.json({ plan });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
