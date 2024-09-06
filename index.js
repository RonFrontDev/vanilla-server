import http from "http";
import fs from "fs";

const port = 4000;
const server = http.createServer(handleRequest);

function handleRequest(error, data) {
  fs.readFile("index.html", handleError);
}

function (error, data) {
  if (error) {
    res.writeHead(404,{"Content-Type": "text/plain"});
    res.write("Error:file not found");
  } else {
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(data);
  }
  res.end();
}

function onConnect(error) {
  if (error) {
    console.log("server bad");
  } else {
    console.log("server good " + port);
  }
}

server.listen(port, onConnect);
