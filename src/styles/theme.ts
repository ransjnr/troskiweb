/**
 * Global theme configuration
 * Inspired by Steve Jobs' design principles: simplicity, clarity, and purpose
 */

export const theme = {
  // Color palette
  colors: {
    // Primary colors
    primary: {
      50: "#e6f7ff",
      100: "#b3e6ff",
      200: "#80d4ff",
      300: "#4dc2ff",
      400: "#1ab0ff",
      500: "#0099e6",
      600: "#0077b3",
      700: "#005580",
      800: "#00334d",
      900: "#00111a",
    },
    // Neutrals
    neutral: {
      50: "#f2f2f2",
      100: "#e6e6e6",
      200: "#cccccc",
      300: "#b3b3b3",
      400: "#999999",
      500: "#808080",
      600: "#666666",
      700: "#4d4d4d",
      800: "#333333",
      900: "#1a1a1a",
    },
    // Accents
    accent: {
      purple: "#6e56cf",
      teal: "#14b8a6",
      amber: "#f59e0b",
      rose: "#f43f5e",
      emerald: "#10b981",
    },
    // Functional
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
    info: "#3b82f6",
    // Background
    background: {
      light: "#ffffff",
      subtle: "#f9fafb",
      dark: "#1a1a1a",
      glass: "rgba(255, 255, 255, 0.8)",
    },
  },

  // Typography
  fonts: {
    sans: 'SF Pro Display, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'SF Mono, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },

  // Font sizes
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },

  // Font weights
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Spacing scale
  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },

  // Border radius
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "4xl": "2rem",
    full: "9999px",
  },

  // Shadows
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
  },

  // Transitions
  transitions: {
    DEFAULT: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "500ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  },

  // Gradient presets
  gradients: {
    primary: "linear-gradient(145deg, #0099e6 0%, #0077b3 100%)",
    subtle: "linear-gradient(145deg, #f7f7f7 0%, #eaeaea 100%)",
    glass:
      "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 100%)",
    dark: "linear-gradient(145deg, #1a1a1a 0%, #333333 100%)",
    accent: "linear-gradient(145deg, #6e56cf 0%, #5743b0 100%)",
  },

  // Backdrop filters
  backdropFilters: {
    none: "none",
    sm: "blur(4px)",
    DEFAULT: "blur(8px)",
    md: "blur(12px)",
    lg: "blur(16px)",
    xl: "blur(24px)",
  },
};

export default theme;
