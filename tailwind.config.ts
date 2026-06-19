import type { Config } from "tailwindcss";

/**
 * Design tokens for the BoostMySkills rebuild.
 *
 * These values are taken from the live RES4CITY theme CSS (res4city-theme/css)
 * so the rebuild matches the real site rather than a generic redesign:
 *   primary green  #079845   ink  #1A1A1A   muted  #767676 / #716D6B
 *   borders        #EEEEEE (cards) / #D2D2D2 (panels)
 *   tints          #EAF3E7 (light green) / #F6F7F9 (off-white)
 * Font: Urbanist (loaded via next/font in app/layout.tsx).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1A",       // primary text / headings
        muted: "#767676",     // secondary text
        muted2: "#716D6B",    // alt secondary text (certificate copy)
        line: "#EEEEEE",      // card borders / dividers
        "line-strong": "#D2D2D2", // option / testimonial panel borders
        "line-mid": "#BDBDBD", // courses search input / facets border (live)
        primary: {
          DEFAULT: "#079845", // brand green (buttons, links, eyebrows)
          dark: "#057A37",    // hover / pressed
        },
        accent: "#B4B736",    // olive highlight used sparingly in the theme
        surface: {
          DEFAULT: "#F6F7F9", // tinted section background
          alt: "#EAF3E7",     // light-green panel / card-image background
          green: "#D5E7D0",   // soft green used for number / avatar circles
          muted: "#F9F9F9",   // courses "Refine Your Search" facet panel (live)
        },
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "Urbanist", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        card: "24px",
      },
      letterSpacing: {
        heading: "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
