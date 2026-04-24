import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  className = "",
}: ErrorMessageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-12 px-4 text-center ${className}`}
      data-ocid="error_state"
    >
      <div className="flex h-12 w-12 items-center justify-center border border-destructive/40 bg-destructive/10">
        <AlertTriangle
          className="h-6 w-6 text-destructive"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-widest">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2"
          data-ocid="error_state.retry_button"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
}

export function InlineError({ message }: { message: string }) {
  return (
    <p
      className="text-xs text-destructive flex items-center gap-1 mt-1"
      data-ocid="field_error"
    >
      <AlertTriangle className="h-3 w-3 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}
