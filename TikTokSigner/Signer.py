from os import getenv
from time import sleep
from selenium import webdriver
from selenium_stealth import stealth
from selenium.webdriver.chrome.options import Options
from urllib import parse
from TikTokSigner.Utils import Utils

class Signer:
    DEFAULT_URL = 'https://www.tiktok.com/@tiktok/?lang=en'
    USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (Windows NT 10.0; Win64; x64) Chrome/90.0.4430.85 Safari/537.36'
    driver: webdriver.Chrome

    signature = ''
    xttparams = ''

    def __init__(self):
        options = Options()
        path = getenv('GOOGLE_CHROME_SHIM', '')
        options._binary_location = path
        options.add_argument("start-maximized")
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--remote-debugging-port=9222")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        options.add_argument('--disable-blink-features=AutomationControlled')
        self.driver = webdriver.Chrome(options=options)
        stealth(self.driver,
            user_agent=self.USER_AGENT,
            languages=["en-US", "en"],
            vendor="Google Inc.",
            platform="Win32",
            webgl_vendor="Intel Inc.",
            renderer="Intel Iris OpenGL Engine",
            fix_hairline=True
        )

        self.driver.get(self.DEFAULT_URL)
        sleep(2)

        # Load scripts
        with open('./js/signature.js') as f:
            signature = f.read()

        with open('./js/xttparams.js') as f:
            xttparams = f.read()

        self.driver.execute_script(signature)
        self.driver.execute_script(xttparams)

    def navigator(self)-> dict:
        info = self.driver.execute_script("""
            return {
                deviceScaleFactor: window.devicePixelRatio,
                user_agent: window.navigator.userAgent,
                browser_language: window.navigator.language,
                browser_platform: window.navigator.platform,
                browser_name: window.navigator.appCodeName,
                browser_version: window.navigator.appVersion,
            }
        """)
        return info

    def sign(self, url: str)-> dict:
        fp = Utils.verify_fp()
        # Add verifyFp to url
        url += '&verifyFp=' + fp
        signature = self.driver.execute_script('return window.byted_acrawler.sign(arguments[0])', {
            url: url
        })
        signed_url = url + '&_signature=' + signature

        # Get params of url as dict
        params = dict(parse.parse_qsl(parse.urlsplit(url).query))
        xttparams = self.driver.execute_script('return window.genXTTParams(arguments[0])', params)
        return {
            'signature': signature,
            'verify_fp': fp,
            'signed_url': signed_url,
            'x-tt-params': xttparams
        }

    def cleanup(self):
        self.driver.close()
