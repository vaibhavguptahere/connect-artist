import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const GIGS = [
  {
    id: "g1",
    artist: "Ava Martinez",
    title: "Soulful Evenings",
    date: "2025-10-05",
    venue: "Mumbai Arts Center",
    city: "Mumbai",
    price: 799,
    banner:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "g2",
    artist: "DJ Nova",
    title: "Neon Nights",
    date: "2025-10-12",
    venue: "Delhi Arena",
    city: "Delhi",
    price: 1199,
    banner:
      "https://images.unsplash.com/photo-1514511547117-f6b9c7b74a06?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "g3",
    artist: "Midnight Echo",
    title: "Rock Revival",
    date: "2025-11-02",
    venue: "Bangalore Live",
    city: "Bangalore",
    price: 999,
    banner:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Audience() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const book = async (id: string) => {
    setLoadingId(id);
    await new Promise((r) => setTimeout(r, 700));
    setLoadingId(null);
    toast({
      title: "Tickets booked",
      description: "Your e-ticket has been emailed.",
    });
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow">
            Upcoming Gigs
          </h1>
          <p className="mt-2 text-foreground/80">
            Discover shows and book tickets instantly.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GIGS.map((g) => (
            <Card
              key={g.id}
              className="overflow-hidden border-border/80 hover:shadow-lg transition"
            >
              <img
                src={g.banner}
                alt={g.title}
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-5 space-y-2">
                <div className="text-lg font-semibold">{g.title}</div>
                <div className="text-sm text-foreground/80">by {g.artist}</div>
                <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-foreground/80">
                  <div className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />{" "}
                    {new Date(g.date).toDateString()}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {g.venue}, {g.city}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm">
                    <span className="text-foreground/60">From</span> ₹{g.price}
                  </div>
                  <Button
                    onClick={() => book(g.id)}
                    disabled={loadingId === g.id}
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    <Ticket className="h-4 w-4 mr-2" />{" "}
                    {loadingId === g.id ? "Booking..." : "Book Ticket"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
