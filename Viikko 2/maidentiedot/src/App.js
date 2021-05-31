import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({countryFilter, handleFilterChange}) => {  
  return(
    <div>find countries<input value={countryFilter} onChange={handleFilterChange}/></div>
  )
}



const Countries = ({countries, countryFilter, setCountryFilter, weather, setWeather}) => {
  console.log(countryFilter)
  const filteredCountries = countries.filter(country => country.name.includes(countryFilter))
  console.log(filteredCountries)

  if (filteredCountries.length > 10) {
    return(<div>Too many countries</div>)
  }

  if (filteredCountries.length === 1) {
    return(<SingleCountry country = {filteredCountries[0]} weather = {weather} setWeather = {setWeather}/>)
  }


  return(
    <ul>
      {filteredCountries.map(country => 
        <CountryRow country = {country} setCountryFilter = {setCountryFilter}/>
      )}
    </ul>
  )
}

const CountryRow = ({country, setCountryFilter}) => {
  return(
    <li key = {country.name}>
      {country.name}
      <button onClick = {() => setCountryFilter(country.name)}>
        show
    </button>
    </li>
  )
}



const SingleCountry = ({country, weather, setWeather}) => {
  const api_key = process.env.REACT_APP_API_KEY

  console.log('http://api.weatherstack.com/current?access_key='.concat(api_key, '&query=', country.capital))

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key='.concat(api_key, '&query=', country.capital))
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [country]) 

  console.log(weather)

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h1>Languages</h1>
      <ul>
      {country.languages.map(language => 
        <li key = {language.name}>
          {language.name}
        </li>
      )}
    </ul>
    <img 
      width = "600px"
      height = "400px"
      src={country.flag}
      alt="new"
      />
      {weather.length != 0 &&
        <div>
          <p>Temperature {weather.current.temperature}</p>
          <p>Humidity {weather.current.humidity}</p>
        </div>
      }
    </div>
  )
}

const App = () =>  {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
    // console.log(countryFilter)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  
  console.log(countries)

  
  return (
    <div>
      <Filter countryFilter = {countryFilter} handleFilterChange = {handleFilterChange}/>
      <Countries countries = {countries} countryFilter = {countryFilter} setCountryFilter = {setCountryFilter} weather = {weather} setWeather = {setWeather}/>
    </div>
  )
}

export default App;
