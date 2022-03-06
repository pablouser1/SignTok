# SignTok
Sign your TikTok urls easily.
This is a port of [tiktok-signature](https://github.com/carcabot/tiktok-signature) to Python using Selenium and Selenium Stealth

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Installation
```
pip install -r requirements.txt
```
You also need to have Chrome installed

## Usage
For webserver:
```
python web.py
```
Then you can send a POST request to localhost:8080 with a raw/plain body containing the url

For cli usage:
```
python cli.py
```

## TODO
* Docker
