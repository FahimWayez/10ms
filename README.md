## Hi ther!
````markdown
Next.js 15 frontend for the IELTS Course page at 10 Minute School. Uses SSR, Tailwind CSS and PNPM.


## Requirements

- Node.js >= 18  
- pnpm


## Setup

```bash
# install deps
pnpm install
````

## Development

```bash
# run dev server
pnpm dev
```

## Production

```bash
# build optimized output
pnpm build

# start server
pnpm start
```

## Features

* **Next.js 15** with server‑side rendering
* **Tailwind CSS** for styling
* **API** fetch from `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en|bn`
* **Language switch** (EN/Bn) via cookie (`TENMS_LANG`)
* **Responsive** from 360px up to 2200px
* **ISR** spots where needed

## Folder Structure

```
src/
├─ app/           ← pages & layouts  
├─ components/    ← reusable React components  
└─ lib/           ← API helpers, types  
```

## Notes

* No backend needed — data comes from the public API.
* Uses `next/image` for optimized images.
* Toggle language with the little EN | Bn switch in the header.
