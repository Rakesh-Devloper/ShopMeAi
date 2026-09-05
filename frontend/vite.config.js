import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
export default defineConfig(() => {
    return {
        root: path.resolve(__dirname, "."),
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        build: {
            outDir: path.resolve(__dirname, "../dist"),
            emptyOutDir: true,
        },
        server: {
            hmr: process.env.DISABLE_HMR !== "true",
            watch: process.env.DISABLE_HMR === "true" ? null : {},
            proxy: {
                "/api": {
                    target: process.env.BACKEND_URL || "http://localhost:3000",
                    changeOrigin: true,
                },
            },
        },
    };
});
