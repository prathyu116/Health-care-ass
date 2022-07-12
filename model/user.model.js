const usersDB = require("../database/user.json");
const path = require("path");

const { writeDataToFile } = require("../util");

const findAllUser = () => {
  return new Promise((resolve, reject) => {
    resolve(usersDB);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const user = usersDB.filter((user) => user.id === Number(id));
    resolve(user);
  });
};
 const create = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: Date.now(), ...user };
    usersDB.push(newUser);
    writeDataToFile(path.join(__dirname, "../database/user.json"), usersDB);
    resolve(newUser);
  });
};

const edit = (id, user) => {
  return new Promise((resolve, reject) => {
    const index = usersDB.findIndex((usr) => Number(usr.id) === Number(id));
    usersDB[index] = {id,...user};
    console.log("AFTE", usersDB);
    writeDataToFile(path.join(__dirname, "../database/user.json"), usersDB);
    resolve(usersDB[index]);
  })
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const newDB = usersDB.filter((usr) => Number(usr.id) !== Number(id));
    writeDataToFile(path.join(__dirname, "../database/user.json"), newDB);
    resolve(newDB);
  });
}
module.exports = {
  findAllUser,
  findById,
  create,
  edit,
  deleteUser,
};
