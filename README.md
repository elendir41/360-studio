
# 360 studio

This is a NextJS application using React, Next App Router, Tailwind CSS and Typescript.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Babel](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)

## Document

- [React](https://react.dev/)
- [NextJS](https://nextjs.org/)

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

## Supabase

This project uses [Supabase](https://supabase.io/) for database, auth and storage management. You can create a free account and use the provided API keys to run the app locally.

You can also download the Supabase CLI and run `supabase init` to create a local instance of the database.
Then you can run `supabase start` to start the local instance.

Check the url after starting supabase with `supabase status`.

## Database

This projects uses the supabase postgres database. The schema is defined in the `src/server/schema.ts` file using [Drizzle](https://orm.drizzle.team/). You can run the following command to create the tables in the database:

### Reset

If this is the first time you are running the project, you can run the following command to init the database.
You can also run this command to reset the database to the initial state.

```sh
supabase db reset
```

It's an admin account, you can manage everything from it or in the supabase studio.

### Migrations

```sh
# To check the is the schema is up to date
pnpm db:check

# To create a new migration
pnpm db:generate

# To run the migration
supabase migration up
```

### Rollback

You can also rollback migrations with the following command:

```sh
pnpm db:drop
```

### Backup

You can also update the seed with the following command:

```sh
supabase db dump -f supabase/seed.sql --local --data-only -s public -s storage -s auth
```

## Deployment

This project is deployed on [Vercel](https://vercel.com/). The deployment is triggered automatically when a new commit is pushed to the `main` branch.
