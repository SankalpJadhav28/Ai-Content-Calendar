import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { posts, ratings, weekStart, weekEnd } = await request.json();

    const postSummary =
      posts.length === 0
        ? "No posts this week."
        : posts
            .map(
              (p: { day: number; platform: string; title: string }) =>
                `Day ${p.day}: ${p.platform} — "${p.title}"`,
            )
            .join("\n");

    const ratingsSummary =
      ratings.length === 0
        ? "No ratings yet."
        : ratings
            .map(
              (r: { title: string; rating: number; notes: string }) =>
                `"${r.title}" — ${r.rating}/5 stars. Notes: ${r.notes || "none"}`,
            )
            .join("\n");

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: `You are a social media strategist reviewing a creator's week (Days ${weekStart}-${weekEnd}).

POSTS THIS WEEK:
${postSummary}

POST RATINGS FROM CREATOR:
${ratingsSummary}

Provide a weekly review with exactly three sections:

SUMMARY: 2 sentences on what this week looked like overall.

GAPS: 1-2 specific gaps or missed opportunities this week.

NEXT WEEK: 3 specific content suggestions for next week based on the gaps and ratings. Be direct and actionable.`,
        },
      ],
    });

    const review = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ review });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
