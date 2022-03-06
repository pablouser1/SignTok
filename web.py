import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from TikTokSigner.Signer import Signer
from os import getenv

signer = Signer()

class TikServer(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        url = post_data.decode()

        data = signer.sign(url)
        nav = signer.navigator()

        res = {
            'status': 'ok',
            'data': {
                **data,
                'navigator': nav
            }
        }

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(res).encode())

if __name__ == '__main__':
    PORT = getenv('PORT', 8080)
    try:
        print('Starting server')
        httpd = HTTPServer(('0.0.0.0', PORT), TikServer)
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.shutdown()
