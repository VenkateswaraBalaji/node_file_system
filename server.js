const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const fs = require("fs");
const path = require('path');
const app = express();

app.use(express.json());

const PORT = 4000;

const timeFilesDir = path.join(__dirname, 'TimeFiles');

// Check if the TimeFiles directory exists, and create it if it doesn't.
if (!fs.existsSync(timeFilesDir)) {
    try {
        fs.mkdirSync(timeFilesDir);
    } catch (err) {
        console.error("Error creating directory:", err);
    }
}

app.post('/createfile', (req, res) => {
    try {
        let date = new Date();
        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
            timeZone: 'Asia/Kolkata',
        };

        function sanitizeFilename(filename) {
            // Remove characters that are not allowed in file names
            return filename.replace(/[/\\?%*:|"<>]/g, "_");
        }

        let filename = `${date.toLocaleString('en-US', options)}.txt`;
        filename = sanitizeFilename(filename);
        
        let data = `Current date and time in India is ${date.toLocaleString('en-US', options)}`;
        const filePath = path.resolve(path.join(timeFilesDir, filename));

        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error("Error creating file:", err);
                res.status(500).send("Error creating the file.");
            } else {
                console.log("File created successfully:", filename);
                res.send("Timefile created successfully");
            }
        });
    } catch (e) {
        console.log(e);
    }
});

app.get("/getfile", (req, res) => {
    try {
        let files = fs.readdirSync(timeFilesDir);
        console.log(files);
        res.send(files);
    } catch (err) {
        console.error("Error reading directory:", err);
        res.status(500).send("Error reading the directory.");
    }
});

app.listen(PORT, () =>
    console.log("Server is running on port " + PORT)
);
