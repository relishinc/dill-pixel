// vite.config.ts
import { defineConfig } from "file:///C:/Users/antho/www/dill-pixel-v8/node_modules/.pnpm/vite@5.4.9_@types+node@20.5.1_terser@5.31.1/node_modules/vite/dist/node/index.js";
import dts from "file:///C:/Users/antho/www/dill-pixel-v8/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.5.1_rollup@4.24.3_typescript@5.4.5_vite@5.4.9_@types+node@20.5.1_terser@5.31.1_/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\antho\\www\\dill-pixel-v8\\packages\\framework";
var vite_config_default = defineConfig({
  build: {
    outDir: "./lib",
    sourcemap: true,
    lib: {
      formats: ["es"],
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      fileName: () => `dill-pixel.mjs`
    },
    rollupOptions: {
      external: ["pixi.js", "gsap"]
    }
  },
  plugins: [dts()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbnRob1xcXFx3d3dcXFxcZGlsbC1waXhlbC12OFxcXFxwYWNrYWdlc1xcXFxmcmFtZXdvcmtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFudGhvXFxcXHd3d1xcXFxkaWxsLXBpeGVsLXY4XFxcXHBhY2thZ2VzXFxcXGZyYW1ld29ya1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW50aG8vd3d3L2RpbGwtcGl4ZWwtdjgvcGFja2FnZXMvZnJhbWV3b3JrL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICcuL2xpYicsXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIGxpYjoge1xuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIGZpbGVOYW1lOiAoKSA9PiBgZGlsbC1waXhlbC5tanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsncGl4aS5qcycsICdnc2FwJ10sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW2R0cygpXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VixTQUFTLG9CQUFvQjtBQUN0WCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxNQUNILFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsVUFBVSxNQUFNO0FBQUEsSUFDbEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxXQUFXLE1BQU07QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDakIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
