const http = require("http");

const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("./controllers/todoController");

const requestHandler = async (req, res) => {
  const { url, method } = req;

  if (url === "/todos" && method === "GET") {
    getTodos(req, res);
  } else if (url.includes("/todos") && method === "POST") {
    createTodo(req, res);
  } else if (url.includes("/todos") && method === "DELETE") {
    deleteTodo(req, res);
  } else if (url.includes("/todos") && method === "UPDATE") {
    updateTodo(req, res);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: 404, message: "Route not found!" }));
  }
};

const server = http.createServer(requestHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
