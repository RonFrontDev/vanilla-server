import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const port = 4000;
const root = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  console.log(req.url);

  // If root, serve index.html, otherwise get the requested URL
  let fileName = req.url === "/" ? "index.html" : req.url;

  // Build the full file path from the requested URL
  let filePath = path.join(root, "public", fileName);

  // Check if the requested path is a directory and if so, serve index.html inside it
  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // If no file extension is provided, assume it's an HTML file
  if (!path.extname(filePath)) {
    filePath += ".html";
  }

  // Read and serve the file
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
    console.log("server good on port " + port);
  }
});
