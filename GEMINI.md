# Aprendendo sobre nitro v3

Este projeto eh para estudo e aprendizado do v3.nitro.build, testar as funcionalidades da [documentacao oficial](https://v3.nitro.build/).

## Apresentacao

enUS: introduction

Nitro is a full-stack framework, compatible with any runtime. It extends your Vite application with a production-ready server.

[documentacao](https://v3.nitro.build/docs)

Nitro complementa o Vite transformando sua aplicação frontend em uma solução full-stack completa, focada em performance e compatibilidade universal.

API e Backend Integrados: Permite a criação de rotas server/API (na pasta routes/ ou via server.ts) para resolver problemas como CORS, tokens de API e lógica de backend, sendo agnóstico a runtimes e bibliotecas HTTP (ex: [h3](https://h3.dev/), [Hono](https://hono.dev/), [Elysia](https://elysiajs.com/)).

Deploy Universal e Otimizado: O comando vite build compila tanto o frontend quanto o backend em uma pasta .output/ otimizada.

Este output é compatível com Node.js, Bun, Deno e diversas plataformas de hospedagem serverless (Cloudflare Workers, Netlify, Vercel), suportando recursos avançados como ESR, ISR e SWR sem configuração adicional.

Performance Serverless: Otimizado para serverless, Nitro utiliza code-splitting e rotas compiladas para eliminar a necessidade de um runtime router. Isso resulta em um tempo de boot-up próximo de 0ms, carregando e executando apenas o código necessário para a requisição.

Recursos Integrados de Servidor:

- SSR e Renderização Universal: Facilita a renderização no lado do servidor (SSR) de HTML e componentes (React, Vue, Svelte), suportando Hydration no lado do cliente.

- Armazenamento Abstrato (Storage): Inclui uma camada de armazenamento key-value agnóstica a runtimes. Por padrão, é in-memory, mas suporta mais de 20 drivers (ex: FS, Redis, S3), permitindo a troca de driver sem alterar o código.

- Cache: Suporte nativo a caching para rotas e funções de servidor, utilizando a camada de storage.

- Banco de Dados Embutido: Oferece um banco de dados SQL built-in que usa SQLite por padrão, mas pode se conectar a mais de 10 bancos de dados (ex: Postgres, MySQL) com a mesma API.

O Nitro serve como a base sólida para meta-frameworks modernos como Nuxt, SolidStart e TanStack Start, oferecendo uma abordagem progressiva para construir aplicações web de alto desempenho.

### Inicio Rapido

enUS: quick Start

Start with a fresh Nitro project or adopt it in your current Vite project.

[documentacao](https://v3.nitro.build/docs/quick-start)

#### Create a Nitro project

The fastest way to create a Nitro application is using the `create-nitro-app`.

```shell
pnpm dlx create-nitro-app
```

Follow the instructions from the CLI and you will be ready to start your development server.

## Renderer

Use a renderer to handle all unmatched routes with custom HTML or a templating system.

[documentacao](https://v3.nitro.build/docs/renderer)

The renderer is a special handler in Nitro that catches all routes that don't match any specific API or route handler. It's commonly used for server-side rendering (SSR), serving single-page applications (SPAs), or creating custom HTML responses.

### Auto-detected index.html

By default, Nitro automatically looks for an `index.html` file in your project `src` dir.

If found, Nitro will use it as the renderer template and serve it for all unmatched routes.

### Custom HTML file

You can specify a custom HTML template file using the `renderer.template` option in your Nitro configuration.

### Hypertext Preprocessor (experimental)

Nitro uses [`rendu`](https://github.com/h3js/rendu) Hypertext Preprocessor, which provides a simple and powerful way to create dynamic HTML templates with JavaScript expressions.

You can use special delimiters to inject dynamic content.

### Custom renderer handler

For more complex scenarios, you can create a custom renderer handler that programmatically generates responses.

Create a renderer file and use defineRenderHandler to define your custom rendering logic.

Then, specify the renderer entry in the Nitro config.

### Renderer priority

The renderer always acts as a catch-all route (`/**`) and has the lowest priority.

### Use Case: Single-Page Application (SPA)

Serve your SPA's `index.html` for all routes to enable client-side routing.

> This is the default behavior of Nitro when used with Vite.

## Roteamento

enUS: routing

Nitro supports filesystem routing to automatically map files to routes. By combining code-splitting with compiled routes, it removes the need for a runtime router, leaving only minimal compiled logic.

[documetnacao](https://v3.nitro.build/docs/routing)

### Request handler

Nitro request handler is a function accepting an event object, which is a [`H3Event`](https://h3.dev/guide/api/h3event#h3event-properties) object.

### Filesystem routing

Nitro supports file-based routing for your API routes (files are automatically mapped to [`h3` routes](https://h3.dev/guide/basics/routing)). Defining a route is as simple as creating a file inside the `api/` or `routes/` directory.

You can only define one handler per files and you can [append the HTTP method](https://v3.nitro.build/docs/routing#specific-request-method) to the filename to define a specific request method.

### Static routes

First, create a file in `routes/` or `routes/api/` directory. The filename will be the route path.

### Dynamic routes

#### Single param

To define a route with params, use the `[<param>]` syntax where `<param>` is the name of the param. The param will be available in the event.context.params object or using the getRouterParam utility.

nome do arquivo: `routes/hello/[name].ts`

Call the route with the param `/hello/nitro`, you will get.

`Hello nitro!`

#### Multiple params

You can define multiple params in a route using `[<param1>]/[<param2>]` syntax where each param is a folder. You cannot define multiple params in a single filename of folder.

nome do arquivo: `routes/hello/[name]/[age].ts`

#### Catch-all params

You can capture all the remaining parts of a URL using `[...<param>]` syntax. This will include the `/` in the param.

#### Specific request method

You can append the HTTP method to the filename to force the route to be matched only for a specific HTTP request method, for example hello.get.ts will only match for GET requests. You can use any HTTP method you want.

- GET: `routes/users/[id].get.ts`
- POST: `routes/users.post.ts`

#### Catch-all route

You can create a special route that will match all routes that are not matched by any other route. This is useful for creating a default route.

To create a catch-all route, create a file named `[...].ts`.

nome do arquivo: `routes/[...].ts`

#### Environment specific handlers

> You can specify for a route that will only be included in specific builds by adding a `.dev`, `.prod` or `.prerender` suffix to the file name, for example: `routes/test.get.dev.ts` or `routes/test.get.prod.ts`.

#### Middleware

Nitro route middleware can hook into the request lifecycle.

> A middleware can modify the request before it is processed, not after.

Middleware are auto-registered within the `middleware/` directory.

##### Simple middleware

Middleware are defined exactly like route handlers with the only exception that they should not return anything. Returning from middleware behaves like returning from a request - the value will be returned as a response and further code will not be ran.

Middleware in `middleware/` directory are automatically registered for all routes. If you want to register a middleware for a specific route, see [Object Syntax Event Handler](https://h3.dev/guide/basics/handler#object-syntax).

> Returning anything from a middleware will close the request and should be avoided! Any returned value from middleware will be the response and further code will not be executed however this is not recommended to do!

##### Route Meta

You can define route handler meta at build-time using `defineRouteMeta` macro in the event handler files.

##### Execution order

Middleware are executed in directory listing order.

Prefix middleware with a number to control their execution order.

> Remember that file names are sorted as strings, thus for example if you have 3 files `1.filename.ts`, `2.filename.ts` and `10.filename.ts`, the `10.filename.ts` will come after the `1.filename.ts`. To avoid this, prefix `1-9` with a `0` like `01`, if you have more than `10` middleware in the same directory.

##### Request filtering

Middleware are executed on every request.

Apply custom logic to scope them to specific conditions.

For example, you can use the URL to apply a middleware to a specific route

#### Error handling

You can use the [utilities available in `H3`](https://h3.dev/guide/basics/error) to handle errors in both routes and middlewares.

The way errors are sent back to the client depends on the route's path. For most routes `Content-Type` is set to `text/html` by default and a simple html error page is delivered. If the route starts with `/api/` (either because it is placed in `api/` or `routes/api/`) the default will change to `application/json` and a JSON object will be sent.

This behaviour can be overridden by some request properties (e.g.: `Accept` or `User-Agent` headers).

#### Route rules

Nitro allows you to add logic at the top-level for each route of your configuration. It can be used for redirecting, proxying, caching and adding headers to routes.

It is a map from route pattern (following [`rou3`](https://github.com/h3js/rou3)) to route options.

When `cache` option is set, handlers matching pattern will be automatically wrapped with `defineCachedEventHandler`. See the [cache guide](https://v3.nitro.build/docs/cache) to learn more about this function.

> `swr: true|number` is shortcut for `cache: { swr: true, maxAge: number }`

You can set route rules in the nitro.routeRules options.

## Assets

[documentacao](https://v3.nitro.build/docs/assets)

### Public Assets

Nitro handles assets via the `public/` directory.

All assets in `public/` directory will be automatically served. This means that you can access them directly from the browser without any special configuration.

### Production public assets

When building your Nitro app, the `public/` directory will be copied to `.output/public/` and a manifest with metadata will be created and embedded in the server bundle.

This allows Nitro to know the public assets without scanning the directory, giving high performance with caching headers.

### Server assets

All assets in `assets/` directory will be added to the server bundle. After building your application, you can find them in the `.output/server/chunks/raw/` directory. Be careful with the size of your assets, as they will be bundled with the server bundle.

> Unless using `useStorage()`, assets won't be included in sever bundle.

They can be addressed by the assets:server mount point using the [storage layer](https://v3.nitro.build/docs/storage).

For example, you could store a json file in assets/data.json and retrieve it in your handler:

```typescript
const data = await useStorage("assets:server").get("data.json");
```

### Custom server assets

In order to add assets from a custom directory, you will need to define a path in your nitro config. This allows you to add assets from a directory outside of the `assets/` directory.

You could want to add a directory with html templates for example.

Then you can use the `assets:templates` base to retrieve your assets.

## Configuracao (Guia)

enUS: configuracao

Customize and extend Nitro defaults.

[documentacao](https://v3.nitro.build/docs/configuration)

You can customize your Nitro builder with a configuration file.

> Nitro loads the configuration using [`c12`](https://github.com/unjs/c12), giving more possibilities such as using `.nitrorc` file in current working directory or in the user's home directory.

### Runtime configuration

Nitro provides a runtime config API to expose configuration within your application, with the ability to update it at runtime by setting environment variables. This is useful when you want to expose different configuration values for different environments (e.g. development, staging, production). For example, you can use this to expose different API endpoints for different environments or to expose different feature flags.

First, you need to define the runtime config in your configuration file.

You can now access the runtime config using `useRuntimeConfig(event)`. Use `useRuntimeConfig(event)` within event handlers and utilities and avoid calling it in ambient global contexts. This could lead to unexpected behavior such as sharing the same runtime config across different requests.

### Local development

Finally, you can update the runtime config using environment variables. You can use a `.env` or `.env.local` file in development and use platform variables in production (see below).

Create an `.env` file in your project root

```shell { filename: .env }
NITRO_API_TOKEN="123"
```

Re-start the development server, fetch the `/api/example` endpoint and you should see `123` as the response instead of `dev_token`.

Do not forget that you can still universally access environment variables using `import.meta.env` or `process.env` but avoid using them in ambiant global contexts to prevent unexpected behavior.

### Production

You can define variables in your production environment to update the runtime config. All variables must be prefixed with `NITRO_` to be applied to the runtime config. They will override the runtime config variables defined within your nitro.config.ts file.

In runtime config, define key using `camelCase`. In environment variables, define key using `snake_case` and uppercase.

```javascript
{
    helloWorld: "foo"
}
```

```bash
NITRO_HELLO_WORLD="foo"
```

## Banco de Dados

enUS: database

Nitro provides a built-in and lightweight SQL database layer.

[documentacao](https://v3.nitro.build/docs/configuration)

The default database connection is preconfigured with [`SQLite`](https://db0.unjs.io/connectors/sqlite) and works out of the box for development mode and any Node.js compatible production deployments. By default, data will be stored in `.data/db.sqlite`.

In order to enable database layer you need to enable experimental feature flag.

> You can change default connection or define more connections to any of the [supported databases](https://db0.unjs.io/connectors/sqlite).
> You can integrate database instance to any of the [supported ORMs](https://db0.unjs.io/integrations).

### Configuration

You can configure database connections using `database` config in `nitro.config.ts` file.

```typescript { filename: nitro.config.ts }
import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  database: {
    default: {
      connector: "sqlite",
      options: { name: "db" }
    },
    users: {
      connector: "postgresql",
      options: {
        url: "postgresql://username:password@hostname:port/database_name"
      },
    },
  },
});
```

> You can use the `devDatabase` config to overwrite the database configuration only for development mode.

## Ciclo de Vida

enUS: lifecycle

Understand how Nitro runs and serves incoming requests to your application.

[documentacao](https://v3.nitro.build/docs/lifecycle)

A request can be intercepted and terminated (with or without a response) from any of these layers, in this order:

### 1. Route rules

The matching route rule defined in the Nitro config will execute. Note that most of the route rules can alter the response without terminating it (for instance, adding a header).

### 2. Global middleware

Any global middleware defined in the `middleware/` directory will be run

### 3. Server entry

If defined, the server entry handler will be run

### 4. Routes

At this stage, Nitro will look at defined routes in the `routes/` folder to match the incoming request.

### 5. Renderer

If no route is matched, Nitro will look for a renderer handler (defined or auto-detected) to handle the request.

## Plugins

Use plugins to extend Nitro's runtime behavior.

[documentacao](https://v3.nitro.build/docs/plugins)

Nitro plugins will be **executed once** during server startup in order to allow extending Nitro's runtime behavior. They receive `nitroApp` context, which can be used to hook into Nitro lifecycle events.

Plugins are auto-registered from `plugins/` directory and run synchronously (by order of file name) on the first Nitro initialization.

### Nitro runtime hooks

You can use Nitro [`hooks`](https://github.com/unjs/hookable) to extend the default runtime behaviour of Nitro by registering custom (async or sync) functions to the lifecycle events within plugins.

### Available hooks

See the [source code](https://github.com/nitrojs/nitro/blob/v2/src/core/index.ts#L75) for list of all available runtime hooks.

- "close", () => {}
- "error", (error, { event? }) => {}
- "render:response", (response, { event }) => {}
- "request", (event) => {}
- "beforeResponse", (event, { body }) => {}
- "afterResponse", (event, { body }) => {}

### Capturing errors

You can use plugins to capture all application errors.

### Graceful shutdown

You can use plugins to register a hook that resolves when Nitro is closed.

### Request and response lifecycle

You can use plugins to register a hook that can run on request lifecycle

## Tarefas

enUS: tasks

Nitro tasks allow on-off operations in runtime.

[documentacao](https://v3.nitro.build/docs/tasks)

### Define tasks

Tasks can be defined in `tasks/[name].ts` files.

Nested directories are supported. The task name will be joined with `:`. (Example: `tasks/db/migrate.tstask` name will be `db:migrate`).

### Scheduled tasks

You can define scheduled tasks using Nitro configuration to automatically run after each period of time.

> You can use [crontab.guru](https://crontab.guru/) to easily generate and understand cron tab patterns.

### Programmatically run tasks

To manually run tasks, you can use `runTask(name, { payload? })` utility.

### Run tasks with dev server

Nitro's built-in dev server exposes tasks to be easily executed without programmatic usage.

### Using CLI

> It is only possible to run these commands while the `dev server is running`. You should run them in a second terminal.

#### List tasks

```shell
nitro task list
```

#### Run a task

```shell
nitro task run db:migrate --payload "{}"
```

#### Concurrency

Each task can have one running instance. Calling a task of same name multiple times in parallel, results in calling it once and all callers will get the same return value.

> Nitro tasks can be running multiple times and in parallel.

## Middeware

topics: Nitro Server Entry

Use a server entry to create a global middleware that runs for all routes before they are matched.

[documentacao](https://v3.nitro.build/docs/server-entry)

The server entry is a special handler in Nitro that acts as a global middleware, running for every incoming request before routes are matched (see [request lifecycle](https://v3.nitro.build/docs/architecture#request-lifecycle)). It's commonly used for cross-cutting concerns like authentication, logging, request preprocessing, or creating custom routing logic.

### Auto-detected `server.ts`

By default, Nitro automatically looks for a `server.t`s (or `.js`, `.mjs`, `.tsx`, etc.) file in your project root or scan directories.

If found, Nitro will use it as the server entry and run it for all incoming requests.

> When `server.ts` is detected, Nitro will automatically log in the terminal: Using `\server.ts` as server entry.

With this setup:

- /health → Handled by server entry
- /api/hello → Server entry runs first, then the API route
- /about, etc. → Server entry runs first, then continues to routes or renderer

### Framework compatibility

The server entry is a great way to integrate with other frameworks such as [`Elysia`](https://elysiajs.com/), [`Hono`](https://hono.dev/) or [`H3`](https://h3.dev/).

### Custom server entry file

You can specify a custom server entry file using the `serverEntry` option in your Nitro configuration.

### Using event handler

You can also export an event handler using `defineHandler` for better type inference and access to the h3 event object.

> If your server entry returns undefined or doesn't return anything, the request will continue to be processed by routes and the renderer. If it returns a response, the request lifecycle stops there.

### Request lifecycle

The server entry is called as part of the global middleware stack, after route rules but before route handlers:

1. Server hook: `request`
2. Route rules (headers, redirects, etc.)
3. Global middleware (`middleware/`)
4. Server entry ← You are here
5. Routes (`routes/`)
6. Renderer (`renderer.ts` or `index.html`)

Think of the server entry as the **last global middleware** to run before route matching.

### Best practices

- Use server entry for cross-cutting concerns that affect **all routes**
- Return `undefined` to continue processing, return a response to terminate
- Keep server entry logic lightweight for better performance
- Use global middleware for modular concerns instead of one large server entry
- Consider using [Nitro plugins](https://v3.nitro.build/docs/plugins) for initialization logic
- Avoid heavy computation in server entry (it runs for every request)
- Don't use server entry for route-specific logic (use route handlers instead as they are more performant)

## Cache

Nitro provides a caching system built on top of the storage layer.

[documentacao](https://v3.nitro.build/docs/cache)

### Cached handlers

To cache an event handler, you simply need to use the `defineCachedHandler` method.

It works like defineHandler but with an second parameter for the [cache options](https://v3.nitro.build/docs/cache#options).

```typescript
import { defineCachedHandler } from "nitro/runtime";
```

If you want to immediately return the updated response set `swr: false`.

See the [options](https://v3.nitro.build/docs/cache#options) section for more details about the available options.

> Request headers are dropped when handling [`cached` responses](https://v3.nitro.build/docs/cache#options). Use the varies option to consider specific headers when caching and serving the responses.

### Cached functions

You can also cache a function using the `defineCachedFunction` function. This is useful for caching the result of a function that is not an event handler, but is part of one, and reusing it in multiple handlers.

> Because the cached data is serialized to JSON, it is important that the cached function does not return anything that cannot be serialized, such as Symbols, Maps, Sets…

### Using route rules

This feature enables you to add caching routes based on a glob pattern directly in the main configuration file. This is especially useful to have a global cache strategy for a part of your application.

### Cache storage

Nitro stores the data in the `cache` storage mount point.

- In production, it will use the [memory driver](https://unstorage.unjs.io/drivers/memory) by default.
- In development, it will use the [filesystem driver](https://unstorage.unjs.io/drivers/fs), writing to a temporary dir (`.nitro/cache`).

To overwrite the production storage, set the `cache` mount point using the `storage` option.

In development, you can also overwrite the cache mount point using the `devStorage` option.

### Cache keys and invalidation

When using the `defineCachedFunction` or `defineCachedHandler` functions, the cache key is generated using the following pattern:

`${options.group}:${options.name}:${options.getKey(...args)}.json`

For example, the following function:

```typescript
import { defineCachedFunction } from "nitro/runtime";

const getAccessToken = defineCachedFunction(() => {
    return String(Date.now())
}, {
    maxAge: 10,
    name: "getAccessToken",
    getKey: () => "default"
});
```

Will generate the following cache key:

`nitro:functions:getAccessToken:default.json`

You can invalidate the cached function entry with:

```typescript
import { useStorage } from "nitro/runtime";

const cacheName = 'nitro:functions:getAccessToken:default.json';
await useStorage('cache').removeItem(cacheName);
```

## Armazenamento

enUS: storage
topics: kv Storage

Nitro provides a built-in storage layer that can abstract filesystem or database or any other data source.

[documentacao](https://v3.nitro.build/docs/storage)

Nitro has built-in integration with [`unstorage`](https://unstorage.unjs.io/) to provide a runtime agnostic persistent layer.

### Usage

To use the storage layer, you can use the `useStorage()` and call `get(key)` to retrieve an item and `set(key, value)` to set an item.

### Configuration (Armazenamento)

You can mount one or multiple custom storage drivers using the `storage` option.

The key is the mount point name, and the value is the driver name and configuration.

Then, you can use the redis storage using the `useStorage("redis")` function.

### Development-only storage

By default, Nitro will mount the project directory and some other directories using the filesystem driver in development.

> You also can use the `devStorage` key to overwrite the storage configuration during development. This is very useful when you use a database in production and want to use the filesystem in development.

In order to use the `devStorage` key, you need to use the `nitro dev` command and the key in the `storage` option must be the same as the production one.

### Runtime configuration (Armazenamento)

In scenarios where the mount point configuration is not known until runtime, Nitro can dynamically add mount points during startup using [plugins](https://v3.nitro.build/docs/plugins).

## Configuracao

[documentacao](https://v3.nitro.build/config)

- [General](https://v3.nitro.build/config#general)
  - [preset](https://v3.nitro.build/config#preset) - Use preset option `NITRO_PRESET` environment variable for custom production preset.
  - [runtimeconfig](https://v3.nitro.build/config#runtimeconfig) - Server runtime configuration.
- [Features](https://v3.nitro.build/config#features)
  - [compresspublicassets](https://v3.nitro.build/config#compresspublicassets) - If enabled, Nitro will generate a pre-compressed (`gzip` and/or `brotli`) version of supported types of public assets and prerendered routes larger than 1024 bytes into the public directory. The best compression level is used. Using this option you can support zero overhead asset compression without using a CDN.
- [Routing](https://v3.nitro.build/config#routing)
  - [baseurl](https://v3.nitro.build/config#baseurl) - Default: `/` (or `NITRO_APP_BASE_URL` environment variable if provided) base URL, Server's main.
  - [apibaseurl](https://v3.nitro.build/config#apibaseurl) - Default: `/api`, Changes the default API base URL prefix.
- [Directories](https://v3.nitro.build/config#directories)
- [Advanced](https://v3.nitro.build/config#advanced)
- [Rollup](https://v3.nitro.build/config#rollup)
- [Preset options](https://v3.nitro.build/config#preset-options)
  - [cloudflare](https://v3.nitro.build/config#cloudflare) - The options for the cloudflare preset. See [Preset Docs](https://v3.nitro.build/deploy/providers/cloudflare)

## Deploy

Nitro can generate different output formats suitable for different hosting providers from the same code base. Using built-in presets, you can easily configure Nitro to adjust its output format with almost no additional code or configuration!

[documentacao](https://v3.nitro.build/deploy)

### Changing the deployment preset

If you need to build Nitro against a specific provider, you can target it by defining an environment variable named `NITRO_PRESET` or `SERVER_PRESET`, or by updating your Nitro [configuration](https://v3.nitro.build/docs/configuration) or using `--preset` argument.

Using the environment variable approach is recommended for deployments depending on CI/CD.

Example: Defining a `NITRO_PRESET` environment variable

```shell
nitro build --preset cloudflare_pages
```

### Cloudflare Provider

Deploy Nitro apps to Cloudflare.

[documentacao](https://v3.nitro.build/deploy/providers/cloudflare)

Preset: `cloudflare_module`

By setting `deployConfig: true`, Nitro will automatically generate a `wrangler.json` for you with the correct configuration. If you need to add [Cloudflare Workers configuration](https://developers.cloudflare.com/workers/wrangler/configuration/), such as [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/), you can either:

- Set these in your Nitro config under the `cloudflare: { wrangler : {} }`. This has the same type as `wrangler.json`.
- Provide your own `wrangler.json`. Nitro will merge your config with the appropriate settings, including pointing to the build output.

#### Local Preview

You can use [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) to preview your app locally:

```shell
pnpm build
pnpm dlx wrangler pages dev
```

#### Manual Deploy

After having built your application you can manually deploy it with Wrangler, in order to do so first make sure to be logged into your Cloudflare account:

```shell
pnpm dlx wrangler login
pnpm dlx wrangler pages deploy
```

#### Deploy within CI/CD using GitHub Actions

Regardless on whether you're using Cloudflare Pages or Cloudflare Workers, you can use the [Wrangler GitHub actions](https://github.com/marketplace/actions/deploy-to-cloudflare-workers-with-wrangler) to deploy your application.

> Remember to [instruct Nitro to use the correct preset](https://v3.nitro.build/deploy#changing-the-deployment-preset) (note that this is necessary for all presets including the `cloudflare_pages` one).

#### Environment Variables

Nitro allows you to universally access environment variables using `process.env` or `import.meta.env` or the runtime config.

> Make sure to only access environment variables **within the event lifecycle** and not in global contexts since Cloudflare only makes them available during the request lifecycle and not before.

Example: If you have set the `SECRET` and `NITRO_HELLO_THERE` environment variables set you can access them.

##### Specify Variables in Development Mode

For development, you can use a `.env` or `.env.local` file to specify environment variables:

```shell
NITRO_HELLO_THERE="captain"
SECRET="top-secret"
```

> Make sure you add `.env` and `.env.local` to the `.gitignore` file so that you don't commit it as it can contain sensitive information.

##### Specify Variables for local previews

After build, when you try out your project locally with `wrangler dev` or `wrangler pages dev`, in order to have access to environment variables you will need to specify the in a `.dev.vars` file in the root of your project (as presented in the [Pages](https://developers.cloudflare.com/pages/functions/bindings/#interact-with-your-environment-variables-locally) and [Workers](https://developers.cloudflare.com/workers/configuration/environment-variables/#interact-with-environment-variables-locally) documentation).

If you are using a `.env` or `.env.local` file while developing, your `.dev.vars` should be identical to it.

> Make sure you add `.dev.vars` to the `.gitignore` file so that you don't commit it as it can contain sensitive information.

##### Specify Variables for Production

For production, use the Cloudflare dashboard or the `wrangler secret` command to set environment variables and secrets.

##### Specify Variables using [`wrangler.toml`/`wrangler.json`](https://v3.nitro.build/deploy/providers/cloudflare#specify-variables-using-wranglertomlwranglerjson)

You can specify a custom `wrangler.toml`/`wrangler.json` file and define vars inside.

> Note that this isn't recommend for sensitive data like secrets.

#### Direct access to Cloudflare bindings

Bindings are what allows you to interact with resources from the Cloudflare platform, examples of such resources are key-value data storages ([`KVs`](https://developers.cloudflare.com/kv/)) and serverless SQL databases ([`D1s`](https://developers.cloudflare.com/d1/)).

For more details on Bindings and how to use them please refer to the Cloudflare [`Pages`](https://developers.cloudflare.com/pages/functions/bindings/) and [`Workers`](https://developers.cloudflare.com/workers/configuration/bindings/#bindings) documentation.

> Nitro provides high level API to interact with primitives such as [`KV Storage`](https://v3.nitro.build/docs/storage) and [Database](https://v3.nitro.build/docs/database) and you are highly recommended to prefer using them instead of directly depending on low-level APIs for usage stability.

In runtime, you can access bindings from the request event, by accessing its `context.cloudflare.env` field.

##### Access to the bindings in local dev

> The `nitro-cloudflare-dev` module is experimental. The Nitro team is looking into a more native integration which could in the near future make the module unneeded.

In order to access bindings in dev mode we start by defining the bindings. You can do this in a `wrangler.toml`/`wrangler.json` file, or directly in your Nitro config under `cloudflare.wrangler` (accepts the same type as `wrangler.json`).

Next we install the nitro-cloudflare-dev module as well as the required wrangler package (if not already installed):

```shell
pnpm i -D nitro-cloudflare-dev wrangler
```

Then define module:

```javascript { filename: nitro.config.js }

import nitroCloudflareBindings from "nitro-cloudflare-dev";

export default defineNitroConfig({
  modules: [nitroCloudflareBindings],
});
```

From this moment, when running

```shell
pnpm dev
```

you will be able to access the `MY_VARIABLE` and `MY_KV` from the request event just as illustrated above.

## Runtime NodeJS

Run Nitro apps with Node.js runtime.

[documentacao](https://v3.nitro.build/deploy/runtimes/node)

Preset: `node_server`

Node.js is the default nitro output preset for production builds and Nitro has native Node.js runtime support.

- [Environment Variables](https://v3.nitro.build/deploy/runtimes/node#environment-variables)
- [Cluster Mode](https://v3.nitro.build/deploy/runtimes/node#cluster-mode)
- [Handler (advanced)](https://v3.nitro.build/deploy/runtimes/node#handler-advanced)
