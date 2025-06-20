

function clicked(){
    const lon = document.getElementById('long').value
    const lat = document.getElementById('lang').value
    const image = document.getElementById('flag')
    
    fetch(`http://localhost:3000/?lon=${lon}&lat=${lat}`)
    .then(res => res.json())
    .then(data => {
        const temp = document.getElementById('temp')
        temp.textContent = `Temperature : ${data.temp}`
        image.src = `https://flagsapi.com/${data.name}/flat/64.png`
        image.style.display = 'block'
    })
    .catch(err => console.log(err))
}
