import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
  presetTypography,
} from "unocss";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "-.125em",
      },
    }),
    presetTypography({
      cssExtend: {
        code: { color: "#8b5cf6" },
        a: { color: "var(--vp-c-brand)" },
        // "a:hover": { color: "#f43f5e" },
        // "a:visited": { color: "#14b8a6" },
      },
    }),
  ],

  theme: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },

    colors: {
      brand: "var(--vp-c-brand)",
    },
  },
});
