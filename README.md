# Welcome to React Router

A modern, production-ready template for building full-stack React applications using React Router.

**WARNING this README file is incomplete at this time**

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling, along with ShaCDN UI components
- 📖 [React Router docs](https://reactrouter.com/)
- Prisma for the db layer
- better-auth for authentication/authorization
- ESlint and prettier for consistent code formatting along with husky pre-commit hook

## Getting Started

### Installation

### Prerequisites

- install docker and docker compose
- switch docker to rootless <https://docs.docker.com/engine/security/rootless/#install>
- run `./docker/run-compose.sh build && ./docker/run-compose.sh logs` from the project folder
- run

```bash
./docker/run-compose.sh dev
./docker/docker-exec remix3

```

- finally create and migrate the database by running `docker exec -it remix3-http /bin/bash -c "npx prisma generate && npx prisma migrate dev"`

### Development

Start the development server with HMR:

```bash
./docker/run-compose.sh start && ./docker/run-compose.sh logs
```

Your application will be available at `http://localhost:5173`.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
