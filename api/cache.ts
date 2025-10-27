import { defineCachedHandler, defineRouteMeta } from "nitro/runtime";

export default defineCachedHandler(
  async (_event) => new Date(),
  { maxAge: 15 }
);


defineRouteMeta({
  openAPI:{
    // tags: ["cache"],
    description: "Cache configurado para 15 segundos, retorna a data e hora do servidor",
    summary: "cache de 15 segundos",
    // servers: [{
    //   url: "https://nitro3.jeudi.workers.dev",
    //   description: "producao",
    //   variables:{}
    // }],
    responses: {
      200: {
        description: "Retorna a data e a hora atual do servidor no formato ISO 8601",
        content: {
          "application/json": {
            examples: {
              default:{
                value: "2025-10-27T00:02:00.000Z",
              }
            },
            schema: {
              type: "string",
              description: "data e hora atual do servidor",
              // default: "2025-10-27T00:02:00.000Z",
            },
          },
        },
      }
    },
}});
