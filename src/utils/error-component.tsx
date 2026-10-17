// Global error boundary fallback — shown when any route throws an unhandled error.
// Uses the project's design token system (brass, bg, surface) instead of generic colors.
import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert, Home, RotateCcw } from "lucide-react";

// Extract a human-readable message from whatever was thrown.
function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return "An unexpected error occurred. Try reloading the page.";
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const msg = errorMessage(error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center bg-bg text-fg">
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-12" strokeWidth={1.5} />
      </span>
      <h1 className="font-display text-2xl text-fg">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-muted leading-relaxed">
        {msg}
      </p>
      <div className="flex items-center gap-3 mt-2">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-xs font-semibold text-ink hover:bg-brass-hover transition-colors active:scale-95"
        >
          <RotateCcw className="size-3.5" />
          Reload page
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-xs font-medium text-muted hover:text-fg hover:border-brass transition-colors"
        >
          <Home className="size-3.5" />
          Go home
        </a>
      </div>
    </main>
  );
}
