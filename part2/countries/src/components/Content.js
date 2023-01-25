import CountryProfile from "./CountryProfile"

const Content = ({ countries, setSearchText}) => {
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
      return (
      <CountryProfile country={country}/>
      )
    }
  }

  export default Content