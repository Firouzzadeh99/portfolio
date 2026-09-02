import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ChatbotWidget from "@/components/layout/chatbot-widget";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { BackgroundOrbs } from "@/components/layout/background-orbs";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://firouzzadeh99.github.io/portfolio/"),
    title: {
        default: "Masoumeh Firouzzadeh | Full-Stack Developer",
        template: "%s | Masoumeh Firouzzadeh",
    },
    description:
        "Personal portfolio of Masoumeh Firouzzadeh, a Full-Stack Developer specializing in Next.js, React, and TypeScript. Explore my projects, skills, and experience.",
    keywords: [
        "Masoumeh Firouzzadeh",
        "Full Stack Developer",
        "Next.js Developer",
        "React Developer",
        "TypeScript Developer",
        "Frontend Developer",
        "Web Developer Portfolio",
        "Software Engineer",
    ],
    authors: [{ name: "Masoumeh Firouzzadeh", url: "https://firouzzadeh99.github.io/portfolio/" }],
    creator: "Masoumeh Firouzzadeh",
    publisher: "Masoumeh Firouzzadeh",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://firouzzadeh99.github.io/portfolio/",
    },
    openGraph: {
        title: "Masoumeh Firouzzadeh | Full-Stack Developer",
        description:
            "Personal portfolio of Masoumeh Firouzzadeh, a Full-Stack Developer specializing in Next.js, React, and TypeScript.",
        url: "https://firouzzadeh99.github.io/portfolio/",
        siteName: "Masoumeh Firouzzadeh",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Masoumeh Firouzzadeh - Full-Stack Developer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Masoumeh Firouzzadeh | Full-Stack Developer",
        description:
            "Personal portfolio of Masoumeh Firouzzadeh, a Full-Stack Developer specializing in Next.js, React, and TypeScript.",
        images: ["/og-image.png"],
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html
                lang="en"
                className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
                suppressHydrationWarning
            >
                <body className="flex flex-col">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="theme-preference"
                    >
                        <SmoothScrollProvider>
                            {" "}
                            <BackgroundOrbs />
                            <Navbar />
                            <MobileNavbar />
                            {children}
                            {/* <ChatbotWidget
                                title="Ask about Masoumeh Firouzzadeh"
                                subtitle="Powered by OpenRouter"
                            /> */}
                        </SmoothScrollProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
