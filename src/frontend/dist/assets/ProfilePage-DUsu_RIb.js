import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as cn, b as useAuth, d as useQueryClient, u as useNavigate, U as User, a as Shield, B as Button } from "./index-DJ3jSp6d.js";
import { B as Badge } from "./badge-BuGF_AhT.js";
import { I as Input } from "./input-DUfuimul.js";
import { P as Primitive, L as Label } from "./label-Bwc9BENV.js";
import { S as Skeleton } from "./skeleton-DX7HOlby.js";
import { u as useActor, c as createActor } from "./backend-DPSn0mZX.js";
import { u as ue } from "./index-Dsszj1e9.js";
import { a as useMyProfile, b as useMyPayments } from "./useBackend-CUConDby.js";
import { W as Wallet } from "./wallet-DDejRzgz.js";
import { G as Gamepad2 } from "./gamepad-2-CmIK8hNm.js";
import { L as Lock } from "./lock-PPsfBIG9.js";
import { E as EyeOff, a as Eye } from "./eye-D00-3ofo.js";
import { T as Trophy } from "./trophy-jt2i0eZn.js";
import { C as ChevronRight } from "./chevron-right-UM97vO6F.js";
import { C as CircleCheck } from "./circle-check-C3i03Anp.js";
import { C as CircleX } from "./circle-x-cSV-jRds.js";
import { C as Clock } from "./clock-Cp8UjU70.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function PaymentStatusBadge({ status }) {
  if (status === "approved")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/20 text-primary border-primary/40 font-mono text-[10px] uppercase tracking-widest gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
      " Approved"
    ] });
  if (status === "rejected")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive/20 text-destructive border-destructive/40 font-mono text-[10px] uppercase tracking-widest gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
      " Rejected"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent/20 text-accent border-accent/40 font-mono text-[10px] uppercase tracking-widest gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
    " Pending"
  ] });
}
function MatchPaymentRow({
  payment,
  index
}) {
  const isApproved = payment.status === "approved";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col sm:flex-row sm:items-center gap-3 py-4 border-b border-border last:border-0",
      "data-ocid": `profile.match_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: payment.matchName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground mt-0.5", children: [
            "₹",
            payment.amount,
            " • UTR: ",
            payment.utrNumber
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { status: payment.status }),
          isApproved && payment.matchId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/30 bg-primary/10 px-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "Credentials available" })
          ] })
        ] })
      ]
    }
  );
}
function ProfilePage() {
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: payments, isLoading: paymentsLoading } = useMyPayments();
  const { principalId, isAdmin, logout } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [username, setUsername] = reactExports.useState("");
  const [ffUid, setFfUid] = reactExports.useState("");
  const [isSavingInfo, setIsSavingInfo] = reactExports.useState(false);
  const [oldPassword, setOldPassword] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showOld, setShowOld] = reactExports.useState(false);
  const [showNew, setShowNew] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [isSavingPwd, setIsSavingPwd] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setFfUid(profile.ffUid);
    }
  }, [profile]);
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      ue.error("Username cannot be empty");
      return;
    }
    setIsSavingInfo(true);
    try {
      if (actor) {
        await actor.updateMyProfile({ username: username.trim(), ffUid: ffUid.trim() });
      }
      await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      ue.success("Profile updated successfully");
    } catch {
      ue.error("Failed to update profile");
    } finally {
      setIsSavingInfo(false);
    }
  };
  const handleSavePwd = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      ue.error("All password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      ue.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      ue.error("Password must be at least 6 characters");
      return;
    }
    setIsSavingPwd(true);
    try {
      if (actor) {
        await actor.changePassword({ oldPassword, newPassword });
      }
      ue.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      ue.error("Failed to change password — check your current password");
    } finally {
      setIsSavingPwd(false);
    }
  };
  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };
  const approvedPayments = (payments == null ? void 0 : payments.filter((p) => p.status === "approved")) ?? [];
  const totalSpent = (payments == null ? void 0 : payments.reduce(
    (sum, p) => sum + (p.status !== "rejected" ? p.amount : 0),
    0
  )) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-8 space-y-6",
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground mb-1", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl uppercase tracking-wide text-foreground", children: "My Profile" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-4 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-none bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground truncate", children: (profile == null ? void 0 : profile.username) ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground truncate", children: principalId ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 border border-accent/60 bg-accent/10 px-2 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3 w-3 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-accent font-bold", children: "Admin" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 border border-border bg-muted/20 px-2 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3 w-3 text-muted-foreground" }),
              profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-12" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono uppercase tracking-widest text-foreground font-bold", children: [
                "₹",
                (profile == null ? void 0 : profile.walletBalance) ?? 0
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSaveInfo,
            className: "bg-card border border-border p-6 space-y-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-foreground", children: "Player Info" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "username",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Username"
                  }
                ),
                profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "username",
                    value: username,
                    onChange: (e) => setUsername(e.target.value),
                    placeholder: "Your display name",
                    className: "font-mono text-sm h-10",
                    "data-ocid": "profile.username_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "ffuid",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Free Fire UID"
                  }
                ),
                profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ffuid",
                    value: ffUid,
                    onChange: (e) => setFfUid(e.target.value),
                    placeholder: "Your in-game UID",
                    className: "font-mono text-sm h-10",
                    "data-ocid": "profile.ffuid_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Contact (read-only)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 flex items-center bg-muted/20 border border-border px-3 font-mono text-sm text-muted-foreground", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }) : (profile == null ? void 0 : profile.contact) ?? "—" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isSavingInfo || profileLoading,
                  size: "sm",
                  className: "font-mono uppercase tracking-widest",
                  "data-ocid": "profile.save_info_button",
                  children: isSavingInfo ? "Saving…" : "Save Player Info"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSavePwd,
            className: "bg-card border border-border p-6 space-y-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-foreground", children: "Change Password" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "oldPassword",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Current Password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "oldPassword",
                      type: showOld ? "text" : "password",
                      value: oldPassword,
                      onChange: (e) => setOldPassword(e.target.value),
                      placeholder: "••••••••",
                      className: "font-mono text-sm h-10 pr-10",
                      "data-ocid": "profile.old_password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowOld((v) => !v),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": showOld ? "Hide password" : "Show password",
                      children: showOld ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "newPassword",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "New Password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "newPassword",
                      type: showNew ? "text" : "password",
                      value: newPassword,
                      onChange: (e) => setNewPassword(e.target.value),
                      placeholder: "Min. 6 characters",
                      className: "font-mono text-sm h-10 pr-10",
                      "data-ocid": "profile.new_password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowNew((v) => !v),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": showNew ? "Hide password" : "Show password",
                      children: showNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "confirmPassword",
                    className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Confirm New Password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "confirmPassword",
                      type: showConfirm ? "text" : "password",
                      value: confirmPassword,
                      onChange: (e) => setConfirmPassword(e.target.value),
                      placeholder: "Re-enter new password",
                      className: "font-mono text-sm h-10 pr-10",
                      "data-ocid": "profile.confirm_password_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowConfirm((v) => !v),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": showConfirm ? "Hide password" : "Show password",
                      children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                confirmPassword && newPassword !== confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive font-mono mt-1",
                    "data-ocid": "profile.password_mismatch_error",
                    children: "Passwords do not match"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isSavingPwd,
                  size: "sm",
                  variant: "secondary",
                  className: "font-mono uppercase tracking-widest",
                  "data-ocid": "profile.save_password_button",
                  children: isSavingPwd ? "Changing…" : "Change Password"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm uppercase tracking-widest text-foreground", children: "Joined Matches" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: !paymentsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: [
                approvedPayments.length,
                " approved"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: [
                "₹",
                totalSpent,
                " spent"
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mb-2" }),
          paymentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-4 py-2",
              "data-ocid": "profile.matches_loading_state",
              children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4 rounded-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" })
              ] }, i))
            }
          ) : !payments || payments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-10 text-center",
              "data-ocid": "profile.matches_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-8 w-8 text-muted-foreground/40 mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-muted-foreground text-sm", children: "No matches joined yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "Browse open matches and register to play" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "mt-4 font-mono uppercase tracking-widest text-xs border-primary/40 text-primary hover:bg-primary/10",
                    onClick: () => navigate({ to: "/matches" }),
                    "data-ocid": "profile.browse_matches_button",
                    children: "Browse Matches"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "profile.matches_list", children: payments.map((payment, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MatchPaymentRow, { payment, index: i }, payment.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-destructive/30 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-widest text-destructive mb-2", children: "Sign Out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "You'll be signed out of your Internet Identity session on this device." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleLogout,
              className: "border-destructive/40 text-destructive hover:bg-destructive/10 font-mono text-xs uppercase tracking-widest gap-2",
              "data-ocid": "profile.logout_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
                "Sign Out"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ProfilePage as default
};
