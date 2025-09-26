import { IdCard, Share2, UserPlus } from "lucide-react";

export default function Steps() {
  const steps = [
    {
      title: "Create Account",
      Icon: UserPlus,
      desc: "Sign up in seconds with your email or social accounts.",
    },
    {
      title: "Build Profile",
      Icon: IdCard,
      desc: "Add photos, bio, videos and your best work.",
    },
    {
      title: "Share & Connect",
      Icon: Share2,
      desc: "Share your profile, connect with fans, get booked.",
    },
  ];
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background via-background/95 to-background">
      <h2 className="text-center font-serif text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow">
        How It Works
      </h2>
      <div className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {steps.map(({ title, Icon, desc }, i) => (
          <div
            key={title}
            className="opacity-0 translate-y-8 animate-fade-in-up rounded-xl border border-border bg-card/60 backdrop-blur p-6 text-center hover:border-primary transition-colors"
            style={{
              animationDelay: `${i * 120}ms`,
              animationFillMode: "both",
            }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary text-primary">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-foreground/80">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
