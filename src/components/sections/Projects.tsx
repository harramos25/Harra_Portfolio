"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "NCIP Job Portal",
        year: "2024",
        category: "System",
        img: "/images/ncip.png",
        description: "Government recruitment system with automated filtering."
    },
    {
        title: "D'Marsians System",
        year: "2025",
        category: "Analytics",
        img: "/images/dmars.png",
        description: "Real-time student progress tracking dashboard."
    },
    {
        title: "FoodTrack Sales",
        year: "2025",
        category: "Mobile",
        img: "/images/foodtrack.png",
        description: "Inventory and sales management for mobile devices."
    },
    {
        title: "PawPointment",
        year: "2026",
        category: "App",
        img: "/images/paw.png",
        description: "Veterinary appointment scheduler with flutter."
    },
];

const Projects = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        // Calculate total width of the horizontal strip
        // We have projects + 1 extra card (The "Your Project" CTA)
        // We have projects + 1 extra card (The "Your Project" CTA)
        const totalSlides = projects.length + 1;

        if (!trigger) return;

        let ctx = gsap.context(() => {

            const scrollTween = gsap.to(section, {
                xPercent: -100 * (totalSlides - 1), // Move left by (total slides - 1 screens)
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top", // Snaps the top of the container to the top of screen
                    end: "+=3000", // Makes the scroll area 3000px long (adjust for speed)
                    pin: true,     // Locks the section in place
                    scrub: 1,      // Smooth scrubbing
                    snap: 1 / (totalSlides - 1), // Optional: Snaps to each slide
                },
            });

        }, trigger);

        return () => ctx.revert();
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="projects" ref={triggerRef} className="overflow-hidden bg-[#0a0a0a]">
            {/* The Container that moves horizontally.
         We set width to (100 * slides)% to fit them all side-by-side
      */}
            <div
                ref={sectionRef}
                className="flex h-screen w-[500vw]" // 4 projects + 1 CTA = 500vw
            >

                {/* --- MAP THROUGH PROJECTS --- */}
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="w-screen h-screen flex flex-col justify-center px-8 md:px-20 border-r border-white/5 relative"
                    >
                        {/* Background Number */}
                        <span className="absolute top-10 left-10 text-[10vw] font-serif-display text-white/5 z-0">
                            0{index + 1}
                        </span>

                        <div className="relative z-10 w-full max-w-4xl">
                            <p className="text-[#FF331F] font-mono-tech text-sm tracking-widest mb-4 uppercase">
                                {project.category} — {project.year}
                            </p>

                            <h3 className="text-6xl md:text-8xl font-serif-display text-[#e5e5e5] mb-8 leading-none">
                                {project.title}
                            </h3>

                            {/* Project Image Card */}
                            <div className="w-full h-[40vh] md:h-[50vh] bg-gray-800 overflow-hidden relative group cursor-pointer">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="px-6 py-3 border border-white text-white rounded-full font-mono-tech text-sm uppercase">
                                        View Case Study
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- FINAL CARD: THE "YOUR PROJECT" CTA --- */}
                <div className="w-screen h-screen flex items-center justify-center bg-[#FF331F] relative">
                    <div className="text-center">
                        <h2 className="text-6xl md:text-9xl font-serif-display text-black mb-6">
                            Your Project?
                        </h2>
                        <p className="text-black/80 font-mono-tech text-xl max-w-md mx-auto mb-10">
                            You've seen what I can build. Let's create the next big thing together.
                        </p>

                        <button
                            onClick={scrollToContact}
                            className="px-12 py-6 bg-black text-white rounded-full text-lg font-mono-tech uppercase tracking-widest hover:scale-110 transition-transform duration-300"
                        >
                            Start Now
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
