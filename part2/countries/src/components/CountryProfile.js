
const CountryProfile = ({ country }) => {
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

export default CountryProfile