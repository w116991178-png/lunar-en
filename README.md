# Chinese Lunar Calendar Tool

An English-language Chinese lunar calendar lookup page based on [`6tail/lunar-typescript`](https://github.com/6tail/lunar-typescript). It can be deployed as a static site on Nginx, GitHub Pages, or any other static file server.

Live site: [https://chinamaxxing.info/tools/index.html](https://chinamaxxing.info/tools/index.html)

![Chinese Lunar Calendar test page](./docs/images/calendar-test-page.png)

## Upstream project

This repository was cloned from and is a derivative of [`6tail/lunar-typescript`](https://github.com/6tail/lunar-typescript), created by 6tail and released under the MIT License. The original copyright notice and [`LICENSE`](./LICENSE) are retained.

This is not an official release of the upstream project. For the underlying calendar algorithms and full API, see the [upstream documentation](https://6tail.cn/calendar/api.html).

## Changes in this project

- Added an interactive English test page in `test.html`.
- Added date selection and output for Gregorian date, lunar date, zodiac, weekday, traditional lunar festivals, and solar terms.
- Removed Na Yin, lunar mansions, fortune information, taboos, deity directions, clashes, and other divination-related details from the displayed result.
- Translated the UI and displayed calendar information into English, including additional traditional festival names.
- Added a directly runnable Node.js example in `test.js`.
- Added a dependency-free local preview server in `server.js`.
- Added the standalone browser bundle at `vendor/lunar-typescript.mjs`; production deployment does not require `node_modules` or `dist/lib`.
- Added Nginx/static hosting instructions and a test-page screenshot.

## Local preview

Node.js 18 or later is recommended:

```bash
node server.js
```

Open:

```text
http://127.0.0.1:8765/test.html
```

`server.js` is only needed for local preview. Node.js is not required when the production site is served by Nginx.

## Command-line example

After installing dependencies, run:

```bash
npm install
node test.js
```

## Nginx deployment

Publish these static assets to the web root:

```text
test.html
vendor/lunar-typescript.mjs
```

Nginx must return a JavaScript MIME type for `.mjs` files:

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/lunar-calendar;
    index test.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.mjs$ {
        default_type application/javascript;
    }
}
```

Validate and reload the configuration:

```bash
nginx -t
sudo systemctl reload nginx
```

## Project structure

```text
.
├── docs/images/                 # README screenshots
├── src/                         # Upstream TypeScript source
├── vendor/lunar-typescript.mjs  # Standalone browser module
├── test.html                    # English date lookup page
├── test.js                      # Node.js example
└── server.js                    # Local static server
```

## License

This project remains available under the upstream [MIT License](./LICENSE). Preserve the original copyright and permission notice when redistributing or modifying the software.
