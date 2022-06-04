# SignTok
Sign your TikTok urls easily.
This is a port of [tiktok-signature](https://github.com/carcabot/tiktok-signature) using JSDOM

This project allows signing TikTok urls without having to run a headless browser, which lowers ram usage a lot.

## Installation
### Docker
```
docker pull ghcr.io/pablouser1/signtok:master
```

Now you can create a container with:
```
docker run --publish 8080:8080 ghcr.io/pablouser1/signtok:master
```
### Manual
```
yarn install
```

Now you can run the server with:
```
node api/index.js
```
## Usage
For webserver:
You can send a POST request to http://localhost:8080/signature with a raw/plain body containing the url

(Content-Type: text/plain)

For cli usage:
```
node index.js 'YOUR_URL_HERE'
```
