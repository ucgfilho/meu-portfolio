import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import crypto from "node:crypto";

if (typeof crypto.getRandomValues !== "function") {
  crypto.getRandomValues = crypto.webcrypto.getRandomValues.bind(
    crypto.webcrypto,
  );
}

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, "crypto", {
    value: crypto.webcrypto,
  });
}

function inlineCssPlugin(): Plugin {
  return {
    name: "vite-plugin-inline-css",
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      const htmlChunk = bundle["index.html"];
      if (!htmlChunk || htmlChunk.type !== "asset" || typeof htmlChunk.source !== "string") {
        return;
      }

      let html = htmlChunk.source;
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.endsWith(".css") && asset.type === "asset" && typeof asset.source === "string") {
          const escapedFileName = fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const linkRegex = new RegExp(
            `<link[^>]+href=["']/?${escapedFileName}["'][^>]*>`,
            "i",
          );
          if (linkRegex.test(html)) {
            html = html.replace(linkRegex, `<style>${asset.source.trim()}</style>`);
            delete bundle[fileName];
          }
        }
      }
      htmlChunk.source = html;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), inlineCssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "icons-vendor": ["lucide-react", "react-icons/si", "react-icons/fa6", "country-flag-icons/react/3x2"],
          "i18n-vendor": ["i18next", "react-i18next"],
          "three-vendor": ["three"],
        },
      },
    },
  },
}));
