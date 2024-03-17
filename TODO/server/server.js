require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { todoRouter } = require("./routes/todo");
// const { query } = require("./helpers/db");
// const { Pool } = require("pg");
// console.log(process.env);
// console.log(process.env.foo);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", todoRouter);
const port = process.env.PORT;

// assignment 5 - post , old one
// app.post("/new", (req, res) => {
//   const pool = openDb();
//   pool.query(
//     "insert into task (description) values ($1) returning *",
//     [req.body.description],
//     (err, result) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//       } else {
//         res
//           .status(200)
//           .json({ id: result.rows[0].id, desc: result.rows[0].description });
//       }
//     }
//   );
// });

// assignment 5 - delete , old one
// app.delete("/delete/:id", async (req, res) => {
//   const pool = openDb();
//   const id = parseInt(req.params.id);
//   pool.query("delete from task where id = $1", [id], (err, result) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.status(200).json({ id: id });
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Port ${port} has been listening.....`);
});
