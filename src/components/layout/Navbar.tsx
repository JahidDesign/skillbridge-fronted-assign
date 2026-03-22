"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

function getAvatarColor(name: string) {
  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-amber-500",
    "bg-pink-500",
  ];
  const index =
    name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
}

function UserAvatar({
  avatar,
  name,
  size = 32,
}: {
  avatar?: string | null;
  name: string;
  size?: number;
}) {
  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={name}
        width={size}
        height={size}
        className="rounded-full ring-2 ring-border object-cover"
      />
    );
  }

  return (
    <span
      aria-label={name}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className={cn(
        "rounded-full ring-2 ring-border flex items-center justify-center font-semibold text-white select-none shrink-0",
        getAvatarColor(name)
      )}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

const NAV_LINKS = [
  { href: "/tutors", label: "Browse Tutors" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

function getDashLink(role?: string) {
  if (!role) return "/login";
  if (role === "ADMIN") return "/admin";
  if (role === "TUTOR") return "/tutor/dashboard";
  return "/dashboard";
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="SkillBridge home"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:rotate-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              Skill<span className="text-primary">Bridge</span>
            </span>
          </Link>

          {/* Desktop nav links — absolutely centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === href
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2 shrink-0 ml-auto">
            {user ? (
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropOpen((v) => !v)}
                  aria-expanded={dropOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <UserAvatar avatar={user.avatar} name={user.name} size={32} />
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-200",
                      dropOpen && "rotate-180"
                    )}
                  />
                </button>

                {dropOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl border shadow-lg py-1 z-50 animate-in fade-in-0 zoom-in-95 duration-100"
                    role="menu"
                  >
                    <div className="px-3 py-2.5 border-b">
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user.role.toLowerCase()}
                      </p>
                    </div>

                    <Link
                      href={getDashLink(user.role)}
                      role="menuitem"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => setDropOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                      Dashboard
                    </Link>

                    <button
                      role="menuitem"
                      onClick={() => {
                        logout();
                        setDropOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/8 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild size="sm">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === href
                  ? "text-primary bg-primary/8"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {label}
            </Link>
          ))}

          <div className="pt-2 border-t mt-2">
            {user ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  <UserAvatar avatar={user.avatar} name={user.name} size={36} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user.role.toLowerCase()}
                    </p>
                  </div>
                </div>

                <Link
                  href={getDashLink(user.role)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/8 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" asChild size="sm" className="flex-1">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}