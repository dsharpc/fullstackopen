import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Content from './components/Content'

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

  return (
    <div>
      <h1>Country's Data</h1>
      <p>Find countries: <input onChange={handleSearchChange}></input></p>
      <Content countries={filteredCountries} setSearchText={setSearchText}></Content>
    </div>
  );
}

export default App;
