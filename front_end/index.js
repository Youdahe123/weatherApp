

function clicked(){
    const lon = document.getElementById('long').value
    const lat = document.getElementById('lang').value
    
    fetch(`http://localhost:3000/?lon=${lon}&lat=${lat}`)
    .then(res => res.json())
    .then(data => {
        const word = document.getElementById('name')
        word.textContent = `Country : ${data.name}`
        const temp = document.getElementById('temp')
        temp.textContent = `Temperature : ${data.temp}`
    })
    .catch(err => console.log(err))
}
