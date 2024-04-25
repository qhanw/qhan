// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss';
import icons from './uno.config.icons';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': '-.125em',
      },
      collections: icons,
    }),
    presetTypography({
      // cssExtend: {
      //   // code: { color: "#8b5cf6" },
      //   a: {
      //     color: 'var(--vp-c-brand)',
      //     opacity: 0.8,
      //     transition: '.3s ease-in-out',
      //   },
      //   'a:hover': { opacity: 1 },
      //   // "a:visited": { color: "#14b8a6" },
      // },
    }),
  ],
});
