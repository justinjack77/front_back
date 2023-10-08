const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const PORT = 5000;
const myADataBase = "mydb";
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cookieParser()); // Initialize cookie-parser
app.use(cors({
    origin: "http://localhost:5173", // Ensure this matches your frontend origin
    methods: ["POST", "GET"],
    credentials: true
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: myADataBase
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
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM adminuser WHERE email=? AND password=?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ Message: "Server side error" });
        if (data.length > 0) {
            const name = data[0].name;
            const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success" });
        } else {
            return res.json({ Message: "No records exist" });
        }
    });
});

app.get('/logout',(req,res) => {
    console.log("Logout endpoint accessed");
    res.clearCookie('token')
    return res.json({Status: "Success"})
})

app.listen(PORT, () => {
    console.log(`Server is running with ${PORT} port.....`);
});
