import { c as createLucideIcon, u as useNavigate, b as useAuth, d as useQueryClient, r as reactExports, j as jsxRuntimeExports, Z as Zap, B as Button, L as Link } from "./index-DJ3jSp6d.js";
import { I as Input } from "./input-DUfuimul.js";
import { L as Label } from "./label-Bwc9BENV.js";
import { u as useActor, c as createActor } from "./backend-DPSn0mZX.js";
import { E as EyeOff, a as Eye } from "./eye-D00-3ofo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [identifier, setIdentifier] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  const handleSubmit = async (e) => {
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
      const typedActor = actor;
      const user = await typedActor.loginUser(identifier.trim(), password);
      if (!user) {
        setError(
          "Invalid credentials. Please check your username and password."
        );
        return;
      }
      let isAdmin = false;
      try {
        isAdmin = await typedActor.isCallerAdmin();
      } catch {
      }
      if (isAdmin) {
        localStorage.setItem("ff_is_admin", "true");
      } else {
        localStorage.removeItem("ff_is_admin");
      }
      queryClient.setQueryData(["myProfile"], user);
      login();
    } catch (_err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[88vh] flex items-center justify-center px-4 py-12 bg-background",
      "data-ocid": "login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl uppercase tracking-widest text-foreground", children: "FF Tournament Hub" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mt-1 uppercase tracking-widest", children: "Sign in to your account" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            noValidate: true,
            className: "bg-card border border-border p-6 flex flex-col gap-5",
            "data-ocid": "login.form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "identifier",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Username / Email / Phone"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "identifier",
                    type: "text",
                    autoComplete: "username",
                    value: identifier,
                    onChange: (e) => setIdentifier(e.target.value),
                    placeholder: "your_username",
                    className: "font-mono text-sm h-10 bg-background border-input",
                    disabled: isSubmitting,
                    "data-ocid": "login.identifier_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "password",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "password",
                      type: showPassword ? "text" : "password",
                      autoComplete: "current-password",
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      placeholder: "••••••••",
                      className: "font-mono text-sm h-10 bg-background border-input pr-10",
                      disabled: isSubmitting,
                      "data-ocid": "login.password_input"
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
              error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "border border-destructive/50 bg-destructive/10 px-3 py-2.5 text-xs text-destructive font-mono",
                  role: "alert",
                  "data-ocid": "login.error_state",
                  children: error
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isSubmitting || !identifier.trim() || !password.trim(),
                  className: "w-full font-mono uppercase tracking-widest h-11 gap-2 mt-1",
                  "data-ocid": "login.submit_button",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 border border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                    "Signing in…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                    "Sign In"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                "New here?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/register",
                    className: "text-primary hover:underline font-semibold",
                    "data-ocid": "login.register_link",
                    children: "Create account"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[11px] text-muted-foreground font-mono mt-4 leading-relaxed px-2", children: "Use your registered username, email, or phone number with your password." })
      ] })
    }
  );
}
export {
  LoginPage as default
};
