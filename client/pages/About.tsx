import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  Globe2,
  Lightbulb,
  Handshake,
} from "lucide-react";

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setInView(true));
      },
      options ?? { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return { ref, inView } as const;
}

function useCountUp(target: number, run: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setValue(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return value.toLocaleString();
}

export default function About() {
  const missionInView = useInView<HTMLDivElement>({ threshold: 0.5 });
  const c1 = useCountUp(25000, missionInView.inView);
  const c2 = useCountUp(120, missionInView.inView);
  const c3 = useCountUp(5000, missionInView.inView);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow">
            About ConnectArtist
          </h1>
          <p className="mt-3 text-foreground/80 max-w-2xl mx-auto">
            Bridging the gap between artists and opportunities.
          </p>
        </header>

        {/* Hero */}
        <div className="about-hero mt-8">
          <div className="overflow-hidden rounded-2xl border border-accent/40 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a5d4?auto=format&fit=crop&w=1600&q=80"
              alt="Artist community"
              className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Mission */}
        <div
          ref={missionInView.ref}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="i-[bullseye]"></span>Our Mission
            </h2>
            <p className="text-foreground/80">
              At ConnectArtist, we empower artists of all disciplines—from
              musicians to magicians—to showcase their talent, connect with
              audiences, and build sustainable careers.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: c1, l: "Registered Artists" },
                { n: c2, l: "Countries" },
                { n: c3, l: "Events Booked" },
              ].map((s) => (
                <Card key={s.l} className="text-center">
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-primary">{s.n}</div>
                    <div className="text-xs text-foreground/70 mt-1">{s.l}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow">
            <img
              src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80"
              alt="Artist performing"
              className="w-full h-[300px] md:h-[380px] object-cover"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-14">
          <h2 className="text-center text-2xl font-semibold">Our Journey</h2>
          <div className="relative mx-auto mt-6 max-w-3xl">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-accent/60" />
            {[
              {
                y: "2018",
                t: "Founded in Delhi",
                d: "Started as a platform connecting local performers with event organizers.",
              },
              {
                y: "2019",
                t: "First Major Update",
                d: "Launched artist profiles and a booking system.",
              },
              { y: "2020", t: "Online Growth", d: "Reached to artist online." },
              {
                y: "2022",
                t: "National Launch",
                d: "Reached National markets with multi-language support.",
              },
              {
                y: "2023",
                t: "AI Matching System",
                d: "Introduced smart algorithms for perfect artist-opportunity matches.",
              },
            ].map((i, idx) => (
              <div
                key={i.y}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-6 py-5"
              >
                <div
                  className={`md:col-start-${idx % 2 === 0 ? 1 : 2} md:pr-8 md:text-right`}
                >
                  <div className="inline-block rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow">
                    {i.y}
                  </div>
                </div>
                <Card
                  className={`md:col-start-${idx % 2 === 0 ? 2 : 1} border-border/70`}
                >
                  <CardContent className="p-4">
                    <div className="text-lg font-semibold">{i.t}</div>
                    <p className="text-sm text-foreground/80 mt-1">{i.d}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-14 text-center">
          <h2 className="text-2xl font-semibold">Meet The Team</h2>
          <p className="text-foreground/70 mt-1">
            The passionate people behind ConnectArtist
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul Raj",
                role: "Tech Lead",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60",
                links: { linkedin: "#", github: "#" },
              },
              {
                name: "Shubham Agarwal",
                role: "Founder & CEO",
                img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60",
                links: { linkedin: "#", twitter: "#" },
              },
              {
                name: "Sambhav Jain",
                role: "Head of Multimedia & PR Outreach",
                img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60",
                links: { instagram: "#", twitter: "#" },
              },
            ].map((m) => (
              <Card key={m.name} className="border-border/70">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="h-32 w-32 rounded-full object-cover ring-2 ring-accent"
                    />
                  </div>
                  <div className="mt-3 text-lg font-semibold">{m.name}</div>
                  <div className="text-accent text-sm">{m.role}</div>
                  <div className="mt-3 flex gap-3 text-foreground/80">
                    {m.links.linkedin && (
                      <a
                        href={m.links.linkedin}
                        aria-label="LinkedIn"
                        className="hover:text-primary"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {m.links.github && (
                      <a
                        href={m.links.github}
                        aria-label="GitHub"
                        className="hover:text-primary"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {m.links.twitter && (
                      <a
                        href={m.links.twitter}
                        aria-label="Twitter"
                        className="hover:text-primary"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {m.links.instagram && (
                      <a
                        href={m.links.instagram}
                        aria-label="Instagram"
                        className="hover:text-primary"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-14 text-center">
          <h2 className="text-2xl font-semibold">Our Core Values</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Heart className="size-6" />,
                t: "Artist First",
                d: "Prioritizing artist success and wellbeing in every decision.",
              },
              {
                icon: <Globe2 className="size-6" />,
                t: "Inclusivity",
                d: "Celebrating all art forms and backgrounds.",
              },
              {
                icon: <Lightbulb className="size-6" />,
                t: "Innovation",
                d: "Constantly evolving to serve artists better.",
              },
              {
                icon: <Handshake className="size-6" />,
                t: "Integrity",
                d: "Transparent and fair in all our dealings.",
              },
            ].map((v) => (
              <Card key={v.t} className="border-border/70 text-left">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/15 text-accent grid place-items-center mb-3">
                    {v.icon}
                  </div>
                  <div className="font-semibold">{v.t}</div>
                  <p className="text-sm text-foreground/80 mt-1">{v.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-border bg-card/60 p-8 text-center">
          <h2 className="text-2xl font-semibold">
            Join Our Artistic Revolution
          </h2>
          <p className="text-foreground/80 mt-1">
            Become part of the most connected artist community in the world.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Button className="bg-gradient-to-r from-primary to-accent">
              Sign Up Now
            </Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
