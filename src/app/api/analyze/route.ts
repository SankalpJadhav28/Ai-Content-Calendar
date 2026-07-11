import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { posts, month, year } = await request.json();

    const postSummary =
      posts.length === 0
        ? "No posts scheduled this month."
        : posts
            .map(
              (p: { day: number; platform: string; title: string }) =>
                `Day ${p.day}: ${p.platform} — "${p.title}"`,
            )
            .join("\n");

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `You are a social media strategist. Analyze this content calendar for ${month} ${year}:

${postSummary}

Give ONE short, specific, actionable recommendation in 2-3 sentences maximum. 
Focus on: posting frequency, platform balance, or timing gaps.
Be direct and specific. No generic advice.
Do not start with "I" or "Here is".`,
        },
      ],
    });

    const recommendation = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ recommendation });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
