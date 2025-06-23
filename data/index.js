// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = 3000;
const apiKey = process.env.KEY;
const mongoURL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(async () => {
    console.log("Database connected successfully");

    // Define schema and model
    const userSchema = new mongoose.Schema({
      country: String,
      lat: Number,
      lon: Number,
      temperature: Number,
      weatherCondition: String,
      searchedAt: {
        type: Date,
        default: Date.now,
      },
      isTemplate: {
        type: Boolean,
        default: false,
      },
    });

    const userModel = mongoose.model('User', userSchema);

    // Create template once if needed
    const existingTemplate = await userModel.findOne({ isTemplate: true });
    if (!existingTemplate) {
      await userModel.create({
        isTemplate: true,
        country: "Template",
        lat: 0,
        lon: 0,
        temperature: 0,
        weatherCondition: "N/A",
      });
    }

    // GET current weather
    app.get('/', (req, res) => {
      const lon = req.query.lon || 0.00;
      const lat = req.query.lat || 0.00;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(response => {
          res.json({
            name: response.data.sys.country,
            temp: response.data.main.temp,
            weather: response.data.weather[0].main,
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json("Error Fetching Data");
        });
    });

    // POST weather record
    app.post('/saveWeather', async (req, res) => {
      try {
        await userModel.create(req.body);
        console.log("Weather saved successfully");
        res.status(201).send("Saved");
      } catch (err) {
        console.log(err);
        res.status(500).send("Save failed");
      }
    });

    // GET recent weather records (excluding template)
    app.get('/saveWeather', async (req, res) => {
      try {
        const userdata = await userModel.find({ isTemplate: { $ne: true } }).sort({ searchedAt: -1 });
        res.json(userdata);
      } catch (err) {
        console.log(err);
        res.status(500).send("Fetch failed");
      }
    });

    // GET all users (admin/test route)
    app.get("/users", async (req, res) => {
      try {
        const userData = await userModel.find();
        res.json(userData);
      } catch (err) {
        res.status(500).json({ error: "Error fetching user data" });
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}!`);
    });

  })
  .catch(err => {
    console.log("Database connection failed:", err);
  });