const Signer = require("./src/Signer")
const http = require("http")

const PORT = process.env.PORT || 8080

const signer = new Signer()

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    res.writeHead(301, {
      "Location": "https://github.com/pablouser1/SignTok"
    })
  }
  else if (req.url === "/signature" && req.method === "POST") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    // Get url from POST body
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const url = Buffer.concat(buffers).toString();

    const data = signer.sign(url)
    console.log("Sent data from request with url: " + url)
    res.write(JSON.stringify({
      status: "ok",
      data: {
        ...data,
        navigator: signer.navigator()
      }
    }));
  }

  // If no route present
  else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    })
    res.write(JSON.stringify({
      message: "Route not found"
    }))
  }
  res.end()
})

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
})
