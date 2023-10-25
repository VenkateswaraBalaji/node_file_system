const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const fs = require("fs");
const { clearScreenDown } = require('readline');
const path = require('path');
const app = express();


app.use(express.json()); // Corrected the usage of app.use

const PORT = 4000;

if (!fs.existsSync(`${__dirname}/TimeFiles`, err => {
    if (err) {
        return err;
    }
})) {
    const path = require('path');
fs.mkdir(path.resolve(path.join(__dirname, 'TimeFiles')), err => {

        if (err) {
            return err;
        }
    });
}

app.post('/createfile',(req, res) => {
   try {
      let date = new Date();

//     const date = new Date();
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

     //const filename = `${date.toLocaleString('en-US', options)}.txt`;
// const data = `Current date and time in India is ${date.toLocaleString('en-US', options)}`;
let filename = `${date.toLocaleString('en-US',options)}.txt`;    
let data = `Current date and time in India is ${date.toLocaleString('en-US', options)}`;
// let filename = `${date.toISOString()}.txt`;
    
    // let data = `Current date and time is ${date.toISOString()}`;
   
 
  const paths = path.resolve(path.join(__dirname,"TimeFiles",filename))
  console.log(paths)
  console.log(filename)

    fs.writeFile(paths, data, (err) => {
        if (err) {
            console.error("Error creating file:", err);
            res.status(500).send("Error creating the file.");
        } else {
            console.log("File created successfully:", filename);
            res.send("Timefile created successfully");
        }
    });
   } catch (e) {
 console.log(e)
   }
});

app.get("/getfile", (req, res) => {
    let files = fs.readdirSync(`${__dirname}/TimeFiles`);
    console.log(files);
    res.send(files);
});

app.listen(PORT, () =>
    console.log("Server is running on port " + PORT)
);
