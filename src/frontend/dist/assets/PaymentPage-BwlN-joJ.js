import { c as createLucideIcon, e as useParams, u as useNavigate, d as useQueryClient, r as reactExports, j as jsxRuntimeExports, P as PageLoader, L as Link, B as Button, X, E as ExternalBlob } from "./index-DJ3jSp6d.js";
import { I as Input } from "./input-DUfuimul.js";
import { L as Label } from "./label-Bwc9BENV.js";
import { u as useActor, c as createActor } from "./backend-DPSn0mZX.js";
import { u as ue } from "./index-Dsszj1e9.js";
import { c as useMatch, b as useMyPayments } from "./useBackend-CUConDby.js";
import { A as ArrowLeft } from "./arrow-left-HfgH8Z0A.js";
import { C as Clock } from "./clock-Cp8UjU70.js";
import { C as Copy } from "./copy-DeTuURpH.js";
import { U as Upload } from "./upload-M279uyg6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
const UPI_ID = "7762067909@ibl";
const STATUS_STYLES = {
  pending: "text-accent border-accent/40 bg-accent/10",
  approved: "text-primary border-primary/40 bg-primary/10",
  rejected: "text-destructive border-destructive/40 bg-destructive/10"
};
const STATUS_LABELS = {
  pending: "Under Review",
  approved: "Approved",
  rejected: "Rejected"
};
function PaymentPage() {
  const { matchId } = useParams({ from: "/protected/payment/$matchId" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  const { data: match, isLoading: matchLoading } = useMatch(matchId);
  const { data: myPayments, isLoading: paymentsLoading } = useMyPayments();
  const existingPayment = reactExports.useMemo(
    () => (myPayments == null ? void 0 : myPayments.find((p) => p.matchId === matchId)) ?? null,
    [myPayments, matchId]
  );
  const [utrNumber, setUtrNumber] = reactExports.useState("");
  const [screenshotFile, setScreenshotFile] = reactExports.useState(null);
  const [screenshotPreview, setScreenshotPreview] = reactExports.useState(
    null
  );
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [upiCopied, setUpiCopied] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const upiLink = match ? `upi://pay?pa=${UPI_ID}&pn=FF+Tournament&am=${match.entryFee}&cu=INR` : `upi://pay?pa=${UPI_ID}&pn=FF+Tournament&cu=INR`;
  const handleCopyUPI = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2e3);
  };
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        screenshot: "Only image files are allowed"
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, screenshot: "File must be under 5MB" }));
      return;
    }
    setScreenshotFile(file);
    setScreenshotPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, screenshot: "" }));
  };
  const clearScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const validate = () => {
    const newErrors = {};
    if (!utrNumber.trim()) {
      newErrors.utr = "UTR number is required";
    } else if (!/^\d{12}$/.test(utrNumber.trim())) {
      newErrors.utr = "UTR must be exactly 12 digits";
    }
    if (!screenshotFile) {
      newErrors.screenshot = "Payment screenshot is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || !match || !screenshotFile || !actor) return;
    try {
      setIsUploading(true);
      setUploadProgress(0);
      const bytes = new Uint8Array(await screenshotFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      setIsUploading(false);
      setIsSubmitting(true);
      await actor.submitPayment({
        matchId,
        utrNumber: utrNumber.trim(),
        screenshot: blob,
        amount: match.entryFee
      });
      queryClient.invalidateQueries({ queryKey: ["myPayments"] });
      ue.success("Payment submitted! Admin will review shortly.", {
        duration: 5e3
      });
      navigate({ to: "/match/$id", params: { id: matchId } });
    } catch (err) {
      setIsUploading(false);
      setIsSubmitting(false);
      const message = err instanceof Error ? err.message : "Unknown error";
      ue.error(`Failed to submit payment: ${message}`);
    }
  };
  const isLoading = matchLoading || paymentsLoading;
  const isBusy = isUploading || isSubmitting;
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Loading payment…" });
  if (!match) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-xl mx-auto px-4 py-12 text-center",
        "data-ocid": "payment.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mx-auto h-10 w-10 text-destructive mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-mono text-sm mb-3", children: "Match not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/matches",
              className: "text-primary text-xs font-mono uppercase tracking-widest hover:underline",
              "data-ocid": "payment.back_link",
              children: "← Back to matches"
            }
          )
        ]
      }
    );
  }
  if (existingPayment) {
    const status = existingPayment.status;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-xl mx-auto px-4 py-8",
        "data-ocid": "payment.existing_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/match/$id",
              params: { id: matchId },
              className: "flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 transition-colors",
              "data-ocid": "payment.back_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
                "Back to match"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl uppercase tracking-wide text-foreground mb-1", children: "Payment Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
            "Your payment for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: match.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-6 flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1", children: "Payment Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest px-2.5 py-1 border ${STATUS_STYLES[status]}`,
                    children: STATUS_LABELS[status]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 grid grid-cols-2 gap-3 text-xs font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground uppercase tracking-widest mb-1", children: "UTR Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: existingPayment.utrNumber })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground uppercase tracking-widest mb-1", children: "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-bold", children: [
                  "₹",
                  existingPayment.amount
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground uppercase tracking-widest mb-1", children: "Submitted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: new Date(existingPayment.createdAt).toLocaleString() })
              ] })
            ] }),
            status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-mono text-destructive", children: "Your payment was rejected. Please contact support on WhatsApp for assistance." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "flex-1 font-mono text-xs uppercase tracking-widest h-9",
                  onClick: () => navigate({ to: "/match/$id", params: { id: matchId } }),
                  "data-ocid": "payment.view_match_button",
                  children: "View Match"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "flex-1 font-mono text-xs uppercase tracking-widest h-9",
                  onClick: () => navigate({ to: "/dashboard" }),
                  "data-ocid": "payment.go_dashboard_button",
                  children: "Dashboard"
                }
              )
            ] })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 py-8", "data-ocid": "payment.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/match/$id",
        params: { id: matchId },
        className: "flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 transition-colors",
        "data-ocid": "payment.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          "Back to match"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl uppercase tracking-wide text-foreground mb-1", children: "Complete Payment" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
      "Pay entry fee of",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
        "₹",
        match.entryFee
      ] }),
      " to join ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: match.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-5 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4", children: "Step 1 — Pay via UPI" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: upiLink,
          className: "group flex flex-col items-center justify-center gap-3 border border-primary/30 bg-primary/5 hover:bg-primary/10 p-6 mb-4 transition-smooth",
          "data-ocid": "payment.upi_deeplink",
          "aria-label": "Open in UPI app",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 border-2 border-primary/60 p-2 glow-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-full h-full",
                  style: {
                    backgroundImage: "linear-gradient(oklch(var(--primary)/0.25) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary)/0.25) 1px, transparent 1px)",
                    backgroundSize: "10px 10px"
                  }
                }
              ),
              ["top-left", "top-right", "bottom-left"].map((pos) => {
                const posClass = pos === "top-left" ? "top-0 left-0" : pos === "top-right" ? "top-0 right-0" : "bottom-0 left-0";
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `absolute ${posClass} w-6 h-6 border-2 border-primary bg-card`
                  },
                  pos
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-7 w-7 text-primary" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-primary group-hover:underline", children: "Tap to open UPI app" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-background border border-border px-3 py-2 font-mono text-sm text-foreground select-all", children: UPI_ID }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-1.5 font-mono text-xs uppercase tracking-widest h-9 shrink-0",
            onClick: handleCopyUPI,
            "data-ocid": "payment.copy_upi_button",
            children: [
              upiCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
              upiCopied ? "Copied!" : "Copy"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
        "Send exactly",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-bold", children: [
          "₹",
          match.entryFee
        ] }),
        " · Note the UTR / Ref number after payment"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-card border border-border p-5 flex flex-col gap-4",
        "data-ocid": "payment.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Step 2 — Submit proof" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "utr",
                className: "font-mono text-xs uppercase tracking-widest",
                children: [
                  "UTR / Reference Number ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "utr",
                value: utrNumber,
                onChange: (e) => {
                  setUtrNumber(e.target.value.replace(/\D/g, "").slice(0, 12));
                  setErrors((prev) => ({ ...prev, utr: "" }));
                },
                placeholder: "12-digit transaction reference",
                maxLength: 12,
                inputMode: "numeric",
                className: "font-mono text-sm h-10",
                "data-ocid": "payment.utr_input",
                disabled: isBusy
              }
            ),
            errors.utr && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive flex items-center gap-1 mt-1 font-mono",
                "data-ocid": "payment.utr_field_error",
                children: errors.utr
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-mono text-xs uppercase tracking-widest", children: [
              "Payment Screenshot ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                onChange: handleFileChange,
                className: "hidden",
                "aria-label": "Upload payment screenshot",
                disabled: isBusy
              }
            ),
            screenshotPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative border border-primary/40 bg-primary/5 p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: screenshotPreview,
                  alt: "Payment screenshot preview",
                  className: "max-h-40 w-full object-contain"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground truncate max-w-[70%]", children: screenshotFile == null ? void 0 : screenshotFile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        var _a;
                        return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                      },
                      className: "text-[10px] font-mono uppercase tracking-widest text-primary hover:underline",
                      "data-ocid": "payment.screenshot_change_button",
                      disabled: isBusy,
                      children: "Change"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: clearScreenshot,
                      className: "text-[10px] font-mono uppercase tracking-widest text-destructive hover:underline",
                      "data-ocid": "payment.screenshot_remove_button",
                      disabled: isBusy,
                      "aria-label": "Remove screenshot",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                    }
                  )
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: `flex flex-col items-center justify-center gap-2 border border-dashed p-8 transition-smooth ${errors.screenshot ? "border-destructive/60 bg-destructive/5" : "border-border hover:border-primary/50 hover:bg-muted/20"}`,
                "data-ocid": "payment.screenshot_upload_button",
                disabled: isBusy,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest", children: "Upload screenshot" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "PNG / JPG · max 5 MB" })
                ]
              }
            ),
            errors.screenshot && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive flex items-center gap-1 mt-1 font-mono",
                "data-ocid": "payment.screenshot_field_error",
                children: errors.screenshot
              }
            )
          ] }),
          isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col gap-1.5",
              "data-ocid": "payment.upload_loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Uploading screenshot…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-primary", children: [
                    uploadProgress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-primary transition-all duration-200",
                    style: { width: `${uploadProgress}%` }
                  }
                ) })
              ]
            }
          ),
          isSubmitting && !isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground",
              "data-ocid": "payment.submit_loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse text-primary", children: "●" }),
                "Submitting payment…"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isBusy,
              className: "w-full h-11 font-mono uppercase tracking-widest mt-1",
              "data-ocid": "payment.submit_button",
              children: isBusy ? isUploading ? `Uploading… ${uploadProgress}%` : "Submitting…" : `Submit Payment · ₹${match.entryFee}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-center text-muted-foreground font-mono", children: [
            "Need help?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://wa.me/919128292126?text=Hello%20I%20need%20help%20with%20payment",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline",
                "data-ocid": "payment.whatsapp_support_link",
                children: "Chat on WhatsApp"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  PaymentPage as default
};
