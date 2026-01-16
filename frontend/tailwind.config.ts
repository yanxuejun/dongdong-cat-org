import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // 明确指定 app 目录
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%', opacity: '0' },
          '50%': { top: '100%', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;