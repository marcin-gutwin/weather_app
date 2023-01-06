const input = document.querySelector('input');
const cityName = document.querySelector('.city-name');
const addBtn = document.querySelector('.add-btn');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=caf2ff69eb34ba5a4457ecb5c8a03a29';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'Kraków';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios.get(URL).then((res) => {
		const hum = res.data.main.humidity;
		const temp = res.data.main.temp;
		const status = Object.assign({}, ...res.data.weather);

		weather.textContent = status.main;
		cityName.textContent = res.data.name;
		temperature.textContent = Math.floor(temp) + ' st C';
		humidity.textContent = hum + ' %';
		input.value = '';
		console.log(status.main);

		if (status.id < 232) {
			photo.setAttribute('src', './img/thunderstorm.png');
		} else if (status.id >= 300 && status.id <= 321) {
			photo.setAttribute('src', './img/drizzle.png');
		} else if (status.id >= 500 && status.id <= 531) {
			photo.setAttribute('src', './img/rain.png');
		}else if (status.id === 600 && status.id <= 622) {
			photo.setAttribute('src', './img/snow.png');
		}else if (status.id === 701 ) {
			photo.setAttribute('src', './img/mist.png');
		}else if (status.id === 741 ) {
			photo.setAttribute('src', './img/fog.png');
		}else if (status.id === 800 ) {
			photo.setAttribute('src', './img/sun.png');
		}else if (status.id >= 800 ) {
			photo.setAttribute('src', './img/cloud.png');
		}
	});
};

const btnEnter = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener('keyup', btnEnter);
addBtn.addEventListener('click', getWeather);
getWeather();
