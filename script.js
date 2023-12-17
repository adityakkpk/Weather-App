const btn = document.getElementById('search-button');
const input = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');
const para = document.querySelector('p');

para.innerText = '';

window.addEventListener('load', ()=>{
  renderWeather();
});

async function getData(cityName) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=7ff49be441184e749d853351231712&q=${cityName}&aqi=yes`
  );
  return await response.json();
}

async function renderWeather() {
  const value = input.value;
  if(!value){
    para.innerText = "Please Enter a City Name";
  }
  setTimeout(() => {
    para.innerText = '';
  }, 1000);
  const result = await getData(value);
  cityName.innerHTML = `City: <span>${result.location.name}, ${result.location.region} - ${result.location.country}</span>`
  cityTime.innerHTML = `Localtime : <span>${result.location.localtime}</span>`
  cityTemp.innerHTML = `Temperature : <span>${result.current.temp_c}<sup>&deg;</sup>C </span>`
}

btn.addEventListener('click', () => {
  renderWeather();
});

function handleInputKeydown(event) {

  if (event.key === 'Enter') {
      renderWeather();
  }
}
