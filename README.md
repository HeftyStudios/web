# Arena Game Web

Static Astro site for publishing Arena Game class, specialisation, ability, buff, and debuff reference data from
`@hefty-studios/arena-game-data`.

## Local development

```bash
npm install
npm run dev
```

The local dev server will print a URL, typically `http://localhost:4321/web/`.

## Checks

```bash
npm run check
npm run build
```

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the site on pushes to
`main` and deploys the generated `dist/` output to GitHub Pages.

Astro is configured for the repository Pages base path:

- Site: `https://heftystudios.github.io`
- Base: `/web`

Expected production URL:

- `https://heftystudios.github.io/web/`
