const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "192.168.1.202",
  user: "root",
  password: "",
  database: "gestion_patients",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("Erreur connexion MySQL:", err);
  } else {
    console.log("Connecté à MySQL");
  }
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Utilisateur ajouté" });
  });
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://192.168.1.202:3000");
});