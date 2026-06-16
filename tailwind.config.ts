import type { Config } from "tailwindcss";

/**
 * Design tokens for the BoostMySkills rebuild.
 * These approximate the live site's sustainability theme and are the single
 * source of truth for colour. To match the original exactly, open the live
 * site, inspect an element, read its computed colour, and replace the hex
 * values below. Everything in the UI references these tokens.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F2A1D",       // primary text
        muted: "#4F6258",     // secondary text
        line: "#DDE6E0",      // borders / dividers
        primary: {
          DEFAULT: "#1F8A4C", // brand green (buttons, links)
          dark: "#166B3A",    // hover / pressed
        },
        accent: "#FFC53D",    // highlights, badges, stars
        surface: {
          DEFAULT: "#F3F8F4", // tinted section background
          alt: "#E8F2EB",     // alternate panel background
        },
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 42, 29, 0.06), 0 8px 24px rgba(15, 42, 29, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
