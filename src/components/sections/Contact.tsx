import { Button } from "@/components/ui/Button";
import { Mail, Phone, Linkedin, Github, Instagram } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="min-h-screen bg-[#FF331F] text-black flex flex-col justify-between p-6 relative z-50">

            <div className="flex justify-between items-start font-mono-tech uppercase text-xs md:text-sm tracking-widest border-b border-black/20 pb-4">
                <div>(004)</div>
                <div>Contact</div>
                <div>Available for Work</div>
            </div>

            <div className="flex flex-col gap-8 md:gap-0 md:flex-row justify-between md:items-end my-12 md:my-0">
                <div className="font-mono-tech space-y-4 text-sm md:text-base">
                    <p className="opacity-60">Say Hello</p>
                    <a href="mailto:harra.ramos26@gmail.com" className="block text-xl md:text-2xl font-bold hover:underline">harra.ramos26@gmail.com</a>
                    <p className="block text-xl md:text-2xl font-bold">+63 969 576 0837</p>
                </div>

                <div className="flex gap-4 font-mono-tech text-sm md:text-base">
                    {["LinkedIn", "GitHub", "Instagram", "WhatsApp"].map((social) => (
                        <a key={social} href="#" className="border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors uppercase">
                            {social}
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-auto">
                <h2 className="text-[14vw] leading-[0.8] font-serif-display font-medium tracking-tighter text-center md:text-left mix-blend-multiply">
                    GET IN <br /> TOUCH
                </h2>
            </div>

            <div className="flex justify-between items-end font-mono-tech text-xs uppercase opacity-50 mt-8">
                <p>&copy; 2026 HARRA</p>
                <p>Designed in Philippines</p>
            </div>
        </section>
    );
}
