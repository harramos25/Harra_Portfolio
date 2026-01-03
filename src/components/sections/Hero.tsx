"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const Hero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const subTextRef = useRef<HTMLDivElement>(null);

    // Scramble Effect Logic
    const [displayText, setDisplayText] = useState("HARRA");
    const targets = "HARRA";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;

        interval = setInterval(() => {
            setDisplayText(
                targets
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return targets[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= targets.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. INTRO ANIMATION (Cinematic Rise)
            const tl = gsap.timeline();

            // Image fades in and scales down slightly
            tl.fromTo(imageRef.current,
                { opacity: 0, scale: 1.2, filter: "blur(10px) grayscale(100%) contrast(140%) brightness(0.8)" },
                { opacity: 0.8, scale: 1, filter: "blur(0px) grayscale(100%) contrast(140%) brightness(0.8)", duration: 1.5, ease: "power2.out" }
            )
                // "HARRA" text rises up
                .fromTo(textRef.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "-=1"
                )
                // Subtext slides in
                .fromTo(subTextRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.5"
                );

            // 2. MOUSE PARALLAX EFFECT
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5);
                const yPos = (clientY / window.innerHeight - 0.5);

                gsap.to(imageRef.current, {
                    x: xPos * 30,
                    y: yPos * 30,
                    rotationY: xPos * 2,
                    duration: 1,
                    ease: "power2.out"
                });

                gsap.to(textRef.current, {
                    x: -xPos * 60,
                    y: -yPos * 40,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center isolate"
        >
            {/* 1. BACKGROUND NOISE */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-50"></div>

            {/* 2. THE IMAGE LAYER (Now treated with CSS Filters & Mask) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <img
                    ref={imageRef}
                    src="/images/profile.png"
                    alt="Harra Ramos"
                    className="h-[90vh] object-cover mix-blend-normal"
                    style={{
                        // High Fashion Contrast
                        filter: "grayscale(100%) contrast(140%) brightness(0.8)",
                        // Fade bottom
                        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
                    }}
                />
            </div>

            {/* 3. THE TEXT LAYER (Mix Blend Difference for Inversion Effect) */}
            <div
                ref={textRef}
                className="relative z-10 mix-blend-difference text-center flex flex-col items-center justify-center w-full"
            >
                <h1 className="text-[22vw] md:text-[20vw] font-serif-display leading-none text-[#e5e5e5] tracking-tighter hover:scale-105 transition-transform duration-700 ease-out cursor-default select-none">
                    {displayText}
                </h1>
            </div>

            {/* 4. FOREGROUND INFO (Red Accent Lines) */}
            <div
                ref={subTextRef}
                className="absolute bottom-10 z-20 flex flex-col items-center"
            >
                <div className="flex justify-center items-center gap-4">
                    <div className="h-[1px] w-12 bg-[#FF331F]"></div>
                    <p className="font-mono-tech text-gray-400 text-xs md:text-sm tracking-[0.3em] uppercase text-center">
                        Full Stack Web Developer & <br className="md:hidden" /> UI/UX Designer
                    </p>
                    <div className="h-[1px] w-12 bg-[#FF331F]"></div>
                </div>
            </div>

            {/* 5. VIGNETTE OVERLAY (Grounding) */}
            <div className="absolute inset-0 pointer-events-none z-20"
                style={{
                    background: "radial-gradient(circle, transparent 40%, #0a0a0a 100%)"
                }}
            ></div>

        </section>
    );
};

export default Hero;
