# SignTok
Sign your TikTok urls easily.
This is a port of [tiktok-signature](https://github.com/carcabot/tiktok-signature) using JSDOM

## Installation
```
yarn install
```
You also need to have Chrome installed

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
