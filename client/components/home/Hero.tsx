import { useEffect, useRef } from "react";
import { M } from "@/components/ui/motion";

const IMAGES = [
  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
  "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&h=900&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&h=900&q=80",
];

export default function Hero() {
  const slidesRef = useRef<HTMLDivElement>(null);

  // Ensure the slides stack indexes are correct
  useEffect(() => {
    const slides = slidesRef.current?.querySelectorAll("img");
    slides?.forEach((img, i) => (img.style.zIndex = String(100 - i)));
  }, []);

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-10">
        <div className="max-w-xl">
          <M.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow"
          >
            Showcase Your Talent to the World
          </M.h1>
          <M.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 text-lg text-foreground/80"
          >
            ConnectArtist is the premium platform for musicians, singers, and
            performers to create stunning profiles, share their work, and get
            booked.
          </M.p>
          <M.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="/get-started"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-95 transition-opacity"
            >
              Get Started
            </a>
            <a
              href="/discover"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted/40 transition-colors"
            >
              Explore Artists
            </a>
          </M.div>
        </div>
        <div className="relative hidden md:block">
          <div
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const mx = (e.clientX - rect.left) / rect.width - 0.5;
              const my = (e.clientY - rect.top) / rect.height - 0.5;
              el.style.transform = `perspective(1000px) rotateX(${(-my * 2).toFixed(2)}deg) rotateY(${(mx * 2).toFixed(2)}deg) translateZ(0)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
            }}
            className="relative w-full h-[420px] rounded-xl overflow-hidden border border-border shadow-lg transition-transform duration-300 will-change-transform"
          >
            <div ref={slidesRef} className="absolute inset-0">
              {IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  className={`absolute inset-0 w-full h-full object-cover opacity-0 animate-kenburns`}
                  style={{ animationDelay: `${i * 6}s` }}
                  alt="Hero slide"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(157,78,221,0.12),transparent_60%)]" />
    </section>
  );
}
