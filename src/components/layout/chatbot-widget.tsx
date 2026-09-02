/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import useSound from "use-sound";
import { assetPath } from "@/lib/asset-path";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const DEFAULT_SUGGESTIONS = [
    "What are your core technical skills?",
    "Tell me about your projects",
    "How can I get in touch with you?",
];

interface ChatbotWidgetProps {
    title?: string;
    subtitle?: string;
    placeholder?: string;
    suggestions?: string[];
}

export default function ChatbotWidget({
    title = "Ask me anything",
    subtitle = "Portfolio AI assistant",
    placeholder = "Ask anything...",
    suggestions = DEFAULT_SUGGESTIONS,
}: ChatbotWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showHint, setShowHint] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const hintRef = useRef<HTMLDivElement | null>(null);
    const [hasTriggeredHint, setHasTriggeredHint] = useState(false);

    const [playDing] = useSound(assetPath("/ding.mp3"), {
        volume: 0.5,
        onerror: () => console.log("Sound file not found"),
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            if (
                (widgetRef.current && widgetRef.current.contains(target)) ||
                (buttonRef.current && buttonRef.current.contains(target))
            ) {
                return;
            }

            if (isOpen) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        }

        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    useEffect(() => {
        if (hasTriggeredHint) return;

        const trigger = () => {
            setHasTriggeredHint(true);
            setShowHint(true);

            playDing();
        };

        window.addEventListener("scroll", trigger, { once: true });
        window.addEventListener("click", trigger, { once: true });

        return () => {
            window.removeEventListener("scroll", trigger);
            window.removeEventListener("click", trigger);
        };
    }, [hasTriggeredHint, playDing]);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isLoading]);

    async function sendMessage(text: string) {
        const content = text.trim();
        if (!content || isLoading) return;

        const nextMessages: ChatMessage[] = [
            ...messages,
            { role: "user", content },
        ];
        setMessages(nextMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: nextMessages }),
            });

            const data = await res.json();

            if (!res.ok)
                throw new Error(data?.error || "Failed to get a response");

            const reply = String(data.reply || "").replace(/\n{3,}/g, "\n\n");

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: reply },
            ]);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong, please try again.";

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: message,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
        setShowHint(false);
    };

    return (
        <>
            <div className="fixed bottom-3 md:bottom-6 right-6 z-50">
                {showHint && !isOpen && (
                    <motion.div
                        ref={hintRef}
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 22,
                        }}
                        className="fixed bottom-22 right-6 z-50"
                    >
                        <div
                            data-lenis-prevent
                            className="relative bg-white dark:bg-slate-900 border border-cyan-500/30 dark:border-cyan-500/20 rounded-2xl rounded-br-sm px-4 py-3 shadow-xl shadow-cyan-500/10 dark:shadow-primary/10 max-w-60"
                        >
                            <button
                                onClick={() => {
                                    setShowHint(false);
                                }}
                                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gray-200 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white flex items-center justify-center transition-colors"
                                aria-label="Dismiss"
                            >
                                <X className="size-3" />
                            </button>

                            <div className="mb-1.5 flex items-center gap-2">
                                <Sparkles className="size-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                                <span className="text-base font-bold leading-tight tracking-wide text-gray-900 dark:text-white">
                                    Ask Ali&apos;s AI
                                </span>
                            </div>

                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                Get quick answers about projects, skills, and
                                experience.
                            </p>

                            <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white dark:bg-slate-900 border-r border-b border-cyan-500/30 dark:border-cyan-500/20 rotate-45" />
                        </div>
                    </motion.div>
                )}

                <button
                    ref={buttonRef}
                    onClick={toggleChat}
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                    className="group relative flex h-10 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-3 text-white shadow-lg shadow-cyan-500/40 ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                    <span className="absolute inset-0 animate-pulse rounded-full bg-white/10" />
                    <Bot
                        size={20}
                        className="relative z-10 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    />
                    <span className="relative z-10 text-sm font-semibold text-white">
                        Ask AI About Me
                    </span>
                </button>
            </div>

            {isOpen && (
                <div
                    ref={widgetRef}
                    className="fixed bottom-24 right-6 z-50 flex h-130 w-90 max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-cyan-500/30 dark:border-cyan-500/20 bg-white dark:bg-slate-950 shadow-2xl shadow-cyan-500/10 dark:shadow-cyan-500/5"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-white/5 px-4 py-3 bg-gray-50/80 dark:bg-slate-950/95">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
                                <Bot size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                    {title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-slate-400">
                                    {subtitle}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 dark:text-slate-400 transition hover:text-gray-700 dark:hover:text-white"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        data-lenis-prevent
                        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3 bg-gray-50/50 dark:bg-slate-950/80"
                    >
                        {messages.length === 0 && (
                            <div className="space-y-2">
                                <div className="rounded-lg border border-amber-300/60 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                                    If you are in Iran, please use a VPN before
                                    asking the AI assistant.
                                </div>
                                <p className="text-[11px] text-gray-400 dark:text-slate-500">
                                    // suggested questions
                                </p>
                                {suggestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="block w-full rounded-lg border border-gray-200/80 dark:border-white/5 bg-white dark:bg-white/3 px-3 py-2 text-left text-sm text-gray-700 dark:text-slate-200 transition hover:border-cyan-400/50 dark:hover:border-cyan-500/30 hover:bg-cyan-50/50 dark:hover:bg-white/6"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <div
                                key={i}
                                dir={
                                    m.role === "assistant" &&
                                    /[\u0600-\u06FF]/.test(m.content)
                                        ? "rtl"
                                        : "ltr"
                                }
                                className={`max-w-[82%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-snug ${
                                    m.role === "user"
                                        ? "ml-auto bg-cyan-600/20 dark:bg-cyan-500/15 text-gray-800 dark:text-cyan-50"
                                        : "mr-auto bg-gray-200/80 dark:bg-white/5 text-gray-800 dark:text-slate-200"
                                }`}
                            >
                                {m.role === "assistant" ? (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            a: ({ node, ...props }) => (
                                                <a
                                                    {...props}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyan-600 dark:text-cyan-400 underline hover:text-cyan-800 dark:hover:text-cyan-300"
                                                />
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code
                                                    {...props}
                                                    className="bg-gray-300/50 dark:bg-white/10 rounded px-1 py-0.5 text-gray-800 dark:text-gray-200"
                                                />
                                            ),
                                            p: ({ node, ...props }) => (
                                                <p
                                                    {...props}
                                                    className="mb-2 last:mb-0"
                                                />
                                            ),
                                            ul: ({ node, ...props }) => (
                                                <ul
                                                    {...props}
                                                    className="mb-2 list-disc space-y-1 pl-4 last:mb-0"
                                                />
                                            ),
                                            ol: ({ node, ...props }) => (
                                                <ol
                                                    {...props}
                                                    className="mb-2 list-decimal space-y-1 pl-4 last:mb-0"
                                                />
                                            ),
                                            li: ({ node, ...props }) => (
                                                <li
                                                    {...props}
                                                    className="pl-1 leading-snug marker:text-cyan-600 dark:marker:text-cyan-300 [&>p]:mb-0"
                                                />
                                            ),
                                            strong: ({ node, ...props }) => (
                                                <strong
                                                    {...props}
                                                    className="font-semibold text-gray-900 dark:text-white"
                                                />
                                            ),
                                        }}
                                    >
                                        {m.content}
                                    </ReactMarkdown>
                                ) : (
                                    m.content
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div
                                className="mr-auto flex w-fit items-center gap-1.5 rounded-xl bg-gray-200/80 px-3 py-3 dark:bg-white/5"
                                aria-label="AI assistant is typing"
                            >
                                <span className="size-1.5 animate-bounce rounded-full bg-cyan-600 dark:bg-cyan-300" />
                                <span className="size-1.5 animate-bounce rounded-full bg-cyan-600 [animation-delay:120ms] dark:bg-cyan-300" />
                                <span className="size-1.5 animate-bounce rounded-full bg-cyan-600 [animation-delay:240ms] dark:bg-cyan-300" />
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage(input);
                        }}
                        className="flex items-center gap-2 border-t border-gray-200/80 dark:border-white/5 p-3 bg-white dark:bg-slate-950/95"
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 rounded-lg border border-gray-300 dark:border-white/10 bg-gray-100/80 dark:bg-white/3 px-3 py-2 text-sm text-gray-800 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:border-cyan-400 dark:focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-400/30 dark:focus:ring-cyan-500/20"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white transition disabled:opacity-40 disabled:hover:bg-cyan-600 dark:disabled:hover:bg-cyan-500 shadow-lg shadow-cyan-500/30 dark:shadow-cyan-500/20"
                            aria-label="Send"
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
