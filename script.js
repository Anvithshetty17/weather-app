const API_KEY = "d1547dbf6bb42d1db160198c3ad645b9"; 

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

      
        const weatherIcon = data.weather[0].icon;
        const weatherCondition = data.weather[0].main.toLowerCase();
        
        changeBackground(weatherIcon, weatherCondition);

      
        const weatherHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <h3>${data.main.temp}°C</h3>
            <p>${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        `;

        document.getElementById("weather-info").innerHTML = weatherHTML;
    } catch (error) {
        console.log(error);
        document.getElementById("weather-info").innerHTML = "<p>City not found. Try again.</p>";
        document.body.style.background = "linear-gradient(to right, #536976, #292e49)"; 
    }
}


function changeBackground(iconCode, condition) {
    const animationDiv = document.getElementById("weather-animation");
    animationDiv.innerHTML = "";
    document.body.style.backgroundSize = "cover";

    let bgColor;
    switch (condition) {
        case "clear":
            bgColor = "linear-gradient(to right, #ffcc33, #ff9966)";
            break;
        case "clouds":
            bgColor = "linear-gradient(to right, #d7d2cc, #304352)";
            break;
        case "rain":
        case "drizzle":
        case "thunderstorm":
            bgColor = "linear-gradient(to right, #667db6, #0082c8, #0082c8)"; 
            break;
        case "snow":
            bgColor = "linear-gradient(to right, #e0eafc, #cfdef3)"; 
            break;
        default:
            bgColor = "linear-gradient(to right, #536976, #292e49)";
    }

    document.body.style.background = bgColor;

    
    for (let i = 0; i < 5; i++) {
        let iconElement = document.createElement("img");

       
        iconElement.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        iconElement.className = "weather-icon-animation";

        iconElement.style.left = `${Math.random() * 100}%`;
        iconElement.style.animationDuration = `${2 + Math.random() * 3}s`;

        animationDiv.appendChild(iconElement);
    }
}
