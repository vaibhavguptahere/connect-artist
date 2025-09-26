import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { M } from "@/components/ui/motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Artist = {
  id: string;
  name: string;
  genre: string;
  location: string;
  price: number; // in INR
  imageUrl: string;
};

const DATA: Artist[] = [
  {
    id: "1",
    name: "Ava Martinez",
    genre: "Singer",
    location: "Mumbai",
    price: 12000,
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "DJ Nova",
    genre: "DJ",
    location: "Delhi",
    price: 25000,
    imageUrl:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Midnight Echo",
    genre: "Band",
    location: "Bangalore",
    price: 40000,
    imageUrl:
      "https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    name: "Maya Kapoor",
    genre: "Dancer",
    location: "Hyderabad",
    price: 8000,
    imageUrl:
      "https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Discover() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [location, setLocation] = useState("any");
  const [sort, setSort] = useState("popular");
  const [priceRange, setPriceRange] = useState("any");
  const [availability, setAvailability] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let out = DATA.filter(
      (a) =>
        (a.name + a.genre).toLowerCase().includes(search.toLowerCase()) &&
        (genre === "all" || a.genre.toLowerCase() === genre.toLowerCase()) &&
        (location === "any" ||
          a.location.toLowerCase() === location.toLowerCase()),
    );

    if (priceRange !== "any") {
      const [minStr, maxStr] = priceRange.split("-");
      const min = Number(minStr);
      const max = maxStr ? Number(maxStr) : NaN;
      out = out.filter(
        (a) =>
          (isNaN(min) ? true : a.price >= min) &&
          (isNaN(max) ? true : a.price <= max),
      );
    }

    switch (sort) {
      case "price-low":
        out = out.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        out = out.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return out;
  }, [search, genre, location, sort, priceRange]);

  function clearAll() {
    setSearch("");
    setGenre("all");
    setLocation("any");
    setSort("popular");
    setPriceRange("any");
    setAvailability("");
  }

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow">
            Discover Magical Artists
          </h1>
          <p className="mt-2 text-foreground/80">
            Find and book extraordinary performers for your next event.
          </p>
        </header>

        <div className="mt-8 rounded-xl border border-border bg-card/60 backdrop-blur p-4 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for artists, genres, or skills..."
              className="flex-1 rounded-full bg-background/60"
            />
            <div className="flex gap-2">
              <Button className="rounded-full bg-gradient-to-r from-primary to-accent px-5 py-5 text-sm font-semibold text-primary-foreground shadow">
                Explore Now
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-5 py-5"
                onClick={() => setShowFilters((v) => !v)}
              >
                {showFilters ? "Hide Filters" : "More Filters"}
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5 animate-fade-in-up">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wide text-foreground/70">
                  Genre/Skill
                </div>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="bg-background/60">
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="Magician">Magician</SelectItem>
                    <SelectItem value="Singer">Singer</SelectItem>
                    <SelectItem value="Musician">Musician</SelectItem>
                    <SelectItem value="DJ">DJ</SelectItem>
                    <SelectItem value="Comedian">Comedian</SelectItem>
                    <SelectItem value="Dancer">Dancer</SelectItem>
                    <SelectItem value="Band">Band</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wide text-foreground/70">
                  Location
                </div>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="bg-background/60">
                    <SelectValue placeholder="Anywhere" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Anywhere</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wide text-foreground/70">
                  Availability
                </div>
                <Input
                  type="date"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="bg-background/60"
                />
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wide text-foreground/70">
                  Price Range
                </div>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="bg-background/60">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="0-10000">Below ₹10,000</SelectItem>
                    <SelectItem value="10000-20000">
                      ₹10,000 - ₹20,000
                    </SelectItem>
                    <SelectItem value="20000-40000">
                      ₹20,000 - ₹40,000
                    </SelectItem>
                    <SelectItem value="40000-">Above ₹40,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wide text-foreground/70">
                  Sort By
                </div>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="bg-background/60">
                    <SelectValue placeholder="Most Popular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-5">
                <Button variant="outline" className="w-full" onClick={clearAll}>
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a, i) => (
            <M.article
              key={a.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-border bg-card/60 backdrop-blur overflow-hidden hover:border-primary transition"
            >
              <img
                src={a.imageUrl}
                alt={a.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{a.name}</h3>
                <div className="mt-1 flex justify-between text-sm text-foreground/80">
                  <span>{a.genre}</span>
                  <span>₹{a.price.toLocaleString()}</span>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-accent">
                    Book Now
                  </Button>
                  <a
                    href={`/artist/${a.id}`}
                    className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted/40"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </M.article>
          ))}
        </div>
      </div>
    </div>
  );
}
