import { Platform } from "react-native";

export const AppColors = {
  // Brand Colors
  primary: "#3B82F6",
  primaryDark: "#2563EB",
  secondary: "#06B6D4",
  accent: "#F59E0B",

  // Backgrounds
  background: "#000000",
  surface: "#121212",
  card: "#1A1A1A",

  // Text
  white: "#FFFFFF",
  text: "#FFFFFF",
  textSecondary: "#B3B3B3",
  textLight: "#808080",

  // Status
  success: "#22C55E",
  warning: "#FACC15",
  danger: "#EF4444",

  // Borders
  border: "#2A2A2A",
  divider: "#1F1F1F",

  // Icons
  icon: "#FFFFFF",

  // Tabs
  tint: "#3B82F6",
  tabIconDefault: "#7A7A7A",
  tabIconSelected: "#3B82F6",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const Radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  round: 999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 36,
};

export const Shadow = {
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  floating: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "System",
    serif: "Times New Roman",
    mono: "Menlo",
  },

  android: {
    sans: "sans-serif",
    serif: "serif",
    mono: "monospace",
  },

  default: {
    sans: "sans-serif",
    serif: "serif",
    mono: "monospace",
  },
});