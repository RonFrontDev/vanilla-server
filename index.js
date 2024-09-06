import http from "http";

const port = 4000;
const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  res.writeHead(200, { "content-Type": "text/plain" });
  res.write("hallo world");
  res.end("ByeBye world");
}

function onConnect(error) {
  if (error) {
    console.log("server bad");
  } else {
    console.log("server good " + port);
  }
}

server.listen(port, onConnect);
