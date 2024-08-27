const apiKey = `e16d5e591c5e74de081570b2280827ea`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather (city){
	const response = await fetch(apiUrl + city + `&appid=${apiKey}` + `&units=metric`);

	if(response.status == `404`){
		document.querySelector(".city").innerHTML = "Invalid Request";
		document.querySelector(".temp").style.display = "None";
		document.querySelector(".details").style.display = "None";
		weatherIcon.src = "images/404.png";
		return;
	}

	var data = await response.json();
	console.log(data);

	document.querySelector(".city").innerHTML = data.name;
	document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
	document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
	document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

	if(data.weather[0].main == "Clear"){
		weatherIcon.src = "images/clear.png";
	}
	else if(data.weather[0].main == "Clouds"){
		weatherIcon.src = "images/clouds.png";
	}
	else if(data.weather[0].main == "Drizzle"){
		weatherIcon.src = "images/drizzle.png";
	}
	else if(data.weather[0].main == "Mist"){
		weatherIcon.src = "images/mist.png";
	}
	else if(data.weather[0].main == "Rain"){
		weatherIcon.src = "images/rain.png";
	}
	else if(data.weather[0].main == "Snow"){
		weatherIcon.src = "images/snow.png";
	}
}

searchBtn.addEventListener("click", ()=>{
	checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (e)=>{
	if(e.key == "Enter"){
		checkWeather(searchBox.value);
	}
})

checkWeather('new york');
