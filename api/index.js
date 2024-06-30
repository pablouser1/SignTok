const Signer = require("../src/Signer");
const http = require("http");
const Utils = require("../src/Utils");

const PORT = process.env.PORT || 8080;

const signer = new Signer();

const server = http.createServer(async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Cache-Control": "s-max-age=1, stale-while-revalidate" // caching stuff for vercel
  });
  if (req.method === "POST") {
    // Get url from POST body
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const url = Buffer.concat(buffers).toString();

    const data = signer.sign(url);
    if (data !== null) {
      console.log("Sending data from request with url: " + url);
    }
    res.write(Utils.makePayload(data, signer.navigator()));
  } else {
    res.write(
      JSON.stringify({
        status: "error",
        data: "You have to send a POST request with a valid TikTok URL on the body!"
      })
    )
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
