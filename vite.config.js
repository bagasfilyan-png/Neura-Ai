import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" membuat build menghasilkan path relatif, sehingga aman
// dihosting di subfolder seperti GitHub Pages (https://user.github.io/repo/).
// Jika deploy ke Vercel/Netlify di domain root, base: "/" juga tetap aman.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
