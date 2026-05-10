const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestion_patient",
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
  const { email, password, roles } = req.body;

  const sql = "INSERT INTO user (email, password, roles) VALUES (?, ?, ?)";
  db.query(sql, [email, password, roles || JSON.stringify(["ROLE_USER"])], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Utilisateur ajouté" });
  });
});

function parseRoles(rawRoles) {
  try {
    const parsed = JSON.parse(rawRoles);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    if (parsed && typeof parsed === "object") {
      return Object.values(parsed);
    }
  } catch (error) {
    return [];
  }

  return [];
}

function resolveAppRole(roles) {
  if (roles.includes("ROLE_ADMINISTRATIF")) {
    return "ROLE_ADMINISTRATIF";
  }

  if (roles.includes("ROLE_INFIRMIER")) {
    return "ROLE_INFIRMIER";
  }

  return null;
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email et mot de passe requis" });
  }

  const sql = "SELECT id, email, password, roles FROM user WHERE email = ? LIMIT 1";

  db.query(sql, [email], async (err, rows) => {
    if (err) {
      console.error("Erreur SQL /login:", err);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

    if (!rows || rows.length === 0) {
      return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    const user = rows[0];
    const normalizedHash = typeof user.password === "string"
      ? user.password.replace(/^\$2y\$/, "$2b$")
      : "";

    const isPasswordValid = await bcrypt.compare(password, normalizedHash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
    }

    const roles = parseRoles(user.roles);
    const role = resolveAppRole(roles);

    if (!role) {
      return res.status(403).json({ success: false, message: "Aucun role autorise" });
    }

    return res.json({
      success: true,
      role,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  });
});

app.get("/patients", (req, res) => {
  const sql = `
    SELECT
      p.id,
      p.nom,
      p.prenom,
      p.telephone,
      p.sexe,
      p.note,
      p.localite_id,
      l.ville,
      l.code_postal
    FROM patient p
    LEFT JOIN localite l ON l.id = p.localite_id
    ORDER BY p.id ASC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Erreur SQL /patients:", err);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

    const patients = rows.map((row) => ({
      id: row.id,
      nom: row.nom,
      prenom: row.prenom,
      telephone: row.telephone,
      sexe: row.sexe,
      note: row.note,
      localiteId: row.localite_id,
      localite: row.ville ? `${row.ville} (${row.code_postal})` : "",
    }));

    return res.json({ success: true, patients });
  });
});

app.post("/patients", (req, res) => {
  const { nom, prenom, telephone, sexe, note, localiteId } = req.body;

  if (!nom || !prenom || !telephone || !sexe) {
    return res.status(400).json({ success: false, message: "Champs requis manquants" });
  }

  const parsedLocaliteId = Number.parseInt(localiteId, 10);
  const safeLocaliteId = Number.isInteger(parsedLocaliteId) ? parsedLocaliteId : null;

  const sql = `
    INSERT INTO patient (localite_id, nom, prenom, telephone, sexe, note)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [safeLocaliteId, nom, prenom, telephone, sexe, note || ""], (err, result) => {
    if (err) {
      console.error("Erreur SQL POST /patients:", err);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

    return res.status(201).json({
      success: true,
      message: "Patient ajoute",
      patientId: result.insertId,
    });
  });
});

app.get("/patients/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: "ID patient invalide" });
  }

  const sql = `
    SELECT
      p.id,
      p.nom,
      p.prenom,
      p.telephone,
      p.sexe,
      p.note,
      p.localite_id,
      l.ville,
      l.code_postal
    FROM patient p
    LEFT JOIN localite l ON l.id = p.localite_id
    WHERE p.id = ?
    LIMIT 1
  `;

  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("Erreur SQL GET /patients/:id:", err);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: "Patient introuvable" });
    }

    const row = rows[0];
    return res.json({
      success: true,
      patient: {
        id: row.id,
        nom: row.nom,
        prenom: row.prenom,
        telephone: row.telephone,
        sexe: row.sexe,
        note: row.note,
        localiteId: row.localite_id,
        localite: row.ville ? `${row.ville} (${row.code_postal})` : "",
      },
    });
  });
});

app.put("/patients/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: "ID patient invalide" });
  }

  const { nom, prenom, telephone, sexe, note } = req.body;

  if (!nom || !prenom || !telephone || !sexe) {
    return res.status(400).json({ success: false, message: "Champs requis manquants" });
  }

  const sql = `
    UPDATE patient
    SET nom = ?, prenom = ?, telephone = ?, sexe = ?, note = ?
    WHERE id = ?
  `;

  db.query(sql, [nom, prenom, telephone, sexe, note || "", id], (err, result) => {
    if (err) {
      console.error("Erreur SQL PUT /patients/:id:", err);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Patient introuvable" });
    }

    return res.json({ success: true, message: "Patient modifie" });
  });
});

