import { defineNitroConfig } from "nitro/config";
// import nitroCloudflareBindings from "nitro-cloudflare-dev";

export default defineNitroConfig({
  compatibilityDate: "2024-09-19",
  preset: "cloudflare_module",
  modules: [
    // _biome-ignore lint/suspicious/noExplicitAny: eh esperado
    // nitroCloudflareBindings as any,
    // [
    //   "nitro-cloudflare-dev",
    //   {
    //     deployConfig: true,
    //     nodeCompat: true,
    //   },
    // ],
  ],
  openAPI: {
    route: "/_openapi.json",
    meta: {
      title: "Nitro v3",
      description:
        "Aprendendo e testando as funcionalidades e novidades do Nitro v3",
      version: "1.0.0",
    },
  },
  experimental: {
    openAPI: true,
  },
  noPublicDir: true,
  // routeRules: {
  //   "/api/**": {
  //     cors: true,
  //     headers: {
  //       "access-control-allow-methods": "GET",
  //     },
  //   },
  // },
});
