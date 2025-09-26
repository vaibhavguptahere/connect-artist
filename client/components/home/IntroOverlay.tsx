import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VIDEO_SOURCES = [
  // Royalty‑free studio/music related clips
  "https://videos.pexels.com/video-files/2114411/2114411-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/856649/856649-hd_1920_1080_30fps.mp4",
];

const POSTER =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80";

export default function IntroOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("intro:dismissed");
      if (!dismissed) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    const el = document.body;
    if (open) {
      el.classList.add("overflow-hidden");
    } else {
      el.classList.remove("overflow-hidden");
    }
    return () => {
      el.classList.remove("overflow-hidden");
    };
  }, [open]);

  const dismiss = () => {
    try {
      localStorage.setItem("intro:dismissed", "1");
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
        poster={POSTER}
        aria-hidden
      >
        {VIDEO_SOURCES.map((src) => (
          <source key={src} src={src} type="video/mp4" />
        ))}
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(157,78,221,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-background/70" />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <h1 className="opacity-0 animate-fade-in-up font-serif text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Enter the Artist World
          </h1>
          <p className="opacity-0 animate-fade-in-up [animation-delay:120ms] mt-4 text-base sm:text-lg text-foreground/85">
            Discover, book, and support incredible talent across every genre.
          </p>
          <div className="opacity-0 animate-fade-in-up [animation-delay:220ms] mt-8 flex items-center justify-center gap-3">
            <button
              onClick={dismiss}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm sm:text-base font-semibold text-primary-foreground shadow hover:opacity-95 transition"
            >
              Enter Now
            </button>
            <Link
              to="/discover"
              onClick={dismiss}
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm sm:text-base hover:bg-muted/40 transition"
            >
              Explore Artists
            </Link>
          </div>
        </div>
      </div>

      {/* Skip control (top-right) */}
      <button
        onClick={dismiss}
        aria-label="Skip intro"
        className="absolute top-4 right-4 z-10 rounded-full border border-border/60 bg-background/60 backdrop-blur px-3 py-1.5 text-xs text-foreground/80 hover:bg-background/80"
      >
        Skip
      </button>
    </div>
  );
}
