/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050608",
        panel: "#0D0F15",
        panel2: "#141722",
        panel3: "#1C2030",
        line: "#222738",
        "line-light": "rgba(255, 255, 255, 0.12)",
        silver: "#E2E8F0",
        fog: "#94A3B8",
        muted: "#64748B",
        blue: {
          DEFAULT: "#2563EB",
          glow: "#38BDF8",
          electric: "#0066FF",
          accent: "#3B82F6",
          dim: "#1D4ED8",
          dark: "#0F172A",
          navy: "#0A1128",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(37, 99, 235, 0.45)",
        glowSm: "0 0 18px -3px rgba(37, 99, 235, 0.55)",
        glowCyan: "0 0 25px -4px rgba(56, 189, 248, 0.45)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
      },
      maxWidth: {
        content: "1440px",
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.15), transparent 70%)',
        'radial-glow-center': 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.12), transparent 70%)',
      }
    },
  },
  plugins: [],
}
