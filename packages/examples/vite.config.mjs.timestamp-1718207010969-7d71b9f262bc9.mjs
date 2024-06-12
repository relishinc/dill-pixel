// vite.config.mjs
import { extendConfig } from "file:///C:/Users/antho/www/dill-pixel-v8/packages/framework/config/vite.mjs";
import path from "node:path";
var __vite_injected_original_dirname = "C:\\Users\\antho\\www\\dill-pixel-v8\\packages\\examples";
var vite_config_default = extendConfig({
  resolve: {
    alias: {
      "dill-pixel": path.resolve(__vite_injected_original_dirname, "../src"),
      "@dill-pixel/plugin-snap-physics": path.resolve(__vite_injected_original_dirname, "../packages/plugins/physics/snap"),
      "@dill-pixel/plugin-arcade-physics": path.resolve(__vite_injected_original_dirname, "../packages/plugins/physics/arcade"),
      "@dill-pixel/plugin-matter-physics": path.resolve(__vite_injected_original_dirname, "../packages/plugins/physics/matter"),
      "@dill-pixel/plugin-rive": path.resolve(__vite_injected_original_dirname, "../packages/plugins/rive"),
      "@dill-pixel/storage-adapter-firebase": path.resolve(__vite_injected_original_dirname, "../packages/storage-adapters/firebase")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW50aG9cXFxcd3d3XFxcXGRpbGwtcGl4ZWwtdjhcXFxccGFja2FnZXNcXFxcZXhhbXBsZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFudGhvXFxcXHd3d1xcXFxkaWxsLXBpeGVsLXY4XFxcXHBhY2thZ2VzXFxcXGV4YW1wbGVzXFxcXHZpdGUuY29uZmlnLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW50aG8vd3d3L2RpbGwtcGl4ZWwtdjgvcGFja2FnZXMvZXhhbXBsZXMvdml0ZS5jb25maWcubWpzXCI7aW1wb3J0IHtleHRlbmRDb25maWd9IGZyb20gJ2RpbGwtcGl4ZWwvY29uZmlnL3ZpdGUnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5kQ29uZmlnKHtcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHQnZGlsbC1waXhlbCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMnKSxcblx0XHRcdCdAZGlsbC1waXhlbC9wbHVnaW4tc25hcC1waHlzaWNzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3BhY2thZ2VzL3BsdWdpbnMvcGh5c2ljcy9zbmFwJyksXG5cdFx0XHQnQGRpbGwtcGl4ZWwvcGx1Z2luLWFyY2FkZS1waHlzaWNzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3BhY2thZ2VzL3BsdWdpbnMvcGh5c2ljcy9hcmNhZGUnKSxcblx0XHRcdCdAZGlsbC1waXhlbC9wbHVnaW4tbWF0dGVyLXBoeXNpY3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vcGFja2FnZXMvcGx1Z2lucy9waHlzaWNzL21hdHRlcicpLFxuXHRcdFx0J0BkaWxsLXBpeGVsL3BsdWdpbi1yaXZlJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3BhY2thZ2VzL3BsdWdpbnMvcml2ZScpLFxuXHRcdFx0J0BkaWxsLXBpeGVsL3N0b3JhZ2UtYWRhcHRlci1maXJlYmFzZSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9wYWNrYWdlcy9zdG9yYWdlLWFkYXB0ZXJzL2ZpcmViYXNlJyksXG5cdFx0fVxuXHR9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdWLFNBQVEsb0JBQW1CO0FBQ25YLE9BQU8sVUFBVTtBQURqQixJQUFNLG1DQUFtQztBQUd6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixjQUFjLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsTUFDOUMsbUNBQW1DLEtBQUssUUFBUSxrQ0FBVyxrQ0FBa0M7QUFBQSxNQUM3RixxQ0FBcUMsS0FBSyxRQUFRLGtDQUFXLG9DQUFvQztBQUFBLE1BQ2pHLHFDQUFxQyxLQUFLLFFBQVEsa0NBQVcsb0NBQW9DO0FBQUEsTUFDakcsMkJBQTJCLEtBQUssUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxNQUM3RSx3Q0FBd0MsS0FBSyxRQUFRLGtDQUFXLHVDQUF1QztBQUFBLElBQ3hHO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
