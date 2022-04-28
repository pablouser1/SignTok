# SignTok
Sign your TikTok urls easily.
This is a port of [tiktok-signature](https://github.com/carcabot/tiktok-signature) using JSDOM

This project allows signing TikTok urls without having to run a headless browser, which lowers ram usage a lot.

## Installation
```
yarn install
```

## Usage
For webserver:
```
node server.py
```
Then you can send a POST request to localhost:8080 with a raw/plain body containing the url

For cli usage:
```
node index.js 'YOUR_URL_HERE'
```
