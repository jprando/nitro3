
<div align="center">
  <img src="https://unjs.io/assets/logos/nitro.svg" alt="Nitro Logo" width="150">
  <br><br>
  <h1>🚀 Bem-vindo ao Nitro Study! 🚀</h1>
  <p>Um projeto dedicado a aprender e explorar o incrível poder do <a href="https://v3.nitro.build/">Nitro v3</a>, o motor de servidor universal para aplicações web modernas.</p>
</div>

---

## 📖 Sobre o Projeto

Este repositório é um playground para testar e entender as funcionalidades do Nitro. Aqui, você encontrará exemplos práticos e anotações baseadas na [documentação oficial](https://v3.nitro.build/), cobrindo desde o básico até tópicos mais avançados.

[🗺️ Explore a API deste projeto](https://registry.scalar.com/@prando-garage/apis/nitro-v3/latest)

## ✨ Funcionalidades Exploradas

- **🏎️ Roteamento:** Sistema de roteamento baseado em arquivos, com suporte para rotas dinâmicas, catch-all e muito mais.
- **🔧 Middlewares:** Intercepte e modifique requisições com middlewares globais ou específicos para rotas.
- **💾 Armazenamento (KV Storage):** Camada de armazenamento agnóstica para gerenciar dados de forma simples e eficiente.
- **⚡ Cache:** Melhore a performance da sua aplicação com o sistema de cache integrado.
- **⚙️ Configuração:** Personalize e estenda o comportamento do Nitro com arquivos de configuração.
- **☁️ Deploy:** Faça o deploy da sua aplicação em qualquer lugar, com presets para diversos provedores.

## 🚀 Começando

Para executar este projeto localmente, siga os passos abaixo:

### Requisitos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados e configurados:

- **Acesso à Internet:** Necessário para clonar o repositório e instalar as dependências.
- **Node.js:** É necessário ter o Node.js instalado.
- **pnpm:** Este projeto utiliza o `pnpm` como gerenciador de pacotes.

> **Nota:** Recomendo o uso do [Volta](https://volta.sh/) para gerenciar as versões do Node.js e dos gerenciadores de pacotes. Com o Volta, você pode instalar a versão correta do Node.js e do `pnpm` com um único comando.

### Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/jprando/nitro3 jprando-nitro3
    cd jprando-nitro3
    ```

2. **Instale as dependências:**

    ```bash
    pnpm install
    ```

3. **Inicie o servidor de desenvolvimento:**

    ```bash
    pnpm dev
    ```

Agora, você pode acessar a aplicação em [`http://localhost:3000`](http://localhost:3000).

## ☁️ Deploy

Este projeto está configurado para deploy no Cloudflare. Para fazer o deploy, siga os passos abaixo:

1. **Faça o login no Cloudflare:**

    ```bash
    pnpm cloudflare:login
    ```

2. **Execute o build:**

    ```bash
    pnpm build
    ```

3. **Faça o deploy:**

    ```bash
    pnpm deploy
    ```

Para mais informações sobre deploy em outros provedores, consulte a [documentação oficial](https://v3.nitro.build/deploy).

---

<div align="center">
  <p>Feito com ✨ typescript e muito café ☕ por <a href="https://github.com/jprando">jprando</a></p>
</div>
