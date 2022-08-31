let todos = require("../data/data");

const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(todos);
  });
}

function create(todo) {
  return new Promise((resolve, reject) => {
    const newTodo = { ...todo };
    todos.push(newTodo);

    writeDataToFile("./data/data.json", todos);

    resolve(newTodo);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    todos = todos.filter((p) => p.id !== id);
    // if (process.env.NODE_ENV !== "test") {
    writeDataToFile("./data/data.json", todos);
    // }
    resolve();
  });
}

module.exports = {
  findAll,
  create,
  remove,
};
