'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import HighlightText from './ui/HighlightText';

const faqs = [
    {
        question: "What is Nww Airdrop?",
        answer: "Nww Airdrop is a platform that helps you discover, track, and claim the latest crypto airdrops. We provide in-depth project data, tokenomics, and step-by-step guides to maximize your chances of getting token allocations."
    },
    {
        question: "Is this service free?",
        answer: "Yes, basic airdrop tracking features and guides are available for free to the community. We believe airdrop information should be accessible to everyone."
    },
    {
        question: "How do I participate in an airdrop?",
        answer: "Each airdrop has unique requirements. On every project detail page, we provide an eligibility checklist and specific steps (such as interacting with testnets, swapping, or joining communities) that you need to complete."
    },
    {
        question: "When is the airdrop data updated?",
        answer: "Our team updates airdrop data in real-time every day. Claim statuses, funding news, and requirement changes are monitored constantly to ensure you don't miss important information."
    },
    {
        question: "Do I need to login to use the platform?",
        answer: "No, you don't need to login. You can access all airdrop listings, guides, and data completely free without creating an account."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative py-20 overflow-hidden">
            <div className="relative z-10 container mx-auto px-4 text-center">

                {/* Badge */}
                <span className="relative mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium glass-card">
                    <HelpCircle className="text-blue-400 w-4 h-4" />
                    <span className="text-fill-color">FAQ</span>
                </span>

                {/* Title */}
                <h2 className="mb-4 text-center text-2xl font-extrabold text-fill-color sm:text-4xl xl:text-5xl">
                    Frequently Asked <HighlightText text="Questions" inView />
                </h2>

                {/* Description */}
                <p className="mx-auto mb-16 max-w-[714px] font-medium text-fill-color/70">
                    Answers to common questions about Nww Airdrop.
                </p>

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto text-left flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            className={`glass-1 card-color rounded-xl overflow-hidden transition-colors duration-500 ${openIndex === index ? 'glass-2 border-brand/30' : 'hover:glass-2'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                            >
                                <span className="text-lg font-semibold text-fill-color pr-8">{faq.question}</span>
                                <div className="flex-shrink-0 text-brand text-fill-color">
                                    {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 text-fill-color/70 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}