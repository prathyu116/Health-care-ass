const http = require("http");
const { getUsers, getUser, updateUser, deleteUser } = require("./src/controller/user.controler");
const { register , login } = require("./src/controller/auth.controller");



const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url.match(/\/user\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[2];
    getUser(req, res, id);
  } else if (req.url === "/register" && req.method === "POST") {
    register(req, res);
  } else if (req.url === "/login" && req.method === "POST") {
    login(req, res);
  } else if (req.url.match(/\/user\/edit\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  } else if (req.url.match(/\/user\/delete\/([0-9]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Rote Not Found" }));
  }
});
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
