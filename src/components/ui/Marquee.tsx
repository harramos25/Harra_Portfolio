"use client";

import { motion } from "framer-motion";

const MARQUEE_TEXT = "FULL STACK — UI/UX — CREATIVE DEV — ";

export default function Marquee() {
    return (
        <div className="w-full overflow-hidden bg-[#FF331F] py-3 relative z-30">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
                >
                    <span className="text-black font-mono-tech font-bold text-lg md:text-xl tracking-tight mx-4">
                        {MARQUEE_TEXT.repeat(10)}
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
