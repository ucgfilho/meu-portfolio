import { createServer, defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
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

      // Ensure the entry module script has a corresponding modulepreload link in <head>
      // and move the <script type="module"> execution tag to the end of <body> so all
      // critical JS resources are discovered via preload without chaining.
      const entryScriptRegex =
        /<script\s+type=["']module["']\s+crossorigin\s+src=["'](\/assets\/[^"']+\.js)["']\s*><\/script>/i;
      const entryMatch = html.match(entryScriptRegex);
      if (entryMatch) {
        const [fullScriptTag, entrySrc] = entryMatch;
        html = html.replace(
          fullScriptTag,
          `<link rel="modulepreload" crossorigin href="${entrySrc}">`,
        );
        html = html.replace("</body>", `  ${fullScriptTag}\n</body>`);
      }

      htmlChunk.source = html;
    },
    async closeBundle() {
      const distIndex = path.resolve(__dirname, "dist/index.html");
      if (!fs.existsSync(distIndex)) return;

      const prevNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      const vite = await createServer({
        server: { middlewareMode: true, hmr: false },
        appType: "custom",
        logLevel: "silent",
      });
      try {
        const mod = await vite.ssrLoadModule("/src/entry-server.tsx");
        if (typeof mod.renderAppHtml === "function") {
          const appHtml: string = mod.renderAppHtml();
          const html = fs.readFileSync(distIndex, "utf-8");
          const updated = html.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`,
          );
          fs.writeFileSync(distIndex, updated, "utf-8");
        }
      } finally {
        await vite.close();
        process.env.NODE_ENV = prevNodeEnv;
      }
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
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router-dom"],
          "icons-vendor": ["lucide-react", "react-icons/si", "react-icons/fa6", "country-flag-icons/react/3x2"],
          "i18n-vendor": ["i18next", "react-i18next"],
        },
      },
    },
  },
}));
