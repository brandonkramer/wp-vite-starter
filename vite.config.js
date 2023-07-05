import {defineConfig} from 'vite'
import {viteWPConfig} from '@wp-strap/vite';
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';

export default defineConfig({

    plugins: [viteWPConfig(),ViteImageOptimizer()],
});