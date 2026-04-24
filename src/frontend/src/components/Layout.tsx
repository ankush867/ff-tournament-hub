import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Menu,
  Shield,
  Swords,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FloatingWhatsAppButton } from "./FloatingWhatsAppButton";

interface NavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
  authRequired?: boolean;
  adminOnly?: boolean;
}

const NAV_LINKS: NavLink[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    authRequired: true,
  },
  { to: "/matches", label: "Matches", icon: <Swords className="h-4 w-4" /> },
  {
    to: "/profile",
    label: "Profile",
    icon: <User className="h-4 w-4" />,
    authRequired: true,
  },
  {
    to: "/admin",
    label: "Admin",
    icon: <Shield className="h-4 w-4" />,
    authRequired: true,
    adminOnly: true,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    isAuthenticated,
    isAdmin,
    isInitializing,
    isLoggingIn,
    login,
    logout,
  } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const visibleLinks = NAV_LINKS.filter((link) => {
    if (link.adminOnly && !isAdmin) return false;
    if (link.authRequired && !isAuthenticated) return false;
    return true;
  });

  const isActive = (to: string) =>
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
            data-ocid="nav.logo_link"
          >
            <div className="flex h-7 w-7 items-center justify-center bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-foreground text-sm uppercase tracking-widest hidden sm:block group-hover:text-primary transition-colors">
              FF Tournament Hub
            </span>
            <span className="font-display font-bold text-foreground text-xs uppercase tracking-widest sm:hidden group-hover:text-primary transition-colors">
              FF Hub
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors duration-200 border ${
                  isActive(link.to)
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth button + hamburger */}
          <div className="flex items-center gap-2">
            <Button
              onClick={isAuthenticated ? logout : login}
              disabled={isInitializing || isLoggingIn}
              size="sm"
              variant={isAuthenticated ? "outline" : "default"}
              className="font-mono text-xs uppercase tracking-widest h-8 px-3 hidden sm:flex"
              data-ocid="nav.auth_button"
            >
              {isInitializing
                ? "Loading…"
                : isLoggingIn
                  ? "Signing in…"
                  : isAuthenticated
                    ? "Logout"
                    : "Login"}
            </Button>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center h-8 w-8 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              data-ocid="nav.hamburger_button"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1 animate-fade-in"
            aria-label="Mobile navigation"
          >
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors border ${
                  isActive(link.to)
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
                data-ocid={`nav.mobile.${link.label.toLowerCase()}_link`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="pt-1 border-t border-border mt-1">
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  isAuthenticated ? logout() : login();
                }}
                disabled={isInitializing || isLoggingIn}
                size="sm"
                variant={isAuthenticated ? "outline" : "default"}
                className="w-full font-mono text-xs uppercase tracking-widest h-9"
                data-ocid="nav.mobile.auth_button"
              >
                {isInitializing
                  ? "Loading…"
                  : isLoggingIn
                    ? "Signing in…"
                    : isAuthenticated
                      ? "Logout"
                      : "Login with Internet Identity"}
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
          <span className="uppercase tracking-widest">
            FF Tournament Hub © {new Date().getFullYear()}
          </span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>

      {/* Always-visible WhatsApp support button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
