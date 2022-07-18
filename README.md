# Turborepo E-Commerce Monorepo

## Milestones 
- Set up the Models ✅ ( Check the .excalidraw file [Excalidraw](https://excalidraw.com/))
- The services for each model ✅
- Authentication✅
- Guards✅
- Decorators ✅
- Backend E2E Testing ( In progress ) 
- Client Authentication ✅
- Graphql Generator ✅
- E2E Testing for NextJS ❌
- Analytics Dashboard ❌
- Forms for adding a product ( Generic Product / Variant Product ) ❌
- Forms for handling Users ❌
- Forms for modifying the store view ❌ 
- About ❌
- Better Documentation ❌
- SEO Optimization ❌


## What's inside?

### Apps and Packages

- `admin-dashborad`: a [Next.js](https://nextjs.org) app
- `e-commerce-backend`: A [Nest.js](https://nestjs.com) app
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Setup

This repository is used in the `npx create-turbo` command, and selected when choosing which package manager you wish to use with your monorepo (Yarn).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
