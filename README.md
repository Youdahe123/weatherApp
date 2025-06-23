# 🌤️ Weather App

A simple and visually modern weather web app that allows users to enter **longitude and latitude** and receive real-time weather information, including the **country name** and **temperature**. Built with **Node.js**, **Express**, **JavaScript**, **TailwindCSS**, and powered by the **OpenWeatherMap API**.

---

## 🚀 Features

- 🌎 Input-based weather lookup by coordinates (latitude & longitude)
- 🌡️ Displays temperature and country
- 🎨 Clean, responsive UI using TailwindCSS
- 🔌 Simple backend API using Express and Axios
- ⚡ Quick and lightweight

---

## 🧰 Tech Stack

- **Frontend**: HTML, JavaScript, TailwindCSS  
- **Backend**: Node.js, Express.js,MongoDB 
- **API**: OpenWeatherMap (https://openweathermap.org)  
- **Other Tools**: dotenv for environment variable management

---

## 📁 Project Structure

```
your-project/
├── front_end/
│   ├── index.html       # Frontend interface
│   ├── index.js         # DOM + Fetch Logic
│   ├── style.css        # Tailwind or additional custom styles
│
├── server/
│   ├── app.js           # Express backend
│   └── data/
│       └── api.env      # Contains your API key
│
├── package.json
└── README.md
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Set up your OpenWeatherMap API key

Create a file named `api.env` inside the `server/data/` directory with:

```
KEY=your_openweathermap_api_key_here
```

### 4. Run the server

```bash
node server/app.js
```

The server will run at `http://localhost:3000`.

### 5. Open the app

Open the `front_end/index.html` file directly in your browser.

---

## 🌍 Example Usage

Enter coordinates like:

```
Longitude: 100.9925  
Latitude: 15.8700
```

Output:

```
Country: TH  
Temperature: 87.2°F
```

---

## 🧠 How It Works

- User inputs longitude & latitude into a form  
- `index.js` sends a GET request to the Express server  
- The server queries OpenWeatherMap with those coordinates  
- JSON response includes country and temperature  
- Response is dynamically rendered on the page

---

## 🖼️ Optional Enhancements

- Add images/icons for weather types (sunny, cloudy, rainy)  
- Animate background with Tailwind transitions  
- Add error handling for invalid inputs

---

## 📸 Screenshots

<img width="1199" alt="Screenshot 2025-06-20 at 1 35 19 PM" src="https://github.com/user-attachments/assets/d18c2eb2-2bf7-456f-9b66-12dd52a01c07" />


---

## 📝 License

MIT License © 2025 Youdahe Asfaw
