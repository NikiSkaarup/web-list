# Web-list

reads a specific sqlite database (made by reddit user [u/xrmb](https://www.reddit.com/u/xrmb/) ) and lets you search for content with filters

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

put your sqlite database in the db folder and rename it to "local.db"

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
