const Signer = require("../src/Signer")
const http = require("http")

const PORT = process.env.PORT || 8080

const signer = new Signer()

const server = http.createServer(async (req, res) => {
  if (req.method === "POST") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "s-max-age=1, stale-while-revalidate" // caching stuff for vercel
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
  res.end()
})

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
})
