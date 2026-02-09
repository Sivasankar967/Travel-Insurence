import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                quote: resolve(__dirname, 'quote.html'),
                info: resolve(__dirname, 'info.html'),
                planDetails: resolve(__dirname, 'plan-details.html')
            }
        }
    }
})
