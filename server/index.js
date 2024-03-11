const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const openDb = () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo",
    password: "29739300",
    port: 5432,
  });
  return pool;
};

app.get("/", (req, res) => {
  const pool = openDb();
  pool.query("select * from task", (err, result) => {
    pool.end();
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.status(200).json(result.rows);
  });
});

app.post("/new", (req, res) => {
  const pool = openDb();

  pool.query(
    "insert into task (description) values ($1) returning *",
    [req.body.description],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ id: result.rows[0].id });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Port ${port} has been listening.....`);
});
