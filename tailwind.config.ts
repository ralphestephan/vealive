import type { Config } from "tailwindcss"
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0019FF",
          green: "#00C774",
          orange: "#F14F14",
          dark: "#00001F"
        }
      },
      borderRadius: {
        'card': "40px"
      },
      boxShadow: {
        'soft': "10px 12px 20px rgba(0,0,0,0.10)"
      }
    },
  },
  plugins: [],
}
export default config
