import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: { soft: "0 18px 60px rgba(0,0,0,.35)" },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(236,72,153,.18), transparent 28%), radial-gradient(circle at top right, rgba(99,102,241,.16), transparent 26%), linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,0))",
      },
    },
  },
  plugins: [],
};
export default config;
