require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { query } = require("./helpers/db");
// const { Pool } = require("pg");
// console.log(process.env);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;
console.log(process.env.foo);
app.get("/", async (req, res) => {
  // console.log(query);
  try {
    const result = await query("select * from task");
    // console.log(result);
    // this is for empty database checking.
    const rows = result.rows ? result.rows : [];
    res.status(200).json(rows);
  } catch (error) {
    console.log(err);
    res.statusMessage = err;
    res.status(500).json({ error: err });
  }

  // old query code before db.js was created.
  // const pool = openDb();
  // pool.query("select * from task", (err, result) => {
  //   pool.end();
  //   if (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  //   res.status(200).json(result.rows);
  // });
});

// old post
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

app.post("/new", async (req, res) => {
  try {
    const result = await query(
      "insert into task (description) values ($1) returning *",
      [req.body.description]
    );
    res
      .status(200)
      .json({ id: result.rows[0].id, desc: result.rows[0].description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await query("delete from task where id = $1", [id]);
    // console.log(result);
    res.status(200).json({ id: id });
  } catch (err) {
    console.log(err);
    res.statusMessage = err;
    res.status(500).json({ error: err });
  }
});

app.listen(port, () => {
  console.log(`Port ${port} has been listening.....`);
});
