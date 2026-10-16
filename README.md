# raffaellasadun.com

Built with Eleventy. Content lives in `src/_data/`:
- `papers.yaml`: research list (theme, status, links)
- `media.yaml`: podcasts, talks, press, op-eds
- `writing.yaml`: HBR, VoxEU and other practitioner writing
- `site.yaml`: bios, statement, links, projects, funders, photos

Build: `npm install && npm run build` (output in `_site/`).
Hosting: Cloudflare Workers (static assets, see `wrangler.jsonc`). Every push to `main` builds with `npm run build` and deploys `_site`.
Hosted paper PDFs live in `src/papers/` and are linked from the `pdf:` field in `papers.yaml` / `writing.yaml`.
