// Importar node packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
//..imports
import fs from "fs";
import Router from "express";
import e from "express";

//--REST SERVER--//
const app = express();

// client can be postman | react website | react localhost link | etc
const clientURL = "http://localhost:5500";

// CORS options
const corsOptions = {
  origin: clientURL,
};
app.use(cors(corsOptions));

// output dados de pedido HTTP - logger
app.use(morgan("short"));

// parse dados dos pedidos no content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--ROUTES--//
const router = Router();

const datajson = fs.readFileSync("savedData.json", "utf-8"); // Read string-json from file
const data = JSON.parse(datajson); // Parse to JSON

// GET all todos
router.get("/", (req, res) => {
  res.send(data);
});
// GET total todos
router.get("/1", (req, res) => {
  // get total todos
  const totalTodos = data.to_do.length;
  res.send({ totalTodos });
});
// GET total, done, not done
router.get("/2", (req, res) => {
  // get total todos done and total todos not done
  const totalTodosDone = data.to_do.filter((todo) => !todo.done).length;
  const totalTodosNotDone = data.to_do.filter((todo) => todo.done).length;
  res.send({ totalTodosDone, totalTodosNotDone });
});
// GET one todo by id
router.get("/3/:id", (req, res) => {
  // get todo by id
  const todo = data.to_do.find((todo) => todo.id === (req.params.id));
  res.send(todo);
});
// POST Create to do
// create new to do
router.post("/4", (req, res) => {
  const newTodo = {
    id: getRandomInt(100),
    title: req.body.title,
    done: false,
  };
  data.to_do.push(newTodo);

  const fileData = JSON.stringify(data);
  fs.writeFileSync("savedData.json", fileData, "utf-8");
  res
    .status(201)
    .send({ message: "To do created", data: newTodo });
});

// create function random numbers between 1 and 100
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

// PUT Update desc ou done
// update desc or done
router.put("/5/:id", (req, res) => {
  const todo = data.to_do.find((todo) => todo.id === (req.params.id));
  if (req.body.desc) {
    todo.desc = req.body.desc;
  }
  if (req.body.done) {
    todo.done = req.body.done;
  }
  res.send(todo);
});
// PUT toggle done
// toggle done false to true and true to false
router.put("/6/:id", (req, res) => {
  const todo = data.to_do.find((todo) => todo.id === (req.params.id));
  todo.done = !todo.done;
  res.send(todo);
});

// DELETE delete to do
// delete to do by id
router.delete("/7/:id", (req, res) => {
  const todo = data.to_do.find((todo) => todo.id === (req.params.id));
  const index = data.to_do.indexOf(todo);
  data.to_do.splice(index, 1);
  res.send({ message: "To do deleted", data: todo });
});

app.use(router);

router.post("/post-example", (req, res) => {
  const requestBody = req.body;
  const fileData = JSON.stringify(requestBody);
  fs.writeFileSync("savedData.json", fileData, "utf-8");

  res.send({ message: "file saved", data: requestBody });
});

// correr server no url host:port definido em .env
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    "Server up and running at http://%s:%s",
    process.env.SERVER_HOST,
    process.env.SERVER_PORT
  );
});
