import { useEffect, useMemo, useState } from "react";
import { M } from "@/components/ui/motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  CalendarDays,
  Filter,
  IndianRupee,
  Mail,
  MapPin,
  Search,
} from "lucide-react";

const CATEGORIES = [
  "Magician",
  "Singer",
  "Musician",
  "DJ",
  "Comedian",
  "Dancer",
  "Band",
];

interface Requirement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO or yyyy-mm-dd
  location: string;
  budget: number;
  contact: string;
  createdAt: string; // ISO
}

const STORAGE_KEY = "community_requirements";

function loadRequirements(): Requirement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Requirement[];
    return [];
  } catch {
    return [];
  }
}

function saveRequirements(items: Requirement[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, Math.floor((now - d) / 1000));
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Community() {
  const { toast } = useToast();
  const [role, setRole] = useState<"organizer" | "artist">("organizer");
  const [items, setItems] = useState<Requirement[]>([]);

  // Filters (artist view)
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [minBudget, setMinBudget] = useState<string>("any");
  const [sort, setSort] = useState<string>("recent");

  // Organizer form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    setItems(loadRequirements());
  }, []);

  const locations = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.location && set.add(i.location));
    return Array.from(set);
  }, [items]);

  const visible = useMemo(() => {
    let out = items.slice();

    if (categoryFilter) out = out.filter((r) => r.category === categoryFilter);
    if (locationFilter)
      out = out.filter(
        (r) => r.location.toLowerCase() === locationFilter.toLowerCase(),
      );
    if (minBudget !== "any")
      out = out.filter((r) => r.budget >= Number(minBudget));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q),
      );
    }

    switch (sort) {
      case "budget-high":
        out.sort((a, b) => b.budget - a.budget);
        break;
      case "budget-low":
        out.sort((a, b) => a.budget - b.budget);
        break;
      case "date-soon":
        out.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      default:
        out.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return out;
  }, [items, categoryFilter, locationFilter, minBudget, sort, search]);

  function clearFilters() {
    setSearch("");
    setCategoryFilter("");
    setLocationFilter("");
    setMinBudget("any");
    setSort("recent");
  }

  function addRequirement() {
    if (
      !title.trim() ||
      !category ||
      !date ||
      !location.trim() ||
      !budget ||
      !contact.trim()
    ) {
      toast({
        title: "Missing details",
        description: "Please fill all required fields.",
      });
      return;
    }
    const value: Requirement = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      description: description.trim(),
      category,
      date,
      location: location.trim(),
      budget: Number(budget) || 0,
      contact: contact.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [value, ...items];
    setItems(next);
    saveRequirements(next);
    setTitle("");
    setDescription("");
    setCategory("");
    setDate("");
    setLocation("");
    setBudget("");
    setContact("");
    toast({
      title: "Requirement posted",
      description: "Your request is now visible to matching artists.",
    });
  }

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow">
            Community
          </h1>
          <p className="mt-2 text-foreground/80">
            Organizers can post requirements; artists see relevant opportunities
            by category.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Role & Filters */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Role & Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">Select role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organizer">Organizer</SelectItem>
                    <SelectItem value="artist">Artist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {role === "artist" && (
                <div className="space-y-3">
                  <div>
                    <Label className="mb-2 block">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                      <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search opportunities..."
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block">Category</Label>
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Location</Label>
                    <Select
                      value={locationFilter}
                      onValueChange={setLocationFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Anywhere" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Anywhere</SelectItem>
                        {locations.map((l) => (
                          <SelectItem key={l} value={l}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="mb-2 block">Min Budget</Label>
                      <Select value={minBudget} onValueChange={setMinBudget}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="5000">₹5,000+</SelectItem>
                          <SelectItem value="10000">₹10,000+</SelectItem>
                          <SelectItem value="20000">₹20,000+</SelectItem>
                          <SelectItem value="40000">₹40,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Sort</Label>
                      <Select value={sort} onValueChange={setSort}>
                        <SelectTrigger>
                          <SelectValue placeholder="Recent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="date-soon">
                            Event Date (Soonest)
                          </SelectItem>
                          <SelectItem value="budget-high">
                            Budget: High to Low
                          </SelectItem>
                          <SelectItem value="budget-low">
                            Budget: Low to High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Main area */}
          <div className="lg:col-span-2 space-y-6">
            {role === "organizer" ? (
              <Card className="border-accent/30">
                <CardHeader>
                  <CardTitle>Post a Requirement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Title</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Wedding singer for reception"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Artist Type</Label>
                    <div className="grid gap-2">
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCategory(c)}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                              category === c
                                ? "bg-primary text-primary-foreground border-primary"
                                : "hover:bg-muted/40"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Event Date</Label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                        <Input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="City / Venue"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Budget (₹)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                        <Input
                          type="number"
                          min={0}
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="e.g., 15000"
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Contact</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                        <Input
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder="Email / Phone"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block">Details</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe event, set length, equipment, special requests..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={addRequirement}
                      className="bg-gradient-to-r from-primary to-accent"
                    >
                      Post Requirement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Matching Opportunities
                  </h2>
                  <div className="text-sm text-foreground/70">
                    {visible.length} results
                  </div>
                </div>
                {visible.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-8 text-center text-foreground/70">
                    No requirements yet. Adjust filters to discover more.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {visible.map((r, i) => (
                      <M.div
                        key={r.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Card className="border-border/80 hover:border-accent transition-colors">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className="text-base md:text-lg leading-tight">
                                {r.title}
                              </CardTitle>
                              <span className="rounded-full border px-2 py-0.5 text-xs">
                                {r.category}
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-foreground/60">
                              Posted {timeAgo(r.createdAt)}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3 text-sm">
                            <div className="flex flex-wrap gap-2 text-foreground/80">
                              <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                                <CalendarDays className="h-3.5 w-3.5" />{" "}
                                {new Date(r.date).toDateString()}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                                <MapPin className="h-3.5 w-3.5" /> {r.location}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                                <IndianRupee className="h-3.5 w-3.5" />{" "}
                                {r.budget.toLocaleString()}
                              </span>
                            </div>
                            {r.description && (
                              <p className="text-foreground/80">
                                {r.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between">
                              <div className="text-foreground/70 text-xs md:text-sm">
                                Contact:{" "}
                                <span className="font-medium">{r.contact}</span>
                              </div>
                              <a
                                href={`mailto:${r.contact}`}
                                className="text-xs md:text-sm rounded-md border border-border px-3 py-1 hover:bg-muted/40"
                              >
                                Email
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      </M.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
