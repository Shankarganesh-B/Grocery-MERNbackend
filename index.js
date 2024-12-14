const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const users = [];
const groceryItems = [];


app.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(function (user) {
        return user.username === username;
    });

    if (userExists) {
        return res.status(400).json({ message: "User already exists!" });
    }

    users.push({ username: username, password: password });
    res.status(201).json({ message: "Signup successful!" });
});


app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(function (u) {
        return u.username === username && u.password === password;
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login successful!" });
});


app.post('/add-grocery', function (req, res) {
    const item = req.body.item;
    groceryItems.push(item);
    res.status(201).json({ message: "Grocery item added successfully!", items: groceryItems });
    console.log(groceryItems);
});


app.delete('/delete-grocery', function (req, res) {
    const item = req.body.item;
    const index = groceryItems.indexOf(item);

    if (index > -1) {
        groceryItems.splice(index, 1);
    }

    res.status(200).json({ message: "Grocery item deleted successfully!", items: groceryItems });
});


app.get('/grocery-items', function (req, res) {
    res.status(200).json(groceryItems);
});


app.listen(5000, function () {
    console.log("Server started on port 5000");
});
