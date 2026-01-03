"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Hero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const subTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. INTRO ANIMATION (Cinematic Rise)
            const tl = gsap.timeline();

            // Image fades in and scales down slightly
            tl.fromTo(imageRef.current,
                { opacity: 0, scale: 1.2, filter: "blur(10px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" }
            )
                // "HARRA" text rises up
                .fromTo(".hero-letter",
                    { y: 200, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
                    "-=1"
                )
                // Subtext slides in
                .fromTo(subTextRef.current,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.8 },
                    "-=0.5"
                );

            // 2. MOUSE PARALLAX EFFECT (The "3D" Feel)
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5);
                const yPos = (clientY / window.innerHeight - 0.5);

                // Move Image one way
                gsap.to(imageRef.current, {
                    x: xPos * 30, // Move 30px
                    y: yPos * 30,
                    rotationY: xPos * 2, // Subtle 3D rotation
                    duration: 1,
                    ease: "power2.out"
                });

                // Move Text the OPPOSITE way (creates depth)
                gsap.to(textRef.current, {
                    x: -xPos * 60, // Move 60px (faster than image)
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

            {/* 1. BACKGROUND NOISE (Texture) */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-50"></div>

            {/* 2. THE TEXT LAYER (Background) */}
            <div
                ref={textRef}
                className="absolute z-0 flex flex-col items-center justify-center w-full"
            >
                <h1 className="flex justify-center text-[22vw] md:text-[20vw] font-serif-display leading-none text-[#e5e5e5] tracking-tighter opacity-90 select-none">
                    {/* Split text for staggered animation */}
                    {"HARRA".split("").map((char, i) => (
                        <span key={i} className="hero-letter inline-block">
                            {char}
                        </span>
                    ))}
                </h1>
            </div>

            {/* 3. THE IMAGE LAYER (Middle) 
          Uses mix-blend-difference to invert colors where the image overlaps the text
      */}
            <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                <img
                    ref={imageRef}
                    src="/images/profile.png"
                    alt="Harra Ramos"
                    className="h-[85vh] md:h-[95vh] object-contain mix-blend-normal"
                    style={{
                        filter: "grayscale(100%) contrast(120%) brightness(90%)",
                        // Soft fade at the bottom
                        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                    }}
                />
            </div>

            {/* 4. FOREGROUND INFO (Top Layer) */}
            <div
                ref={subTextRef}
                className="absolute bottom-10 left-10 md:left-20 z-20 flex flex-col items-start"
            >
                <span className="text-[#FF331F] font-mono-tech text-xs tracking-[0.3em] uppercase mb-2">
                    (001) — Profile
                </span>
                <p className="text-gray-400 font-mono-tech text-sm max-w-[250px] leading-relaxed">
                    Full Stack Web Developer & <br />
                    UI/UX Designer based in the Philippines.
                </p>
            </div>

        </section>
    );
};

export default Hero;
