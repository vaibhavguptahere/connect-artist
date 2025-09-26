import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { toast } from "@/hooks/use-toast";

const KEY = "artist:profile";

type Profile = {
  name: string;
  genre: string;
  location: string;
  price: number;
  bio: string;
  avatar: string;
  banner: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [p, setP] = useState<Profile>({
    name: "",
    genre: "",
    location: "",
    price: 0,
    bio: "",
    avatar: "",
    banner: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setP(JSON.parse(raw));
    } catch {}
  }, []);

  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
      toast({
        title: "Profile saved",
        description: "Your artist profile has been updated.",
      });
    } catch {}
  };

  if (!user || user.role !== "artist") {
    return (
      <div className="mx-auto max-w-2xl p-8 text-center">
        <h1 className="font-serif text-3xl font-bold">Only for Artists</h1>
        <p className="mt-2 text-foreground/80">
          Login as an Artist to edit your profile.
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x text-glow">
          My Artist Profile
        </h1>
        <Card className="mt-6">
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm">Stage Name</label>
                <Input
                  value={p.name}
                  onChange={(e) => setP({ ...p, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm">Genre</label>
                <Input
                  value={p.genre}
                  onChange={(e) => setP({ ...p, genre: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm">Location</label>
                <Input
                  value={p.location}
                  onChange={(e) => setP({ ...p, location: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm">Starting Price (₹)</label>
                <Input
                  type="number"
                  value={p.price}
                  onChange={(e) =>
                    setP({ ...p, price: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Bio</label>
              <Textarea
                rows={4}
                value={p.bio}
                onChange={(e) => setP({ ...p, bio: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm">Avatar URL</label>
                <Input
                  value={p.avatar}
                  onChange={(e) => setP({ ...p, avatar: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm">Banner URL</label>
                <Input
                  value={p.banner}
                  onChange={(e) => setP({ ...p, banner: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={save}
                className="bg-gradient-to-r from-primary to-accent"
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
