const usersDB = require("../database/user.json");
const crypto = require("crypto");
const path = require("path");
const { writeDataToFile } = require("../util");

const salt = "qwerty";
const hashPwd = function hashPwd(salt, pwd) {
  const hmac = crypto.createHmac("sha256", salt);
  return hmac.update(pwd).digest("hex");
};
const checkPassword =  (pwd,email) => {
 let hashedPassword = hashPwd(salt, pwd);
 const found = usersDB.find((usr) => usr.email === email && usr.password === hashedPassword);
 console.log(found)
 return found

};
const findAllUser = () => {
  return new Promise((resolve, reject) => {
    resolve(usersDB);
  });
};
const findOne = (user) => {
  const found = usersDB.find((usr) => usr.email === user.email);
  return found;
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const user = usersDB.filter((user) => user.id === Number(id));
    resolve(user);
  });
};
const create = (user) => {
  return new Promise((resolve, reject) => {
    const passHash = hashPwd(salt, user.password);
    console.log(passHash);
    const newUser = { id: Date.now(), ...user, password:passHash };
    usersDB.push(newUser);
    writeDataToFile(path.join(__dirname, "../database/user.json"), usersDB);
    resolve(newUser);
  });
};

const edit = (id, user) => {
  return new Promise((resolve, reject) => {
    const index = usersDB.findIndex((usr) => Number(usr.id) === Number(id));
    usersDB[index] = { id, ...user };
    console.log("AFTE", usersDB);
    writeDataToFile(path.join(__dirname, "../database/user.json"), usersDB);
    resolve(usersDB[index]);
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const newDB = usersDB.filter((usr) => Number(usr.id) !== Number(id));
    writeDataToFile(path.join(__dirname, "../database/user.json"), newDB);
    resolve(newDB);
  });
};
module.exports = {
  findAllUser,
  findOne,
  findById,
  create,
  edit,
  deleteUser,
  checkPassword,
};
