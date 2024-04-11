import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv';
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src")}]
  },
  server: {
    port: parseInt(process.env.VITE_PORT)
  },
})
