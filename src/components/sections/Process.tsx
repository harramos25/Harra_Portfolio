"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { ScanSearch, PenTool, Terminal, ShieldCheck, Rocket } from "lucide-react";

const processSteps = [
    {
        id: "01",
        title: "Discovery",
        description: "Analyzing requirements and defining the strategic roadmap.",
        icon: ScanSearch
    },
    {
        id: "02",
        title: "Design",
        description: "Crafting high-fidelity aesthetics and intuitive user experiences.",
        icon: PenTool
    },
    {
        id: "03",
        title: "Development",
        description: "Building scalable, clean code using modern tech stacks.",
        icon: Terminal
    },
    {
        id: "04",
        title: "Quality",
        description: "Rigorous testing for performance, security, and responsiveness.",
        icon: ShieldCheck
    },
    {
        id: "05",
        title: "Launch",
        description: "Deployment, monitoring, and iterative improvements.",
        icon: Rocket
    }
];

const Process = () => {
    const carouselRef = useRef<HTMLDivElement>(null);

    // Physics for Skew Effect
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);
    const xSkew = useTransform(xVelocity, [-1000, 1000], [10, -10]);
    const skewSpring = useSpring(xSkew, { mass: 0.1, stiffness: 200, damping: 20 });

    return (
        <section className="py-32 bg-[#0a0a0a] text-[#e5e5e5] border-t border-white/10 overflow-hidden">

            {/* Header */}
            <div className="px-6 md:px-12 mb-16">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-2 h-2 bg-[#FF331F] rounded-full"></span>
                    <span className="font-mono-tech text-xs text-gray-400 uppercase tracking-widest">
                        Workflow
                    </span>
                </div>
                <h2 className="font-serif-display text-5xl md:text-7xl uppercase">
                    The Process
                </h2>
                <div className="flex items-center gap-2 mt-4 text-gray-500 font-mono-tech text-xs tracking-widest">
                    <span>(DRAG TO NAVIGATE)</span>
                    <span className="text-[#FF331F]">→</span>
                </div>
            </div>

            {/* Draggable Carousel Area */}
            <div ref={carouselRef} className="pl-6 md:pl-12 cursor-grab active:cursor-grabbing perspective-1000">
                <motion.div
                    className="flex gap-8 w-fit pr-12"
                    drag="x"
                    dragConstraints={{ right: 0, left: -600 }} // Adjusted for 5 cards
                    style={{ x, skewX: skewSpring }}
                    whileTap={{ scale: 0.98 }}
                >
                    {processSteps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative w-[300px] md:w-[350px] h-[400px] bg-[#111] border border-white/10 p-8 flex flex-col justify-between group hover:border-[#FF331F] hover:bg-white/5 transition-all duration-500 shrink-0 select-none backdrop-blur-sm"
                        >
                            {/* Background Number */}
                            <span className="absolute top-4 right-6 font-serif-display text-8xl text-white/5 group-hover:text-[#FF331F]/10 transition-colors duration-500">
                                {step.id}
                            </span>

                            {/* Top Content */}
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 text-[#e5e5e5] group-hover:bg-[#FF331F] group-hover:border-[#FF331F] group-hover:text-black transition-all duration-500">
                                    <step.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif-display text-3xl mb-4 group-hover:text-white transition-colors">
                                    {step.title}
                                </h3>
                            </div>

                            {/* Bottom Content */}
                            <div className="relative z-10">
                                <div className="w-8 h-[1px] bg-[#FF331F] mb-4 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <p className="font-mono-tech text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* End Spacer */}
                    <div className="w-[5vw]"></div>
                </motion.div>
            </div>

        </section>
    );
};

export default Process;
