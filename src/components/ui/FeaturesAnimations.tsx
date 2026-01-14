'use client';

import { motion } from "motion/react";
import { Search, CheckCircle, Bell } from "lucide-react";

export const AirdropRadar = () => {
    return (
        <div className="relative flex h-full w-full items-center justify-center p-4">
            {/* Radar Circles */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border border-blue-500 rounded-full"
                    style={{ width: i * 80, height: i * 80 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0.2, 0.5, 0.2] }}
                    viewport={{ once: true }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />
            ))}

            {/* Scanning Line */}
            <motion.div
                className="absolute h-[120px] w-[1px] bg-brand/50 origin-bottom"
                style={{ top: 'calc(50% - 120px)' }}
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                viewport={{ once: true }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Center Icon */}
            <div className="relative z-10 card-color p-3 rounded-full border border-brand/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Search className="w-6 h-6 text-brand text-fill-color" />
            </div>

            {/* Blips */}
            <motion.div
                className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.div
                className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
        </div>
    );
};

export const FundingChart = () => {
    return (
        <div className="relative flex h-full w-full items-end justify-center gap-2 p-8 pb-12">
            {[40, 70, 50, 90, 60].map((height, i) => (
                <motion.div
                    key={i}
                    className="w-8 bg-gradient-to-t from-brand/20 to-brand rounded-t-sm relative group text-fill-color"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                >
                    <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] border border-brand/20 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                        ${height}M
                    </motion.div>
                </motion.div>
            ))}

            {/* Trend Line overlay */}
            <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                    d="M 10 100 L 25 60 L 45 30 L 65 50 L 85 10"
                    fill="none"
                    stroke="rgba(5, 254, 142, 0.44)"
                    strokeWidth="0.5"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 1 }}
                />
            </motion.svg>
        </div>
    )
}

export const TokenomicsPie = () => {
    return (
        <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative w-32 h-32">
                <motion.svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {/* Segment 1 */}
                    <motion.circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        whileInView={{ strokeDashoffset: 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    {/* Segment 2 */}
                    <motion.circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        whileInView={{ strokeDashoffset: 200 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        style={{ rotate: 216 }}
                    />
                </motion.svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xl font-bold text-fill-color">60%</span>
                    <span className="text-[10px] text-muted-foreground text-fill-color">Community</span>
                </div>
            </div>
            {/* Floating Labels */}
            <motion.div
                className="absolute text-fill-color top-10 right-10 card-color/80 px-2 py-1 rounded text-xs border border-brand/20 backdrop-blur-sm"
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
            >
                Team 15%
            </motion.div>
            <motion.div
                className="absolute text-fill-color bottom-10 left-10 card-color/80 px-2 py-1 rounded text-xs border border-purple-500/20 backdrop-blur-sm"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
            >
                Investors 25%
            </motion.div>
        </div>
    )
}

export const ClaimSuccess = () => {
    return (
        <div className="relative flex h-full w-full items-center justify-center flex-col gap-4">
            <div className="relative">
                <motion.div
                    className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                    <CheckCircle className="w-8 h-8 text-green-400" />
                </motion.div>

                {/* Ripple Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-green-500/30"
                    initial={{ scale: 1, opacity: 1 }}
                    whileInView={{ scale: 2, opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="card-color border border-border-color px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <Bell className="w-4 h-4 text-brand text-fill-color" />
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-fill-color">Claim Available!</span>
                    <span className="text-[10px] text-muted-foreground text-fill-color">$NWW Tokens Ready</span>
                </div>
                <motion.button
                    className="ml-2 bg-green-500/20 text-white text-[10px] px-2 py-1 rounded text-fill-color"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Claim
                </motion.button>
            </motion.div>
        </div>
    )
}