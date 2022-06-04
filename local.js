const Signer = require("./src/Signer")

if (process.argv.length > 2) {
  const signer = new Signer()
  const url = process.argv[2]

  const data = signer.sign(url)
  console.log(data)
}
