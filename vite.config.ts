/**
 * Vite build configuration.
 *
 * Plugins:
 * - tsconfigPaths:  resolves @/* path aliases from tsconfig.json
 * - tailwindcss:    Tailwind v4 via native Vite plugin (no PostCSS needed)
 * - viteReact:      JSX transform for React 19
 * - legacy:         generates nomodule fallback bundles for shared hosting (e.g. InfinityFree)
 *
 * build.base = "./" ensures all asset paths are relative, which is required
 * when the site is not deployed at a domain root (shared hosting, subfolders).
 */
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    viteReact(),
    legacy({
      targets: ["defaults", "not IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
  },
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
