import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff, UserPlus, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import { useAuth } from "../contexts/AuthContext";

interface FormState {
  username: string;
  contact: string;
  ffUid: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_FORM: FormState = {
  username: "",
  contact: "",
  ffUid: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const set =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError("");
    };

  const validate = (): string | null => {
    if (!form.username.trim()) return "Username is required.";
    if (form.username.trim().length < 3)
      return "Username must be at least 3 characters.";
    if (!form.contact.trim()) return "Email or phone number is required.";
    if (!form.ffUid.trim()) return "Free Fire UID is required.";
    if (!form.password) return "Password is required.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      if (!actor) {
        setError("Not connected to backend. Please try again.");
        return;
      }
      const regInput = {
        username: form.username.trim(),
        contact: form.contact.trim(),
        ffUid: form.ffUid.trim(),
        password: form.password,
      };
      await (
        actor as unknown as {
          register: (i: {
            username: string;
            contact: string;
            ffUid: string;
            password: string;
          }) => Promise<unknown>;
        }
      ).register(regInput);

      setSuccess(true);
      setTimeout(() => navigate({ to: "/login" }), 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("already")) {
        setError(
          "Username or contact already registered. Please use a different one.",
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        className="min-h-[88vh] flex items-center justify-center px-4"
        data-ocid="register.success_state"
      >
        <div className="text-center flex flex-col items-center gap-4">
          <CheckCircle2 className="h-14 w-14 text-primary" />
          <h2 className="font-display font-bold text-xl uppercase tracking-widest text-foreground">
            Account Created!
          </h2>
          <p className="text-sm text-muted-foreground font-mono">
            Redirecting to sign in…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[88vh] flex items-center justify-center px-4 py-12 bg-background"
      data-ocid="register.page"
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center bg-primary text-primary-foreground">
            <Zap className="h-8 w-8" />
          </div>
          <div className="text-center">
            <h1 className="font-display font-bold text-2xl uppercase tracking-widest text-foreground">
              Join the Hub
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-1 uppercase tracking-widest">
              Create your Free Fire account
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-card border border-border p-6 flex flex-col gap-4"
          data-ocid="register.form"
        >
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="username"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={set("username")}
              placeholder="player_name"
              className="font-mono text-sm h-10 bg-background border-input"
              disabled={isSubmitting}
              data-ocid="register.username_input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="contact"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Email or Phone
            </Label>
            <Input
              id="contact"
              type="text"
              autoComplete="email"
              value={form.contact}
              onChange={set("contact")}
              placeholder="email@example.com or 9876543210"
              className="font-mono text-sm h-10 bg-background border-input"
              disabled={isSubmitting}
              data-ocid="register.contact_input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="ffUid"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Free Fire UID
            </Label>
            <Input
              id="ffUid"
              type="text"
              value={form.ffUid}
              onChange={set("ffUid")}
              placeholder="123456789"
              className="font-mono text-sm h-10 bg-background border-input"
              disabled={isSubmitting}
              data-ocid="register.ff_uid_input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="reg-password"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={set("password")}
                placeholder="Min. 6 characters"
                className="font-mono text-sm h-10 bg-background border-input pr-10"
                disabled={isSubmitting}
                data-ocid="register.password_input"
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

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="confirm-password"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                placeholder="Re-enter password"
                className="font-mono text-sm h-10 bg-background border-input pr-10"
                disabled={isSubmitting}
                data-ocid="register.confirm_password_input"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p
                className="text-[11px] text-destructive font-mono"
                data-ocid="register.password_match_error"
              >
                Passwords don't match
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div
              className="border border-destructive/50 bg-destructive/10 px-3 py-2.5 text-xs text-destructive font-mono"
              role="alert"
              data-ocid="register.error_state"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-mono uppercase tracking-widest h-11 gap-2 mt-1"
            data-ocid="register.submit_button"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 border border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Creating account…
              </span>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                Create Account
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground pt-1">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-semibold"
              data-ocid="register.login_link"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
