import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#ecf2ff",
        muted: "#98a2c7",
        line: "rgba(255,255,255,0.08)",
        surface: "#0e1424",
        panel: "#121a31",
        deep: "#090d18",
        brand: "#69e2ff",
        accent: "#8b5cf6",
        coral: "#ff8f70"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px rgba(12,16,32,0.55)",
        soft: "0 20px 60px rgba(8, 12, 28, 0.28)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top left, rgba(105, 226, 255, 0.18), transparent 28%), radial-gradient(circle at 85% 20%, rgba(139, 92, 246, 0.18), transparent 30%), linear-gradient(180deg, #0a0f1d 0%, #0b1020 38%, #080c17 100%)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};

export default config;
