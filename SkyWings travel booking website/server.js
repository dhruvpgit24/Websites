const express = require('express');
const path = require('path');
const PORT = 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'templates')));

app.get('/home', (req, res) => {
res.sendFile(path.join(__dirname, 'templates', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'about.html'));
});

app.get('/trip', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'trip.html'));
});

app.get('/package', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'package.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'contact.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'login.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'profile.html'));
});

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})

