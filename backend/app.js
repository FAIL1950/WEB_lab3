const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
// Database setup
const db = new sqlite3.Database("database.db");
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS "user_clocks" ("clock_id"	INTEGER NOT NULL UNIQUE,"user_id"	INTEGER NOT NULL,"user_time"	TEXT NOT NULL,"user_text"	TEXT NOT NULL,"user_date"	TEXT NOT NULL,PRIMARY KEY("clock_id" AUTOINCREMENT),FOREIGN KEY("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE);');
  db.run('CREATE TABLE IF NOT EXISTS "users" ("user_id"	INTEGER NOT NULL UNIQUE,"email"	TEXT NOT NULL UNIQUE,"name"	TEXT NOT NULL,"sex"	TEXT NOT NULL,"birthday"	TEXT NOT NULL,"password"	TEXT NOT NULL,PRIMARY KEY("user_id" AUTOINCREMENT));');
});

// Routes
app.post("/register", (req, res) => {
  const {name,  email, sex, birthday, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  db.run(
    'INSERT INTO "users" (email, name, sex, birthday, password) VALUES (?, ?, ?, ?, ?)',
    [email, name, sex, birthday, hashedPassword],
    (err) => {
      if (err) {
        res.status(500).json({ message: "An error occurred" });
      } else {
        res.status(201).json({ message: "User created" });
      }
    }
  );
});

app.delete("/clock", (req, res) => {
  const clock_id = req.body.id;
  // const clock_id = 2;
  db.run(`DELETE FROM user_clocks WHERE clock_id = ?`, [clock_id], (err) => {
    if (err) {
      res.status(500).json({ message: "An error occurred" });
    }
    res.status(201).json({ message: `Clock deleted ${clock_id}` });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM "users" WHERE email = ?', [email], (err, row) => {
    if (err) {
      res.status(500).json({ message: "An error occurred" });
    } else if (!row) {
      res.status(401).json({ message: "Email or password is incorrect" });
    } else {
      const passwordIsValid = bcrypt.compareSync(password, row.password);

      if (!passwordIsValid) {
        res.status(401).json({ message: "Email or password is incorrect" });
      } else {
        const token = jwt.sign({ id: row.user_id }, "secret", {
          expiresIn: 86400, // Expires in 24 hours
        });

        res.status(200).json({ auth: true, token: token, name: row.name, sex: row.sex, birthday: row.birthday, password: row.password});
      }
    }
  });
});

app.post("/addclock", (req, res) => {
    const {user_id, time,  date, text } = req.body;
  
    db.run(
      'INSERT INTO "user_clocks" (user_id, user_time, user_text, user_date) VALUES (?, ?, ?, ?)',
      [user_id, time, text, date],
      (err) => {
        if (err) {
          res.status(500).json({ message: "An error occurred" });
        } else {
          res.status(201).json({ message: "User created" });
        }
      }
    );
});

app.get("/profile", (req, res) => {
  const token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: "Failed to authenticate token" });
    }

    db.get('SELECT * FROM "users" WHERE user_id = ?', [decoded.id], (err, row) => {
      if (err) {
        res.status(500).json({ message: "An error occurred" });
      } else if (!row) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ id: row.user_id, email: row.email, name: row.name, sex: row.sex, birthday: row.birthday, password: row.password });
      }
    });
  });
});

app.get("/getclocks", (req, res) => {
  const token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: "Failed to authenticate token" });
    }

db.all('SELECT * FROM user_clocks WHERE user_id = ?', [decoded.id], (err, rows) => {
  if (err) {
    res.status(500).json({ message: "An error occurred" });
  }
   else {
    const clocks = rows.map(row => ({
      clock_id: row.clock_id,
      user_id: row.user_id,
      user_time: row.user_time,
      user_text: row.user_text,
      user_date: row.user_date
    }));
    res.status(200).json({clocks});
  }
});
  });
});
// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
