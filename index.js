// Variaveis de ambiente

const express = require("express");
const exphbs = require("express-handlebars").create({});
const mysql = require("mysql2");
const app = express();

// Handlebars config
app.engine("handlebars", exphbs.engine);
app.set("view engine", "handlebars");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM tasks WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    const task = data;

    res.render("edit", { task });
  });
});

app.post("/edit", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;

  const sql = `UPDATE tasks SET task = '${name}' WHERE id = ${id}`;
  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.post("/del", (req, res) => {
  const id = req.body.id;
  const sql = `DELETE FROM tasks WHERE id = ${id}`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.post("/add", (req, res) => {
  const task = req.body.name;
  const sql = `INSERT INTO tasks (task) VALUES ('${task}')`;
  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.get("/", (req, res) => {
  const sql = `SELECT * FROM tasks`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const task = data;
    res.render("home", { task });
  });
});

// Conexão
const conn = mysql.createConnection({
  host: "localhost",
  database: "todolist",
  user: "root",
  password: "Ruyter99.",
});

/* Nome do banco: "todolist"
Table: "tasks"
Columns: "id, tasks"
*/

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("App rodando");
  app.listen(3000);
});
