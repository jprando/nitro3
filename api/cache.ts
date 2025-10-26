import { defineCachedHandler, defineRouteMeta } from "nitro/runtime";

export default defineCachedHandler(
  async (_event) => new Date(),
  { maxAge: 15 }
);


defineRouteMeta({
  openAPI:{
    tags: ["cache"],
    description: "Cache configurado para 15 segundos, retorna a data e hora do servidor",
    summary: "cache de 15 segundos",
    responses: { 200: { 
      content": {
        "application/json": "2025-10-26T18:26:33.680Z",
      },},
    },
});
