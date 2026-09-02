"use client";

import Section from "@/components/layout/section";
import SectionHeader from "@/components/layout/section-header";
import { contactData } from "@/data/contact";
import ContactUsLottie from "@/components/icon/ContactUsLottie";
import { BlurFade } from "@/components/ui/blur-fade";

import { ComponentType } from "react";

type ContactItem = {
    label: string;
    value: string;
    icon: ComponentType<{ className?: string }>;
    href: string;
};

const ContactCard = ({ item }: { item: ContactItem }) => {
    const Icon = item.icon;

    return (
        <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 glass-card "
        >
            <div className="p-1 md:p-3 rounded-lg bg-blue-100/70 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Icon className="text-xl" />
            </div>

            <div>
                <div className="text-xs text-slate-500 dark:text-gray-400 tracking-wider">
                    {item.label}
                </div>
                <div className="text-slate-900 font-medium dark:text-white">
                    {item.value}
                </div>
            </div>
        </a>
    );
};

export default function Contact() {
    return (
        <Section
            id="contact"
            className="h-full md:min-h-screen w-full  md:scroll-mt-28"
        >
            <SectionHeader
                title="04 - CONTACT"
                subtitle="Let's build something together."
                highlightWord="together"
            />
            <BlurFade delay={0.005 * 1} inView>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-10 max-w-6xl mx-auto max-md:mb-6">
                    <div className="w-full lg:w-1/3">
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 md:gap-4">
                            {contactData.contact.map((item, i) => (
                                <ContactCard key={i} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 flex items-center justify-center">
                        <ContactUsLottie className="size-full" />
                    </div>
                </div>
            </BlurFade>
        </Section>
    );
}
