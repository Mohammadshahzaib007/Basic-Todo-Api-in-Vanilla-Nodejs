const Todos = require("../models/todoModel");

const todos = require("../data/data");

async function getTodos(req, res) {
  try {
    const todos = await Todos.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: 200, todos: todos }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end({ message: "something went wrong" });
  }
}

async function createTodo(req, res) {
  const { url } = req;

  const data = url.split("?")[1]?.split("&");

  if (!data) {
    return res.end(JSON.stringify({ message: "Invalid data", status: 400 }));
  }

  try {
    const title = data[0].split("=")[1].replace(/%20/g, " ");
    const completed = JSON.parse(data[1]?.split("=")[1]);

    const payload = { id: todos.length + 1, title, completed };

    Todos.create(payload);
    res.end(
      JSON.stringify({
        data: payload,
        status: 200,
        message: "Todo added successfully!",
      })
    );
  } catch (error) {
    res.end(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
}

async function deleteTodo(req, res) {
  const { url } = req;

  const id = Number(url?.split("?")[1]?.split("=")[1]);

  if (!id) {
    return res.end(JSON.stringify({ message: "Pass the item `id`" }));
  }

  try {
    Todos.remove(id);
    res.end(
      JSON.stringify({ message: "Item deleted successfully!", status: 201 })
    );
  } catch (error) {
    res.end(JSON.stringify({ message: "Something went wrong!", status: 500 }));
  }
}

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
};
