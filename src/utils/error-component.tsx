// Global error boundary fallback — shown when any route throws an unhandled error.
// TanStack Router renders this via the `defaultErrorComponent` option in router.tsx.
import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

// Extract a human-readable message from whatever was thrown.
function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return "An unexpected error occurred. Try reloading the page.";
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-950 text-zinc-50">
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-zinc-400">
        {errorMessage(error)}
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-2 rounded-full border border-zinc-700 px-4 py-2 text-xs text-zinc-400 hover:text-zinc-50 transition-colors"
      >
        Reload page
      </button>
    </main>
  );
}