app.delete("/patients/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: "ID patient invalide" });
  }

  db.beginTransaction((txErr) => {
    if (txErr) {
      console.error("Erreur transaction DELETE /patients/:id:", txErr);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

    db.query("DELETE FROM sejour WHERE patient_id = ?", [id], (sejourErr, sejourResult) => {
      if (sejourErr) {
        return db.rollback(() => {
          console.error("Erreur SQL DELETE sejour lie au patient:", sejourErr);
          return res.status(500).json({ success: false, message: "Erreur serveur" });
        });
      }

      db.query("DELETE FROM patient WHERE id = ?", [id], (patientErr, patientResult) => {
        if (patientErr) {
          return db.rollback(() => {
            console.error("Erreur SQL DELETE /patients/:id:", patientErr);
            return res.status(500).json({ success: false, message: "Erreur serveur" });
          });
        }

        if (!patientResult || patientResult.affectedRows === 0) {
          return db.rollback(() => {
            return res.status(404).json({ success: false, message: "Patient introuvable" });
          });
        }

        db.commit((commitErr) => {
          if (commitErr) {
            return db.rollback(() => {
              console.error("Erreur commit DELETE /patients/:id:", commitErr);
              return res.status(500).json({ success: false, message: "Erreur serveur" });
            });
          }

          return res.json({
            success: true,
            message: "Patient supprime",
            sejoursSupprimes: sejourResult?.affectedRows || 0,
          });
        });
      });
    });
  });
});

app.get("/sejours", (req, res) => {
  const sql = `
    SELECT
      s.id,
      s.date_entree,
      s.date_sortie,
      s.libelle,
      s.statut_du_jour,
      s.patient_id,
      s.chambre_id,
      p.nom AS patient_nom,
      p.prenom AS patient_prenom,
      c.etage AS chambre_etage
    FROM sejour s
    LEFT JOIN patient p ON p.id = s.patient_id
    LEFT JOIN chambre c ON c.id = s.chambre_id
    ORDER BY s.id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Erreur SQL GET /sejours:", err);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

    const sejours = rows.map((row) => ({
      id: row.id,
      dateEntree: row.date_entree,
      dateSortie: row.date_sortie,
      libelle: row.libelle,
      statutDuJour: row.statut_du_jour,
      patientId: row.patient_id,
      chambreId: row.chambre_id,
      patient: row.patient_nom ? `${row.patient_nom} ${row.patient_prenom || ""}`.trim() : "N/A",
      chambre: row.chambre_id ? `Chambre ${row.chambre_id}` : "N/A",
      etage: row.chambre_etage ?? "N/A",
    }));

    return res.json({ success: true, sejours });
  });
});

app.post("/sejours", (req, res) => {
  const { dateEntree, dateSortie, libelle, statutDuJour, patientId, chambreId } = req.body;

  if (!dateEntree || !dateSortie || !libelle || !statutDuJour || !patientId || !chambreId) {
    return res.status(400).json({ success: false, message: "Champs requis manquants" });
  }

  const parsedPatientId = Number.parseInt(patientId, 10);
  const parsedChambreId = Number.parseInt(chambreId, 10);

  if (!Number.isInteger(parsedPatientId) || !Number.isInteger(parsedChambreId)) {
    return res.status(400).json({ success: false, message: "Patient ou chambre invalide" });
  }

  const sql = `
    INSERT INTO sejour (patient_id, chambre_id, date_entree, date_sortie, libelle, statut_du_jour)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [parsedPatientId, parsedChambreId, dateEntree, dateSortie, libelle, statutDuJour],
    (err, result) => {
      if (err) {
        console.error("Erreur SQL POST /sejours:", err);
        return res.status(500).json({ success: false, message: "Erreur serveur" });
      }

      return res.status(201).json({
        success: true,
        message: "Sejour ajoute",
        sejourId: result.insertId,
      });
    }
  );
});

app.put("/sejours/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: "ID sejour invalide" });
  }

  const { dateEntree, dateSortie, libelle, statutDuJour, patientId, chambreId } = req.body;

  if (!dateEntree || !dateSortie || !libelle || !statutDuJour || !patientId || !chambreId) {
    return res.status(400).json({ success: false, message: "Champs requis manquants" });
  }

  const parsedPatientId = Number.parseInt(patientId, 10);
  const parsedChambreId = Number.parseInt(chambreId, 10);

  if (!Number.isInteger(parsedPatientId) || !Number.isInteger(parsedChambreId)) {
    return res.status(400).json({ success: false, message: "Patient ou chambre invalide" });
  }

  const sql = `
    UPDATE sejour
    SET patient_id = ?, chambre_id = ?, date_entree = ?, date_sortie = ?, libelle = ?, statut_du_jour = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [parsedPatientId, parsedChambreId, dateEntree, dateSortie, libelle, statutDuJour, id],
    (err, result) => {
      if (err) {
        console.error("Erreur SQL PUT /sejours/:id:", err);
        return res.status(500).json({ success: false, message: "Erreur serveur" });
      }

      if (!result || result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Sejour introuvable" });
      }

      return res.json({ success: true, message: "Sejour modifie" });
    }
  );
});

app.delete("/sejours/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: "ID sejour invalide" });
  }

  db.query("DELETE FROM sejour WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL DELETE /sejours/:id:", err);
      return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Sejour introuvable" });
    }

    return res.json({ success: true, message: "Sejour supprime" });
  });
});

//Partie Infirmier


app.listen(3000, "0.0.0.0", () => {
  console.log("Serveur lancé sur le port 3000 (0.0.0.0)");
});