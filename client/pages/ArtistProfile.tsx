import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ARTISTS = [
  {
    id: "1",
    name: "Ava Martinez",
    role: "Singer",
    genre: "Pop / R&B",
    location: "Mumbai",
    price: 12000,
    bio: "Award-winning vocalist with a soulful voice and captivating stage presence.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60",
    banner:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a5d4?auto=format&fit=crop&w=1600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=60",
    ],
    audios: [
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    ],
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
    ],
  },
  {
    id: "2",
    name: "DJ Nova",
    role: "DJ",
    genre: "Electronic / Dance",
    location: "Delhi",
    price: 25000,
    bio: "Renowned DJ known for energetic sets that light up any floor.",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60",
    banner:
      "https://images.unsplash.com/photo-1514511547117-f6b9c7b74a06?auto=format&fit=crop&w=1600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1505839673365-e3971f8d9184?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=800&q=60",
    ],
    audios: [
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    ],
    videos: [
      "https://www.w3schools.com/html/movie.mp4",
    ],
  },
  {
    id: "3",
    name: "Midnight Echo",
    role: "Band",
    genre: "Rock / Alternative",
    location: "Bangalore",
    price: 40000,
    bio: "High-energy band blending classic riffs with modern soundscapes.",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=60",
    banner:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1492176273113-2d51f47b23b0?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    ],
    audios: [
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    ],
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
    ],
  },
];

export default function ArtistProfile() {
  const { id } = useParams();
  const artist = useMemo(() => ARTISTS.find((a) => a.id === id) ?? ARTISTS[0], [id]);

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
          <div className="relative h-48 md:h-64">
            <img src={artist.banner} alt={artist.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-4">
                <img src={artist.avatar} alt={artist.name} className="h-24 w-24 rounded-full object-cover ring-2 ring-accent -mt-14 md:-mt-16 bg-background" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold">{artist.name}</h1>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-foreground/80">
                    <span className="rounded-full border px-2 py-0.5">{artist.role}</span>
                    <span className="rounded-full border px-2 py-0.5">{artist.genre}</span>
                    <span className="rounded-full border px-2 py-0.5">{artist.location}</span>
                    <span className="rounded-full border px-2 py-0.5">₹{artist.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to="/discover"><Button variant="outline">Back</Button></Link>
                <Button className="bg-gradient-to-r from-primary to-accent">Book Now</Button>
              </div>
            </div>

            <p className="mt-4 text-foreground/80 max-w-3xl">{artist.bio}</p>

            {/* Media sections */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Photos */}
              <Card className="lg:col-span-2">
                <CardContent className="p-5">
                  <div className="text-lg font-semibold">Photos</div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {artist.photos.map((src, i) => (
                      <img key={i} src={src} alt={`Photo ${i + 1}`} className="h-36 w-full object-cover rounded-lg border" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Quick details */}
              <Card>
                <CardContent className="p-5">
                  <div className="text-lg font-semibold">Details</div>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li><span className="text-foreground/60">Based in:</span> {artist.location}</li>
                    <li><span className="text-foreground/60">Starting price:</span> ₹{artist.price.toLocaleString()}</li>
                    <li><span className="text-foreground/60">Genre:</span> {artist.genre}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Audio / Video */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-5">
                  <div className="text-lg font-semibold">Music</div>
                  <div className="mt-3 space-y-3">
                    {artist.audios.map((src, i) => (
                      <audio key={i} controls className="w-full"> 
                        <source src={src} />
                      </audio>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="text-lg font-semibold">Videos</div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {artist.videos.map((src, i) => (
                      <video key={i} controls className="w-full h-40 rounded-lg border object-cover">
                        <source src={src} />
                      </video>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
