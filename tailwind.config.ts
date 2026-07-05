import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#080B09",
          50: "#0B0F0D",
          100: "#0F1512",
          200: "#131A16",
          300: "#1A2320",
          400: "#212C27"
        },
        emerald: {
          DEFAULT: "#2FBF71",
          dim: "#1F8C52",
          bright: "#57E39A"
        },
        gold: {
          DEFAULT: "#E8B44C",
          dim: "#B98A34"
        },
        redstone: "#E5484D",
        mist: {
          DEFAULT: "#EAF2ED",
          muted: "#8FA396",
          faint: "#5C6B62"
        }
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"]
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 0%, rgba(47,191,113,0.12), transparent 40%), radial-gradient(circle at 85% 15%, rgba(232,180,76,0.08), transparent 35%)"
      },
      clipPath: {
        terrain: "polygon(0 20%, 5% 20%, 5% 10%, 10% 10%, 10% 0, 100% 0, 100% 100%, 0 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blink: "blink 1.6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
