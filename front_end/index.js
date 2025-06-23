const image = document.getElementById('flag')
    const sun = document.getElementById('icon-sun')
    const cloud = document.getElementById('icon-cloud')
    const rain = document.getElementById('icon-rain')
    const snow = document.getElementById('icon-snow')
    const sun2 = document.getElementById('icon-sun2')
    const cloud2 = document.getElementById('icon-cloud2')
    const rain2 = document.getElementById('icon-rain2')
    const snow2 = document.getElementById('icon-snow2')

function clicked(){
    const lon = document.getElementById('long').value
    const lat = document.getElementById('lang').value
    fetch(`http://localhost:3000/?lon=${lon}&lat=${lat}`)
    .then(res => res.json())
    .then(data => {
        const temp = document.getElementById('temp')
        temp.textContent = `Temperature : ${data.temp}`
        image.src = `https://flagsapi.com/${data.name}/flat/64.png`
        image.style.display = 'block'
        console.log(data.weather)
        sun2.style.display = 'none'
        cloud2.style.display = 'none'
        rain2.style.display = 'none'
        snow2.style.display = 'none'
        if(data.weather == 'Rain' || data.weather == 'Drizzle' ){
            rain2.style.display = 'block'
        }
        if(data.weather == 'Snow'){
            snow2.style.display = 'block'
        }
        if(data.weather == 'Clear'){
            sun2.style.display = 'block'
        }
        if(data.weather == 'Clouds'){
            cloud2.style.display ='block'}
        
        fetch('http://localhost:3000/saveWeather', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    country: data.name,
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    temperature: data.temp,
    weatherCondition: data.weather,
    searchedAt: new Date()
  })
})
.then(res => res.json())
.then(saveRes => console.log(`Saved to DB : ${saveRes}`))
.catch(err => console.log(`Error: ${err}`))
        
    })
    .catch(err => console.log(err))
}

function changed(){
    const before = document.getElementsByClassName('beforeClick');
    for(let i = 0; i < before.length; i++) {
        before[i].style.display = 'none';
    }
    // Show main app container by ID
    document.getElementById('mainApp').style.display = 'block';

    // Hide only the weather icons
    sun.style.display = 'none';
    cloud.style.display = 'none';
    rain.style.display = 'none';
    snow.style.display = 'none';
    image.style.display = 'none';
}
function checkRecent(){
    fetch('http://localhost:3000/saveWeather')
    .then(res => res.json())
    .then(data => console.log(data))
        
}
