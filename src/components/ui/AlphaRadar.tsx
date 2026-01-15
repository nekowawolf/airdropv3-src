"use client";

import { motion } from "motion/react";

export const AlphaRadar = () => {
    return (
        <div className="relative w-full max-w-3xl mx-auto h-[300px] sm:h-[400px] flex items-center justify-center">
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient
                        id="line-gradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="100"
                    >
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <ConnectionPath startX={8} startY={14} endX={50} endY={50} controlX1={33} controlY1={14} controlX2={33} controlY2={50} delay={0} />
                <ConnectionPath startX={87} startY={14} endX={50} endY={50} controlX1={62} controlY1={14} controlX2={62} controlY2={50} delay={0.5} />
                <ConnectionPath startX={7} startY={74} endX={50} endY={50} controlX1={32} controlY1={74} controlX2={32} controlY2={50} delay={1} />
                <ConnectionPath startX={87} startY={74} endX={50} endY={50} controlX1={62} controlY1={74} controlX2={62} controlY2={50} delay={1.5} />
            </svg>

            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center rounded-2xl bg-slate-950 border border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.25)]">
                    <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full" />

                    <img
                        src="https://nekowawolf.github.io/cdn-images/images/2026/1768368937_logo.jpg"
                        alt="Central Hub"
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover relative z-10"
                    />

                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent z-20 rounded-2xl"
                        initial={{ top: "-100%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-500 rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-500 rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-blue-500 rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-500 rounded-br-lg" />
                </div>
            </motion.div>
        </div>
    );
};

const ConnectionPath = ({
    startX,
    startY,
    endX,
    endY,
    controlX1,
    controlY1,
    controlX2,
    controlY2,
    delay,
}: any) => {
    const pathD = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

    return (
        <g>
            <path
                d={pathD}
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="1"
            />

            <motion.path
                d={pathD}
                fill="none"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 1.5,
                    delay,
                    ease: "easeInOut",
                }}
            />

            <motion.path
                d={pathD}
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.1 30"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -200 }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay,
                }}
                className="opacity-70"
            />
        </g>
    );
};