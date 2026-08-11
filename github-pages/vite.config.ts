import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: currentDir,
  base: "/resume/",
  publicDir: resolve(currentDir, "../public"),
  plugins: [react()],
  build: {
    outDir: resolve(currentDir, "../github-pages-dist"),
    emptyOutDir: true,
  },
});
