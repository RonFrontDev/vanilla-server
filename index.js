import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const port = 4000;
const root = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  console.log(req.url);
  const fileName = req.url === "/" ? "index.html" : req.url;
  const filePath = path.join(root, "public", fileName);
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("Error: file not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
    }
    res.end();
  });
});

server.listen(port, (error) => {
  if (error) {
    console.log("server bad");
  } else {
    console.log("server good " + port);
  }
});
