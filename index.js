// Variaveis de ambiente

const express = require("express");
const exphbs = require("express-handlebars").create({});
const conn = require("./db/conn");
const Task = require("./models/Task");
const app = express();

// Handlebars config
app.engine("handlebars", exphbs.engine);
app.set("view engine", "handlebars");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({ raw: true, where: { id: id } });

  res.render("edit", { task });
});

app.post("/edit", async (req, res) => {
  const name = req.body.name;
  const id = req.body.id;

  await Task.update({ task: name }, { where: { id: id } });

  res.redirect("/");
});

app.post("/del", async (req, res) => {
  const id = req.body.id;

  await Task.destroy({ where: { id: id } });
  res.redirect("/");
});

app.post("/add", async (req, res) => {
  const task = req.body.name;
  await Task.create({ task: task });
  res.redirect("/");
});

app.get("/", async (req, res) => {
  const task = await Task.findAll({ raw: true });
  res.render("home", { task });
});

// Conexão

/* Nome do banco: "todolist"
Table: "tasks"
Columns: "id, tasks"
*/

conn
  .sync()
  .then(() => {
    app.listen(3000);
    console.log("app rodando");
  })
  .catch((err) => {
    console.log("Erro: " + err);
  });
