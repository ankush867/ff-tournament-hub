import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { ExternalBlob } from "@caffeineai/object-storage";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Clock,
  Copy,
  Smartphone,
  Upload,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { PageLoader } from "../components/LoadingSpinner";
import { useMatch, useMyPayments } from "../hooks/useBackend";
import type { PaymentStatus } from "../types";

const UPI_ID = "7762067909@ibl";

// Status badge colours
const STATUS_STYLES: Record<PaymentStatus, string> = {
  pending: "text-accent border-accent/40 bg-accent/10",
  approved: "text-primary border-primary/40 bg-primary/10",
  rejected: "text-destructive border-destructive/40 bg-destructive/10",
};

const STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

export default function PaymentPage() {
  const { matchId } = useParams({ from: "/protected/payment/$matchId" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  const { data: match, isLoading: matchLoading } = useMatch(matchId);
  const { data: myPayments, isLoading: paymentsLoading } = useMyPayments();

  // Check if user already has a payment for this match
  const existingPayment = useMemo(
    () => myPayments?.find((p) => p.matchId === matchId) ?? null,
    [myPayments, matchId],
  );

  const [utrNumber, setUtrNumber] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(
    null,
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [upiCopied, setUpiCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Build UPI deep link
  const upiLink = match
    ? `upi://pay?pa=${UPI_ID}&pn=FF+Tournament&am=${match.entryFee}&cu=INR`
    : `upi://pay?pa=${UPI_ID}&pn=FF+Tournament&cu=INR`;

  const handleCopyUPI = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        screenshot: "Only image files are allowed",
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
    const newErrors: Record<string, string> = {};
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !match || !screenshotFile || !actor) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Build ExternalBlob with progress tracking
      const bytes = new Uint8Array(await screenshotFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });

      setIsUploading(false);
      setIsSubmitting(true);

      // Call backend submitPayment with ExternalBlob
      await (
        actor as unknown as {
          submitPayment: (p: {
            matchId: string;
            utrNumber: string;
            screenshot: ExternalBlob;
            amount: number;
          }) => Promise<void>;
        }
      ).submitPayment({
        matchId,
        utrNumber: utrNumber.trim(),
        screenshot: blob,
        amount: match.entryFee,
      });

      queryClient.invalidateQueries({ queryKey: ["myPayments"] });
      toast.success("Payment submitted! Admin will review shortly.", {
        duration: 5000,
      });
      navigate({ to: "/match/$id", params: { id: matchId } });
    } catch (err) {
      setIsUploading(false);
      setIsSubmitting(false);
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(`Failed to submit payment: ${message}`);
    }
  };

  const isLoading = matchLoading || paymentsLoading;
  const isBusy = isUploading || isSubmitting;

  if (isLoading) return <PageLoader label="Loading payment…" />;

  if (!match) {
    return (
      <div
        className="max-w-xl mx-auto px-4 py-12 text-center"
        data-ocid="payment.error_state"
      >
        <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-3" />
        <p className="text-muted-foreground font-mono text-sm mb-3">
          Match not found.
        </p>
        <Link
          to="/matches"
          className="text-primary text-xs font-mono uppercase tracking-widest hover:underline"
          data-ocid="payment.back_link"
        >
          ← Back to matches
        </Link>
      </div>
    );
  }

  // Existing payment — show status instead of form
  if (existingPayment) {
    const status = existingPayment.status as PaymentStatus;
    return (
      <div
        className="max-w-xl mx-auto px-4 py-8"
        data-ocid="payment.existing_state"
      >
        <Link
          to="/match/$id"
          params={{ id: matchId }}
          className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 transition-colors"
          data-ocid="payment.back_link"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to match
        </Link>

        <h1 className="font-display font-bold text-xl uppercase tracking-wide text-foreground mb-1">
          Payment Status
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your payment for{" "}
          <span className="text-foreground font-semibold">{match.name}</span>
        </p>

        <div className="bg-card border border-border p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                Payment Status
              </p>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest px-2.5 py-1 border ${STATUS_STYLES[status]}`}
              >
                {STATUS_LABELS[status]}
              </span>
            </div>
          </div>

          <div className="border-t border-border pt-4 grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <p className="text-muted-foreground uppercase tracking-widest mb-1">
                UTR Number
              </p>
              <p className="text-foreground">{existingPayment.utrNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase tracking-widest mb-1">
                Amount
              </p>
              <p className="text-primary font-bold">
                ₹{existingPayment.amount}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground uppercase tracking-widest mb-1">
                Submitted
              </p>
              <p className="text-foreground">
                {new Date(existingPayment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {status === "rejected" && (
            <div className="border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-mono text-destructive">
              Your payment was rejected. Please contact support on WhatsApp for
              assistance.
            </div>
          )}

          <div className="flex gap-2 mt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 font-mono text-xs uppercase tracking-widest h-9"
              onClick={() =>
                navigate({ to: "/match/$id", params: { id: matchId } })
              }
              data-ocid="payment.view_match_button"
            >
              View Match
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 font-mono text-xs uppercase tracking-widest h-9"
              onClick={() => navigate({ to: "/dashboard" })}
              data-ocid="payment.go_dashboard_button"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main payment form
  return (
    <div className="max-w-xl mx-auto px-4 py-8" data-ocid="payment.page">
      <Link
        to="/match/$id"
        params={{ id: matchId }}
        className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 transition-colors"
        data-ocid="payment.back_link"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to match
      </Link>

      <h1 className="font-display font-bold text-xl uppercase tracking-wide text-foreground mb-1">
        Complete Payment
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Pay entry fee of{" "}
        <span className="font-bold text-primary">₹{match.entryFee}</span> to
        join <span className="text-foreground font-semibold">{match.name}</span>
      </p>

      {/* UPI Payment Section */}
      <div className="bg-card border border-border p-5 mb-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
          Step 1 — Pay via UPI
        </p>

        {/* UPI QR visual */}
        <a
          href={upiLink}
          className="group flex flex-col items-center justify-center gap-3 border border-primary/30 bg-primary/5 hover:bg-primary/10 p-6 mb-4 transition-smooth"
          data-ocid="payment.upi_deeplink"
          aria-label="Open in UPI app"
        >
          {/* Stylised QR-grid placeholder */}
          <div className="relative w-28 h-28 border-2 border-primary/60 p-2 glow-primary">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(var(--primary)/0.25) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary)/0.25) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
            {/* Corner anchors */}
            {["top-left", "top-right", "bottom-left"].map((pos) => {
              const posClass =
                pos === "top-left"
                  ? "top-0 left-0"
                  : pos === "top-right"
                    ? "top-0 right-0"
                    : "bottom-0 left-0";
              return (
                <div
                  key={pos}
                  className={`absolute ${posClass} w-6 h-6 border-2 border-primary bg-card`}
                />
              );
            })}
            <div className="absolute inset-0 flex items-center justify-center">
              <Smartphone className="h-7 w-7 text-primary" />
            </div>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-primary group-hover:underline">
            Tap to open UPI app
          </span>
        </a>

        {/* UPI ID + Copy */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-background border border-border px-3 py-2 font-mono text-sm text-foreground select-all">
            {UPI_ID}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 font-mono text-xs uppercase tracking-widest h-9 shrink-0"
            onClick={handleCopyUPI}
            data-ocid="payment.copy_upi_button"
          >
            {upiCopied ? (
              <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {upiCopied ? "Copied!" : "Copy"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground font-mono">
          Send exactly{" "}
          <span className="text-foreground font-bold">₹{match.entryFee}</span> ·
          Note the UTR / Ref number after payment
        </p>
      </div>

      {/* Proof Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border p-5 flex flex-col gap-4"
        data-ocid="payment.form"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Step 2 — Submit proof
        </p>

        {/* UTR Number */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="utr"
            className="font-mono text-xs uppercase tracking-widest"
          >
            UTR / Reference Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="utr"
            value={utrNumber}
            onChange={(e) => {
              setUtrNumber(e.target.value.replace(/\D/g, "").slice(0, 12));
              setErrors((prev) => ({ ...prev, utr: "" }));
            }}
            placeholder="12-digit transaction reference"
            maxLength={12}
            inputMode="numeric"
            className="font-mono text-sm h-10"
            data-ocid="payment.utr_input"
            disabled={isBusy}
          />
          {errors.utr && (
            <p
              className="text-xs text-destructive flex items-center gap-1 mt-1 font-mono"
              data-ocid="payment.utr_field_error"
            >
              {errors.utr}
            </p>
          )}
        </div>

        {/* Screenshot Upload */}
        <div className="flex flex-col gap-1.5">
          <Label className="font-mono text-xs uppercase tracking-widest">
            Payment Screenshot <span className="text-destructive">*</span>
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload payment screenshot"
            disabled={isBusy}
          />

          {screenshotPreview ? (
            <div className="relative border border-primary/40 bg-primary/5 p-2">
              <img
                src={screenshotPreview}
                alt="Payment screenshot preview"
                className="max-h-40 w-full object-contain"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[70%]">
                  {screenshotFile?.name}
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline"
                    data-ocid="payment.screenshot_change_button"
                    disabled={isBusy}
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={clearScreenshot}
                    className="text-[10px] font-mono uppercase tracking-widest text-destructive hover:underline"
                    data-ocid="payment.screenshot_remove_button"
                    disabled={isBusy}
                    aria-label="Remove screenshot"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 border border-dashed p-8 transition-smooth ${
                errors.screenshot
                  ? "border-destructive/60 bg-destructive/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/20"
              }`}
              data-ocid="payment.screenshot_upload_button"
              disabled={isBusy}
            >
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Upload screenshot
              </span>
              <span className="text-[11px] text-muted-foreground">
                PNG / JPG · max 5 MB
              </span>
            </button>
          )}

          {errors.screenshot && (
            <p
              className="text-xs text-destructive flex items-center gap-1 mt-1 font-mono"
              data-ocid="payment.screenshot_field_error"
            >
              {errors.screenshot}
            </p>
          )}
        </div>

        {/* Upload progress */}
        {isUploading && (
          <div
            className="flex flex-col gap-1.5"
            data-ocid="payment.upload_loading_state"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Uploading screenshot…
              </span>
              <span className="text-[10px] font-mono text-primary">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-muted">
              <div
                className="h-full bg-primary transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {isSubmitting && !isUploading && (
          <div
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
            data-ocid="payment.submit_loading_state"
          >
            <span className="animate-pulse text-primary">●</span>
            Submitting payment…
          </div>
        )}

        <Button
          type="submit"
          disabled={isBusy}
          className="w-full h-11 font-mono uppercase tracking-widest mt-1"
          data-ocid="payment.submit_button"
        >
          {isBusy
            ? isUploading
              ? `Uploading… ${uploadProgress}%`
              : "Submitting…"
            : `Submit Payment · ₹${match.entryFee}`}
        </Button>

        <p className="text-[10px] text-center text-muted-foreground font-mono">
          Need help?{" "}
          <a
            href="https://wa.me/919128292126?text=Hello%20I%20need%20help%20with%20payment"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            data-ocid="payment.whatsapp_support_link"
          >
            Chat on WhatsApp
          </a>
        </p>
      </form>
    </div>
  );
}
