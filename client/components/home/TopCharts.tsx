import { Flame, Share2, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export type ArtistStats = {
  id: string;
  name: string;
  genre: string;
  avatar: string;
  bookings: number; // weekly
  views: number; // weekly
  likes: number; // weekly
  rating: number; // average 0-5
  profileUrl: string;
  shareUrl?: string;
};

function score(a: ArtistStats) {
  // Weighted score: prioritize bookings, then engagement, then rating
  const wBookings = 0.5;
  const wViews = 0.2;
  const wLikes = 0.2;
  const wRating = 0.1;
  const bookingsScore = a.bookings;
  const viewsScore = a.views / 1000; // normalize
  const likesScore = a.likes / 100; // normalize
  const ratingScore = (a.rating / 5) * 10; // out of 10
  return (
    wBookings * bookingsScore +
    wViews * viewsScore +
    wLikes * likesScore +
    wRating * ratingScore
  );
}

const DATA: ArtistStats[] = [
  {
    id: "1",
    name: "Ava Martinez",
    genre: "Pop / R&B",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    bookings: 42,
    views: 128_000,
    likes: 5_100,
    rating: 4.9,
    profileUrl: "/artist/1",
  },
  {
    id: "2",
    name: "DJ Nova",
    genre: "Electronic / Dance",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=80",
    bookings: 38,
    views: 210_500,
    likes: 7_900,
    rating: 4.8,
    profileUrl: "/artist/2",
  },
  {
    id: "3",
    name: "Midnight Echo",
    genre: "Rock / Alternative",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    bookings: 30,
    views: 175_300,
    likes: 4_600,
    rating: 4.7,
    profileUrl: "/artist/3",
  },
  {
    id: "4",
    name: "Luna Rae",
    genre: "Indie / Acoustic",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=80",
    bookings: 26,
    views: 95_400,
    likes: 3_100,
    rating: 4.9,
    profileUrl: "/artist/4",
  },
  {
    id: "5",
    name: "The Brass Room",
    genre: "Jazz / Soul",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=80",
    bookings: 22,
    views: 80_000,
    likes: 2_700,
    rating: 4.6,
    profileUrl: "/artist/5",
  },
  {
    id: "6",
    name: "Crimson Tide",
    genre: "Metal / Alt",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
    bookings: 18,
    views: 120_000,
    likes: 3_900,
    rating: 4.5,
    profileUrl: "/artist/6",
  },
  {
    id: "7",
    name: "Zara Bleu",
    genre: "RnB / Soul",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    bookings: 16,
    views: 65_000,
    likes: 2_100,
    rating: 4.8,
    profileUrl: "/artist/7",
  },
  {
    id: "8",
    name: "Echo Drift",
    genre: "Ambient / Chill",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=80",
    bookings: 15,
    views: 140_000,
    likes: 4_200,
    rating: 4.4,
    profileUrl: "/artist/8",
  },
  {
    id: "9",
    name: "Verse & Vibe",
    genre: "Hip‑Hop / Rap",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
    bookings: 14,
    views: 90_000,
    likes: 2_800,
    rating: 4.3,
    profileUrl: "/artist/9",
  },
  {
    id: "10",
    name: "Starlight Duo",
    genre: "Acoustic / Pop",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    bookings: 13,
    views: 55_000,
    likes: 1_900,
    rating: 4.6,
    profileUrl: "/artist/10",
  },
  {
    id: "11",
    name: "Rhythm Pulse",
    genre: "World / Fusion",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=80",
    bookings: 12,
    views: 70_500,
    likes: 2_000,
    rating: 4.2,
    profileUrl: "/artist/11",
  },
  {
    id: "12",
    name: "Neon Trail",
    genre: "Synthwave",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    bookings: 10,
    views: 60_000,
    likes: 1_700,
    rating: 4.4,
    profileUrl: "/artist/12",
  },
];

function rankArtists(list: ArtistStats[]) {
  return [...list]
    .sort((a, b) => score(b) - score(a))
    .slice(0, 10)
    .map((a, i) => ({ ...a, rank: i + 1, totalScore: score(a) }));
}

function formatNumber(n: number) {
  return Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
}

async function shareArtist(a: ArtistStats) {
  const url =
    a.shareUrl ||
    (typeof window !== "undefined"
      ? new URL(a.profileUrl, window.location.origin).toString()
      : a.profileUrl);
  const data = {
    title: `${a.name} • Top Charts`,
    text: `${a.name} is trending on ConnectArtist!`,
    url,
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
  } catch {}
  try {
    await navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: `${a.name}'s profile link is in your clipboard.`,
    });
  } catch {
    toast({
      title: "Share unavailable",
      description:
        "Could not share automatically. Please copy the link manually.",
    });
  }
}

export default function TopCharts() {
  const ranked = rankArtists(DATA);
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow">
              Top Charts • Trending Artists
            </h2>
            <p className="mt-1 text-sm text-foreground/70">
              Weekly ranking based on bookings, views, likes, and ratings.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center rounded-full border border-primary/30 text-primary px-2.5 py-1">
              This Week
            </span>
          </div>
        </div>

        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-card/60 backdrop-blur overflow-hidden">
          {ranked.map((a) => (
            <article
              key={a.id}
              className="grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto_auto] items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center justify-center">
                <span
                  className={`inline-flex items-center justify-center h-9 w-9 rounded-full border text-sm font-semibold ${
                    a.rank === 1
                      ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-black border-amber-500"
                      : a.rank === 2
                        ? "bg-gradient-to-br from-zinc-200 to-zinc-400 text-black border-zinc-400"
                        : a.rank === 3
                          ? "bg-gradient-to-br from-amber-200 to-amber-400 text-black border-amber-300"
                          : "bg-background/60 text-foreground/90 border-border"
                  }`}
                >
                  {a.rank}
                </span>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={a.avatar}
                  alt={a.name}
                  className="h-12 w-12 rounded-full object-cover border border-border"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <a
                      href={a.profileUrl}
                      className="truncate font-semibold hover:underline"
                    >
                      {a.name}
                    </a>
                    {a.rank === 1 && (
                      <span
                        title="Top Performer"
                        className="text-lg"
                        aria-hidden
                      >
                        🥇
                      </span>
                    )}
                    {a.rank <= 5 && (
                      <Flame className="h-4 w-4 text-accent" aria-hidden />
                    )}
                  </div>
                  <div className="text-xs text-foreground/70 truncate">
                    {a.genre}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-foreground/80">
                    <span>
                      <strong>{a.bookings}</strong> bookings
                    </span>
                    <span>
                      <strong>{formatNumber(a.views)}</strong> views
                    </span>
                    <span>
                      <strong>{formatNumber(a.likes)}</strong> likes
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-400" />
                      {a.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block text-right text-sm font-semibold tabular-nums text-foreground/80 pr-2">
                {score(a).toFixed(1)}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => shareArtist(a)}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted/40 transition-colors"
                  aria-label={`Share ${a.name}`}
                >
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 text-right">
          <a
            href="/discover?sort=trending"
            className="text-sm text-primary hover:opacity-90"
          >
            View full charts →
          </a>
        </div>
      </div>
    </section>
  );
}
