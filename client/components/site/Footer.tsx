export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-foreground/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ConnectArtist</p>
            <p className="mt-2 max-w-sm">The premium platform for artists to showcase talent, connect with fans, and get booked.</p>
          </div>
          <div>
            <p className="font-semibold mb-3">Quick Links</p>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-foreground">Home</a></li>
              <li><a href="/discover" className="hover:text-foreground">Discover</a></li>
              <li><a href="/community" className="hover:text-foreground">Community</a></li>
              <li><a href="/about" className="hover:text-foreground">About</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">Contact</p>
            <p>Email: hello@connectartist.app</p>
            <p className="mt-2">© {new Date().getFullYear()} ConnectArtist. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
