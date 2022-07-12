const usersDB = require("../data/user.json");

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
    const newUser = {id: Date.now() , ...user};
    usersDB.push(newUser);
    resolve(newUser);
  });
};

module.exports = {
  findAllUser,
  findById,
  create,
};
