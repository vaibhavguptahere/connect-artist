import {
  CreditCard,
  ShieldCheck,
  Star,
  Users2,
  Rocket,
  Undo2,
  AlarmClock,
} from "lucide-react";

const items = [
  {
    title: "Fast Booking",
    desc: "Experience the most secure way to find and book the perfect entertainer for any occasion. Our platform ensures a seamless and fast booking process, giving you peace of mind.",
    Icon: Rocket,
  },
  {
    title: "No Hidden Charges",
    desc: "Transparency is our priority. Book on our platform without worrying about additional charges. We believe in straightforward and honest pricing.",
    Icon: Star,
  },
  {
    title: "Artist Management",
    desc: "From booking to performance, we ensure we meet all your expectations. Our team coordinates with artists for a seamless experience.",
    Icon: Users2,
  },
  {
    title: "Easy Cancellation",
    desc: "Plans change—we get it. Enjoy the flexibility and convenience of hassle‑free cancellations with a simple, clear policy.",
    Icon: Undo2,
  },
  {
    title: "Last‑Minute Backups",
    desc: "The show must go on. We guarantee efficient last‑minute backup options so your celebration never stops due to cancellations or interruptions.",
    Icon: AlarmClock,
  },
  {
    title: "Secure Payment Gateway",
    desc: "We prioritize your security. Book with confidence through our secure payment gateways that protect your financial transactions end‑to‑end.",
    Icon: CreditCard,
    footer: true,
  },
] as const;

import { M } from "@/components/ui/motion";

export default function Benefits() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow">
          Why Book With Us
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ title, desc, Icon, footer }, i) => (
            <M.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-border bg-card/60 backdrop-blur px-5 py-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background/60 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
              {footer && (
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-foreground/70">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Safe |
                    Sound Secure
                  </span>
                  <a
                    className="inline-flex items-center gap-1 text-primary hover:opacity-90"
                    href="#reviews"
                    aria-label="View Reviews"
                  >
                    View Reviews <span aria-hidden>→</span>
                  </a>
                </div>
              )}
            </M.article>
          ))}
        </div>
      </div>
    </section>
  );
}
