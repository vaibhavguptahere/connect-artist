import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, UserRole } from "@/context/auth";

export default function AuthDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>("artist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    login({ name: name.trim(), email: email.trim() || undefined, role });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>Select your role and continue.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-sm">
            {(
              [
                { key: "artist", label: "Artist" },
                { key: "organizer", label: "Organizer" },
                { key: "audience", label: "Audience" },
              ] as const
            ).map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRole(r.key)}
                className={`rounded-md border px-3 py-2 ${role === r.key ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted/40"}`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Email (optional)</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-accent"
              onClick={submit}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
