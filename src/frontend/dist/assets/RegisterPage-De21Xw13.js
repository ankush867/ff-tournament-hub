import { c as createLucideIcon, u as useNavigate, b as useAuth, r as reactExports, j as jsxRuntimeExports, Z as Zap, B as Button, L as Link } from "./index-DJ3jSp6d.js";
import { I as Input } from "./input-DUfuimul.js";
import { L as Label } from "./label-Bwc9BENV.js";
import { u as useActor, c as createActor } from "./backend-DPSn0mZX.js";
import { C as CircleCheck } from "./circle-check-C3i03Anp.js";
import { E as EyeOff, a as Eye } from "./eye-D00-3ofo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const INITIAL_FORM = {
  username: "",
  contact: "",
  ffUid: "",
  password: "",
  confirmPassword: ""
};
function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };
  const validate = () => {
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
  const handleSubmit = async (e) => {
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
        password: form.password
      };
      await actor.register(regInput);
      setSuccess(true);
      setTimeout(() => navigate({ to: "/login" }), 2e3);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("already")) {
        setError(
          "Username or contact already registered. Please use a different one."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[88vh] flex items-center justify-center px-4",
        "data-ocid": "register.success_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-14 w-14 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl uppercase tracking-widest text-foreground", children: "Account Created!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-mono", children: "Redirecting to sign in…" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[88vh] flex items-center justify-center px-4 py-12 bg-background",
      "data-ocid": "register.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl uppercase tracking-widest text-foreground", children: "Join the Hub" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mt-1 uppercase tracking-widest", children: "Create your Free Fire account" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            noValidate: true,
            className: "bg-card border border-border p-6 flex flex-col gap-4",
            "data-ocid": "register.form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "username",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Username"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "username",
                    type: "text",
                    autoComplete: "username",
                    value: form.username,
                    onChange: set("username"),
                    placeholder: "player_name",
                    className: "font-mono text-sm h-10 bg-background border-input",
                    disabled: isSubmitting,
                    "data-ocid": "register.username_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "contact",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Email or Phone"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "contact",
                    type: "text",
                    autoComplete: "email",
                    value: form.contact,
                    onChange: set("contact"),
                    placeholder: "email@example.com or 9876543210",
                    className: "font-mono text-sm h-10 bg-background border-input",
                    disabled: isSubmitting,
                    "data-ocid": "register.contact_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "ffUid",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Free Fire UID"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ffUid",
                    type: "text",
                    value: form.ffUid,
                    onChange: set("ffUid"),
                    placeholder: "123456789",
                    className: "font-mono text-sm h-10 bg-background border-input",
                    disabled: isSubmitting,
                    "data-ocid": "register.ff_uid_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "reg-password",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "reg-password",
                      type: showPassword ? "text" : "password",
                      autoComplete: "new-password",
                      value: form.password,
                      onChange: set("password"),
                      placeholder: "Min. 6 characters",
                      className: "font-mono text-sm h-10 bg-background border-input pr-10",
                      disabled: isSubmitting,
                      "data-ocid": "register.password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword((v) => !v),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": showPassword ? "Hide password" : "Show password",
                      children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "confirm-password",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Confirm Password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "confirm-password",
                      type: showConfirm ? "text" : "password",
                      autoComplete: "new-password",
                      value: form.confirmPassword,
                      onChange: set("confirmPassword"),
                      placeholder: "Re-enter password",
                      className: "font-mono text-sm h-10 bg-background border-input pr-10",
                      disabled: isSubmitting,
                      "data-ocid": "register.confirm_password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowConfirm((v) => !v),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": showConfirm ? "Hide confirm password" : "Show confirm password",
                      children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                form.confirmPassword && form.password !== form.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[11px] text-destructive font-mono",
                    "data-ocid": "register.password_match_error",
                    children: "Passwords don't match"
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "border border-destructive/50 bg-destructive/10 px-3 py-2.5 text-xs text-destructive font-mono",
                  role: "alert",
                  "data-ocid": "register.error_state",
                  children: error
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isSubmitting,
                  className: "w-full font-mono uppercase tracking-widest h-11 gap-2 mt-1",
                  "data-ocid": "register.submit_button",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 border border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                    "Creating account…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
                    "Create Account"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground pt-1", children: [
                "Already have an account?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/login",
                    className: "text-primary hover:underline font-semibold",
                    "data-ocid": "register.login_link",
                    children: "Sign in"
                  }
                )
              ] })
            ]
          }
        )
      ] })
    }
  );
}
export {
  RegisterPage as default
};
