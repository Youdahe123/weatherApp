const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path')
const PORT = 3000;
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config({path:'./data/api.env'})
const apiKey = process.env.KEY;

app.use(cors());
app.get('/', (req, res) => {
    const lon = req.query.lon || 0.00
    const lat = req.query.lat || 0.00
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(response => {
            res.json({name : response.data.sys['country'], temp : response.data.main['temp']})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json("Error Fetching Data");
        });
});

app.listen(
    PORT,
    () => console.log(`Server is running on PORT:${PORT}!`)
);