import { useState, useEffect } from 'react'
import countriesService from './services/countries'

function App() {

  const [countries, setCountries] = useState(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(countryData => setCountries(countryData))
  }, [])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  if (!countries) {
    return null
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase()))

  const Content = ({ countries }) => {
    console.log(countries)
    if(countries.length > 10){
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (countries.length > 1) {
      return (
        <ul>
        {countries.map(country => <li key={country.cca2}>{country.name.common} <button onClick={() => setSearchText(country.name.common)}>Show</button></li>)}
        </ul>
      )
    } else if (countries.length === 1){
      const country = countries[0]
      const languages = Object.entries(country.languages).map(language => language[1])
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
        </div>
      )
    }
  }

  return (
    <div>
      <h1>Country's Data</h1>
      <p>Find countries: <input onChange={handleSearchChange}></input></p>
      <Content countries={filteredCountries}></Content>
    </div>
  );
}

export default App;
