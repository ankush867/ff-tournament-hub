import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your username/email and password.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      if (!actor) {
        setError("Not connected to backend. Please try again.");
        return;
      }
      const typedActor = actor as unknown as {
        loginUser: (
          id: string,
          pw: string,
        ) => Promise<{ id: string; username: string } | null>;
        isCallerAdmin: () => Promise<boolean>;
      };
      const user = await typedActor.loginUser(identifier.trim(), password);

      if (!user) {
        setError(
          "Invalid credentials. Please check your username and password.",
        );
        return;
      }

      // Check admin role from backend after successful login
      let isAdmin = false;
      try {
        isAdmin = await typedActor.isCallerAdmin();
      } catch {
        // Non-critical: default to false if call fails
      }

      if (isAdmin) {
        localStorage.setItem("ff_is_admin", "true");
      } else {
        localStorage.removeItem("ff_is_admin");
      }

      // Store login state and trigger II auth flow
      queryClient.setQueryData(["myProfile"], user);
      login();
    } catch (_err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-[88vh] flex items-center justify-center px-4 py-12 bg-background"
      data-ocid="login.page"
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center bg-primary text-primary-foreground">
            <Zap className="h-8 w-8" />
          </div>
          <div className="text-center">
            <h1 className="font-display font-bold text-2xl uppercase tracking-widest text-foreground">
              FF Tournament Hub
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-1 uppercase tracking-widest">
              Sign in to your account
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-card border border-border p-6 flex flex-col gap-5"
          data-ocid="login.form"
        >
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="identifier"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Username / Email / Phone
            </Label>
            <Input
              id="identifier"
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="your_username"
              className="font-mono text-sm h-10 bg-background border-input"
              disabled={isSubmitting}
              data-ocid="login.identifier_input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="font-mono text-sm h-10 bg-background border-input pr-10"
                disabled={isSubmitting}
                data-ocid="login.password_input"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="border border-destructive/50 bg-destructive/10 px-3 py-2.5 text-xs text-destructive font-mono"
              role="alert"
              data-ocid="login.error_state"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !identifier.trim() || !password.trim()}
            className="w-full font-mono uppercase tracking-widest h-11 gap-2 mt-1"
            data-ocid="login.submit_button"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 border border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign In
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            New here?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-semibold"
              data-ocid="login.register_link"
            >
              Create account
            </Link>
          </p>
        </form>

        <p className="text-center text-[11px] text-muted-foreground font-mono mt-4 leading-relaxed px-2">
          Use your registered username, email, or phone number with your
          password.
        </p>
      </div>
    </div>
  );
}
