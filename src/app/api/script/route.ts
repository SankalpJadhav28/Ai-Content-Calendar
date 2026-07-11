import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { title, description, platform, tone, currentScript } =
      await request.json();

    const platformInstructions: Record<string, string> = {
      Instagram: `Write a complete Instagram Reel script with:
- HOOK: First 1-2 punchy lines (under 10 words, bold claim or question)
- VOICEOVER: Full spoken script for the reel (30-60 seconds when read aloud)
- CAPTION: Under 150 characters, conversational
- HASHTAGS: 8-10 relevant hashtags`,

      YouTube: `Write a complete YouTube video script with:
- TITLE: Optimized clickable title
- HOOK: First 30 seconds to stop the scroll
- INTRO: Brief channel intro and what viewer will learn
- SECTIONS: 3-5 main content sections with headers
- OUTRO: Call to action and subscribe reminder
- DESCRIPTION: SEO optimized video description`,

      LinkedIn: `Write a complete LinkedIn post with:
- HOOK: First line that stops the scroll (no "I am excited to share")
- BODY: 4-6 short paragraphs, one idea each, with line breaks
- INSIGHT: One key takeaway
- CTA: Engaging question to drive comments
- HASHTAGS: 3-5 professional hashtags`,

      Facebook: `Write a complete Facebook post with:
- HOOK: Attention grabbing opening line
- STORY: Personal narrative format, conversational tone
- VALUE: Key insight or lesson
- ENGAGEMENT: Question or poll idea to drive comments
- HASHTAGS: 3-5 hashtags`,
    };

    const prompt = currentScript
      ? `You are a social media content writer. The user is writing a ${platform} script about "${title}".

Their current draft:
"${currentScript}"

Continue and improve this script. ${platformInstructions[platform] || platformInstructions["Instagram"]}

Tone: ${tone}
Original idea: ${description}

Complete the full script maintaining their voice and style.`
      : `You are a social media content writer. Write a complete ${platform} script for this idea:

Title: ${title}
Description: ${description}
Tone: ${tone}

${platformInstructions[platform] || platformInstructions["Instagram"]}

Make it engaging, authentic and ready to use.`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const script = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ script });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
