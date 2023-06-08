# Web-list

reads a specific sqlite database (made by reddit user [u/xrmb](https://www.reddit.com/u/xrmb/)) and lets you search for content with filters

Api integration with qbittorrent is in progress [status](https://github.com/NikiSkaarup/web-list/tree/3-integrate-qbittorrent-web-api), this should give you the ability to quick add from the web-list interface and more.

## Installation

```bash
git clone https://github.com/nikiskaarup/web-list.git
```

```bash
cd web-list
```

```bash
pnpm install
```

```bash
cp .env.example .env
```

now, put your sqlite database in the db folder and rename it to "local.db"

## Usage

```bash
pnpm dev
```

or for a faster experience with no hot reloading (this is better for normal usage)

```bash
pnpm run build && pnpm run preview
```

## Customization

you can change the theme by switching the commented out line in `src/routes/+layout.svelte`
