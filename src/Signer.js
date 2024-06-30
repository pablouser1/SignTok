const fs = require("fs");
const { JSDOM, ResourceLoader } = require("jsdom");
const { createCipheriv } = require("crypto");

/**
 * Main Signer class
 */
class Signer {
  /** Default user-agent used to signed the requests */
  static DEFAULT_USERAGENT =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35";
  /** Password for x-tt-params AES enc/dec */
  static PASSWORD = "webapp1.0+202106";

  /**
   * JSDOM main window
   * @type Window
   */
  window = null;

  constructor(userAgent = Signer.DEFAULT_USERAGENT) {
    const signature_js = fs.readFileSync(__dirname + "/../js/signature.js", "utf-8");
    const webmssdk = fs.readFileSync(__dirname + "/../js/webmssdk.js", "utf-8");
    const resourceLoader = new ResourceLoader({ userAgent });

    const { window } = new JSDOM("", {
      url: "https://www.tiktok.com",
      referrer: "https://www.tiktok.com",
      contentType: "text/html",
      includeNodeLocations: false,
      runScripts: "outside-only",
      pretendToBeVisual: true,
      resources: resourceLoader
    });
    this.window = window;
    this.window.eval(signature_js.toString());
    this.window.byted_acrawler.init({
      aid: 24,
      dfp: true
    });
    this.window.eval(webmssdk);
  }

  /**
   * Get current virtual browser navigator
   * @returns Navigator compatible with tiktok-signature
   */
  navigator() {
    return {
      deviceScaleFactor: this.window.devicePixelRatio,
      user_agent: this.window.navigator.userAgent,
      browser_language: this.window.navigator.language,
      browser_platform: this.window.navigator.platform,
      browser_name: this.window.navigator.appCodeName,
      browser_version: this.window.navigator.appVersion
    };
  }

  /**
   * Get _signature GET query
   * @param {string} url Unencrypted url
   * @returns {string} _signature as string
   */
  signature(url) {
    return this.window.byted_acrawler.sign({ url });
  }

  /**
   * Get X-Bogus header
   * @param {string} params Unencrypted GET query
   * @returns {string} X-Bogus string
   */
  bogus(params) {
    return this.window._0x32d649(params);
  }

  /**
   * Get x-tt-params header from GET query
   * @param {string} params Unencrypted GET query
   * @returns {string} Encrypted x-tt-params
   */
  xttparams(params) {
    params += "&verifyFp=undefined";
    params += "&is_encryption=1";
    // Encrypt query string using aes-128-cbc
    const cipher = createCipheriv("aes-128-cbc", Signer.PASSWORD, Signer.PASSWORD);
    return Buffer.concat([cipher.update(params), cipher.final()]).toString("base64");
  }

  /**
   * Sign a TikTok URL
   * @param {string} url_str Unsigned URL
   * @returns Object with signed data or null if error
   */
  sign(url_str) {
    try {
      const url = new URL(url_str);
      const signature = this.signature(url.toString());
      url.searchParams.append('_signature', signature);
      const bogus = this.bogus(url.searchParams.toString());
      url.searchParams.append('X-Bogus', bogus);
      const xttparams = this.xttparams(url.searchParams.toString());
      return {
        signature: signature,
        signed_url: url.toString(),
        "x-tt-params": xttparams,
        "X-Bogus": bogus
      };
    } catch (_e) {
      return null;
    }
  }
}

module.exports = Signer;
