// install and import express
const exprese = require("express");
const crypto = require("crypto");
const path = require("path");
const http = require("http");

const { getUsers, getUser, createUser } = require("./controller/user.controler");
// let app = exprese();

// app.use(exprese.json());

// app.get("/", async (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, "/assets/users.html"));
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });
// app.get("/users", async (req, res) => {
//   try {
//     return res.status(200).json({ users: DB });
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });
// app.get("/users/:id", async (req, res) => {
//   try {
//     const user = DB.filter((user) => user.id === Number(req.params.id));
//     if (user.length === 0) {
//       return res.status(404).json({ message: "User Not Found" });
//     }
//     return res.status(200).json({ user: user });
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });
// app.post("/users", async (req, res) => {
//   try {
//     const id = Date.now();
//     const newuser = {...req.body,id:id};

//     DB.push(newuser);
//     return res.status(201).json({ updatedDB: DB });
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/users" && req.method === "GET") {
   getUsers(req,res)
  }else if (req.url.match(/\/user\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[2];
       getUser(req, res,id);
  }else if (req.url === "/user/create" && req.method === "POST") {
    createUser(req,res)
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
