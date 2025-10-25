import { defineNitroConfig } from "nitro/config"
import nitroCloudflareBindings from "nitro-cloudflare-dev";

export default defineNitroConfig({
  compatibilityDate: "2024-09-19",
  preset: "cloudflare_module",
  modules: [nitroCloudflareBindings],
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,

  }
});
