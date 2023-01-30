import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryProfile = ({ country }) => {

    const [ weather, setWeather ] = useState(null) 
    const languages = Object.entries(country.languages).map(language => language[1])

    useEffect(() => {
        weatherService
        .getWeatherForCity(country.capital[0])
        .then(weather => {
            setWeather(weather)
        })
    }, [])

    if(!weather){
        return null
    }
    
    return (
      <div>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>

        <h4>Languages:</h4>
        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}
        </ul>

        <h4>Flag</h4>
        <img src={country.flags.png} style={{width: 150}}></img>

        <h4>Weather in {country.capital[0]}</h4>
        <p>Temperature: {weather.main.temp} Celcius</p>
        <img src={weatherService.getWeatherIconUrl(weather.weather[0].icon)}/>
        <p>Wind: {weather.wind.speed} m/s at {weather.wind.deg} degrees</p>
      </div>
    )
}

export default CountryProfile