const Signer = require("./src/Signer")
const bodyParser = require("body-parser")
const express = require("express")

const port = process.env.PORT || 8080
const app = express()
app.use(bodyParser.text())

const signer = new Signer()

app.get('/', (req, res) => {
  res.redirect('https://github.com/pablouser1/SignTok')
})

app.post("/signature", (req, res) => {
  const url = req.body
  const data = signer.sign(url)
  console.log("Sent data from request with url: " + url)
  res.send({
    status: "ok",
    data: {
      ...data,
      navigator: signer.navigator()
    }
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
