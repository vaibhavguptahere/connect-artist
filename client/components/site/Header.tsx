import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90 border-b border-border transition-shadow ${scrolled ? "shadow-md" : "shadow-none"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ConnectArtist
          </span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-2 py-1 rounded-md transition-colors link-underline ${isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/discover"
                className={({ isActive }) =>
                  `px-2 py-1 rounded-md transition-colors link-underline ${isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground"}`
                }
              >
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  `px-2 py-1 rounded-md transition-colors link-underline ${isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground"}`
                }
              >
                Community
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-2 py-1 rounded-md transition-colors link-underline ${isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground"}`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/discover"
            className="hidden sm:inline-flex items-center rounded-full border border-border px-4 py-2 text-sm hover:bg-muted/40 transition-colors"
          >
            Explore
          </Link>
          <Link
            to="/discover"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-95 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
