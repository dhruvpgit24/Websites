const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to avoid filename conflicts
    }
});

const upload = multer({ storage: storage });

// Add package endpoint
app.post('/addPackage', upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!name || !description || !imagePath) {
        return res.status(400).json({ message: 'Name, description, and image are required' });
    }

    const newPackage = {
        id: Date.now().toString(),
        name,
        description,
        image: imagePath
    };

    // Read the existing packages from db.json
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading database file:', err);
            return res.status(500).json({ message: 'Error reading database file' });
        }

        try {
            const db = JSON.parse(data);
            db.packages = db.packages || [];
            db.packages.push(newPackage);

            // Save the updated packages back to db.json
            fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error saving package to database:', err);
                    return res.status(500).json({ message: 'Error saving package to database' });
                }

                res.json({ message: 'Package added successfully', package: newPackage });
            });
        } catch (parseError) {
            console.error('Error parsing database file:', parseError);
            return res.status(500).json({ message: 'Error parsing database file' });
        }
    });
});

// Inside server.js

// Add package delete endpoint
app.delete('/packages/:id', (req, res) => {
    const packageId = req.params.id;

    // Read the existing packages from db.json
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading database file:', err);
            return res.status(500).json({ message: 'Error reading database file' });
        }

        try {
            let db = JSON.parse(data);
            const updatedPackages = db.packages.filter(pkg => pkg.id !== packageId);

            if (updatedPackages.length === db.packages.length) {
                return res.status(404).json({ message: 'Package not found' });
            }

            // Remove associated image file
            const imagePath = db.packages.find(pkg => pkg.id === packageId).image;
            if (imagePath) {
                fs.unlinkSync(imagePath);
            }

            db.packages = updatedPackages;

            // Save the updated packages back to db.json
            fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error saving packages to database:', err);
                    return res.status(500).json({ message: 'Error saving packages to database' });
                }

                res.json({ message: 'Package deleted successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing database file:', parseError);
            return res.status(500).json({ message: 'Error parsing database file' });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
