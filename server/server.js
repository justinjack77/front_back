const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // Import bodyParser
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const PORT = 8000;
const myADataBase = 'mydb';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); // Use bodyParser middleware

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
}));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: myADataBase,
});

app.get('/adminuser', (req, res) => {
  const sql = 'SELECT * FROM adminuser';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});



// Middleware to hash the password before storing it in the database
const hashPasswordMiddleware = (req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Password hashing failed.' });
    }
    req.hashedPassword = hashedPassword;
    next();
  });
};

app.post('/addadmin', (req, res) => {
  const { name, username, email, password, role } = req.body;
  // const password = req.hashedPassword;

  const sql = 'INSERT INTO adminuser (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, username, email, password, role], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Server side error' });
    }
    const user = { id: result.insertId, name, username, email, role };
    return res.status(201).json({ message: 'User added successfully.', user });
  });
});

app.put('/adminuser/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  // Validate updatedUserData to ensure it contains the necessary fields and proper values before updating the database.
  // ...

  const sql = 'UPDATE adminuser SET name=?, username=?, email=?, password=?, role=? WHERE id=?';
  db.query(sql, [updatedUserData.name, updatedUserData.username, updatedUserData.email, updatedUserData.password, updatedUserData.role, userId], (err, result) => {
      if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ message: 'Server side error' });
      }
      if (result.affectedRows === 0) {
          // If no rows were affected, the user with the provided ID was not found.
          return res.status(404).json({ message: 'User not found' });
      }
      console.log('User updated successfully.');
      return res.json({ message: 'User updated successfully.' });
  });
});


app.delete('/adminuser/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM adminuser WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ message: 'Server side error' });
      }
      console.log('User deleted successfully.');
      return res.json({ message: 'User deleted successfully.' });
    });
  });


const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // Use req.cookies to access cookies
    if (!token) {
        return res.json({ Message: "We need a token. Please provide it." });
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Message: "Authentication Error" });
            } else {
                req.name = decoded.name;
                req.role = decoded.role;
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM adminuser WHERE email=? AND password=?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.json({ Message: "Server side error" });
        }
        console.log("Fetched Role from DB:", data[0].role);
        if (data.length > 0) {
            const { name, role } = data[0];
            const token = jwt.sign({ name, role }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });

            res.cookie('token', token);
            return res.json({ Status: "Success", role });
        } else {
            return res.json({ Message: "No records exist" });
        }
    });
});




app.get('/logout', (req, res) => {
    console.log("Logout endpoint accessed");
    res.clearCookie('token')
    return res.json({ Status: "Success" })
})

app.listen(PORT, () => {
    console.log(`Server is running with ${PORT} port.....`);
});
