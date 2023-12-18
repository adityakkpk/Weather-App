const btn = document.getElementById('search-button');
const input = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');
const para = document.querySelector('p');

para.innerText = '';

//callbacks for navigators
async function gotLocation (position) {
  //Displaying weather using Longitude and latitude
  const res = await getDataByLongLat(position.coords.latitude, position.coords.longitude);
  input.value = res.location.name;
  cityName.innerHTML = `City: <span>${res.location.name}, ${res.location.region} - ${res.location.country}</span>`
  cityTime.innerHTML = `Localtime : <span>${res.location.localtime}</span>`
  cityTemp.innerHTML = `Temperature : <span>${res.current.temp_c}<sup>&deg;</sup>C </span>`
}
function failedToGet () {
 console.log('Some Error Occured.');
}
window.addEventListener('load', ()=>{
  //asking user location 
  navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
  renderCityWeather();
});

//Geting location by Latitude and Longitude
async function getDataByLongLat(lat,long) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=7ff49be441184e749d853351231712&q=${lat},${long}&aqi=yes`
    );
    return await response.json();
}
  
//getting location by City name
async function getDataByCity(cityName) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=7ff49be441184e749d853351231712&q=${cityName}&aqi=yes`
  );
  return await response.json();
}

//Displaying weather using City name
async function renderCityWeather() {
  const value = input.value;
  if(!value){
    para.innerText = "Please Enter a City Name";
  }
  setTimeout(() => {
    para.innerText = '';
  }, 1000);
  const result = await getDataByCity(value);
  cityName.innerHTML = `City: <span>${result.location.name}, ${result.location.region} - ${result.location.country}</span>`
  cityTime.innerHTML = `Localtime : <span>${result.location.localtime}</span>`
  cityTemp.innerHTML = `Temperature : <span>${result.current.temp_c}<sup>&deg;</sup>C </span>`
}

btn.addEventListener('click', () => {
  renderCityWeather();
});

function handleInputKeydown(event) {

  if (event.key === 'Enter') {
      renderCityWeather();
  }
}
