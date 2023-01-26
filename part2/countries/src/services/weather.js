import axios from 'axios'

const getWeatherForCity = ( capitalName ) => {
    const response = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capitalName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    return response.then(response => response.data)
}

const getWeatherIconUrl = ( code ) => {
    return `http://openweathermap.org/img/wn/${code}@2x.png`
}

export default { getWeatherForCity, getWeatherIconUrl }