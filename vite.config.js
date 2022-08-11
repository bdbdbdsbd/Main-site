import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from "rollup-plugin-visualizer";
import importToCDN,{autoComplete} from 'vite-plugin-cdn-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), visualizer(),
    importToCDN({
        modules:[
        autoComplete('vue'),
        {
            name:'ant-design-vue',
            var:'antd',
            path:'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.2.10/antd.js',
            css:'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.2.10/antd.css'
        },
        // {
        //   name:'@ant-design/icons-vue',
        //   // default
        //   var:'icons-vue',
        //   // path:'https://cdn.bootcdn.net/ajax/libs/ant-design-icons/4.7.0/index.umd.js',
        //   path:'https://cdn.jsdelivr.net/npm/@ant-design/icons-vue@6.1.0/lib/index.js',
        // }
        ]
      })
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    rollupOptions:{
    }
  }
})
