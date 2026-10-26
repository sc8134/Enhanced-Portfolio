// Styled "designer" ampersand — renders `&` as an italic display-serif brass
// glyph so it reads as an intentional typographic flourish rather than a plain
// ampersand. Use `amp(label)` on data-driven strings and `<Amp />` inline in
// JSX text. Pass `ink` on the light/paper sections for contrast.
import type { ReactNode } from "react";

/**
 * Split a string on `&` and wrap each ampersand in a styled span. Returns the
 * original string unchanged when it contains no `&`, so it's safe to apply to
 * any label.
 */
export function amp(text: string, ink = false): ReactNode {
  if (!text.includes("&")) return text;
  const cls = ink ? "amp amp-ink" : "amp";
  const parts = text.split("&");
  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i > 0) nodes.push(<span key={`amp${i}`} className={cls}>&amp;</span>);
    if (part) nodes.push(part);
  });
  return <>{nodes}</>;
}

/** Inline styled ampersand for direct use in JSX text. */
export function Amp({ ink = false }: { ink?: boolean }) {
  return <span className={ink ? "amp amp-ink" : "amp"}>&amp;</span>;
}
