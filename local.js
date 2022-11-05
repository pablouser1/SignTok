const Signer = require("./src/Signer")
const Utils = require("./src/Utils")

if (process.argv.length > 2) {
  const signer = new Signer()
  const url = process.argv[2]

  const data = signer.sign(url)
  console.log(Utils.makePayload(data, signer.navigator()))
}
