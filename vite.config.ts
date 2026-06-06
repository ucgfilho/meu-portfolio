import { defineConfig } from "vite";
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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
