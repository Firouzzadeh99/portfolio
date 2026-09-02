import { NextRequest, NextResponse } from "next/server";
import { PROFILE_CONTEXT } from "@/data/profile-context";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// "openrouter/free" automatically picks the best free model available right now.
// The free model list changes often, so this is more reliable than hardcoding one.
// To pin a specific model, set OPENROUTER_MODEL in .env.local.
const MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";

const SYSTEM_PROMPT = `
You are an AI assistant for a personal portfolio site. Your job is to answer visitor questions using ONLY the information provided below.

Rules:
- Only use the information below. Don't make anything up or guess.
- If the answer isn't in this info, honestly say you don't know and suggest the visitor reach out directly via the contact info.
- Keep answers short and suitable for a small chat bubble: 2-4 compact sentences by default.
- Avoid long Markdown sections, headings, large bullet lists, and extra blank lines.
- If a list is useful, use at most 3 short bullets with no blank line between bullets.
- Do not dump every skill or project at once. Summarize first, then invite the visitor to ask for details.
- Keep a friendly, concise, professional tone.
- Never include internal moderation or classification labels like "User Safety", "safe", "unsafe", "policy", or similar metadata.
- Don't pretend to BE the portfolio owner — respond as an assistant speaking about them.

Information:
${PROFILE_CONTEXT}
`.trim();

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

function cleanModelReply(reply: string) {
    return reply
        .replace(/^User Safety:\s*(safe|unsafe|unknown)\s*$/gim, "")
        .replace(/^Safety:\s*(safe|unsafe|unknown)\s*$/gim, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const messages: ChatMessage[] = body?.messages ?? [];

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Invalid message" }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "OPENROUTER_API_KEY is not set in .env.local" },
                { status: 500 }
            );
        }

        // Only send the last few messages to keep context short and fast.
        const recentMessages = messages.slice(-12);

        const upstream = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                // OpenRouter recommends these headers for usage tracking (optional but good practice)
                "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
                "X-Title": "Portfolio Chatbot",
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: "system", content: SYSTEM_PROMPT }, ...recentMessages],
                temperature: 0.4,
                max_tokens: 260,
            }),
        });

        if (!upstream.ok) {
            const errText = await upstream.text();
            console.error("OpenRouter error:", upstream.status, errText);
            const errorMessage =
                process.env.NODE_ENV === "development"
                    ? `OpenRouter error ${upstream.status}: ${errText}`
                    : "Failed to reach the AI model. Please try again shortly.";

            return NextResponse.json(
                { error: errorMessage },
                { status: 502 }
            );
        }

        const data = await upstream.json();
        const reply =
            cleanModelReply(data?.choices?.[0]?.message?.content || "") ||
            "Sorry, I couldn't come up with a good answer.";

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("Chat API error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
