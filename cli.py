from TikTokSigner.Signer import Signer
from sys import argv
import json

if __name__ == '__main__':
    if len(argv) > 1:
        signer = Signer()
        data = signer.sign(argv[1])
        nav = signer.navigator()
        res = {
            'status': 'ok',
            'data': data,
            'navigator': nav
        }
        print(json.dumps(res))
        signer.cleanup()
    else:
        print('You need to type a url!')
