"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

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

        // We have projects + 1 extra card (The "Your Project" CTA)
        const totalSlides = projects.length + 1;

        if (!trigger || !section) return;

        let ctx = gsap.context(() => {

            const scrollTween = gsap.to(section, {
                xPercent: -100 * (totalSlides - 1), // Move horizontally
                ease: "none", // IMPORTANT: "none" ensures strictly linear movement
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top", // Lock when the top of section hits top of screen
                    end: "+=4000",    // Increase this number to make the scroll SLOWER/Longer
                    pin: true,        // Pin the section in place
                    scrub: 1,         // Smooth catch-up (1 second lag) - NOT auto-scroll
                    // snap removed as requested
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
        <section id="projects" ref={triggerRef} className="relative overflow-hidden bg-[#0a0a0a]">

            {/* 1. THE HORIZONTAL STRIP */}
            <div
                ref={sectionRef}
                className="flex h-screen"
                style={{ width: `${(projects.length + 1) * 100}vw` }} // Dynamic Width
            >

                {/* 2. PROJECT SLIDES */}
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="w-screen h-screen flex flex-col justify-center px-6 md:px-24 border-r border-white/5 relative bg-[#0a0a0a]"
                    >
                        {/* Background Number */}
                        <span className="absolute top-4 left-6 md:top-10 md:left-10 text-[15vw] font-serif-display text-white/5 z-0 leading-none select-none">
                            0{index + 1}
                        </span>

                        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                            {/* Text Info */}
                            <div className="order-2 md:order-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 border border-[#FF331F] text-[#FF331F] text-xs font-mono-tech uppercase rounded-full">
                                        {project.category}
                                    </span>
                                    <span className="text-gray-500 font-mono-tech text-xs">{project.year}</span>
                                </div>

                                <h3 className="text-5xl md:text-7xl font-serif-display text-[#e5e5e5] mb-6 leading-[0.9]">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 font-mono-tech text-sm max-w-md mb-8">
                                    {project.description}
                                </p>

                                <button className="group flex items-center gap-2 text-white border-b border-transparent hover:border-white transition-all">
                                    <span className="uppercase tracking-widest text-xs font-mono-tech">View Case Study</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Image Card */}
                            <div className="order-1 md:order-2 h-[40vh] md:h-[60vh] w-full overflow-hidden bg-gray-900 rounded-lg relative">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                            </div>

                        </div>
                    </div>
                ))}

                {/* 3. FINAL CARD: "START YOUR PROJECT" */}
                <div className="w-screen h-screen flex items-center justify-center bg-[#FF331F] relative">
                    <div className="text-center px-4">
                        <h2 className="text-[12vw] md:text-[8vw] font-serif-display text-black leading-none mb-4">
                            Your Project?
                        </h2>
                        <p className="text-black/80 font-mono-tech text-lg md:text-xl max-w-lg mx-auto mb-10">
                            You've seen the archives. Let's build the future.
                        </p>

                        <button
                            onClick={scrollToContact}
                            className="px-10 py-5 bg-black text-white rounded-full text-sm md:text-base font-mono-tech uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            Start Collaboration
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
