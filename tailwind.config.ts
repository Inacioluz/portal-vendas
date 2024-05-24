import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{tsx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        inacio: '#708090'
      }
    },
  },
  plugins: [],
};
export default config;
