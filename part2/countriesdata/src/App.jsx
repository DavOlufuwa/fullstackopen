import { useState, useEffect, useMemo } from 'react';
import Searchbox from './components/Searchbox';
import SearchResult from './components/SearchResult';

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(()=> {
    const req = fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
    req
    .then(res => res.json())
    .then(data => setCountries(data))
    .catch(err => console.log(err))
  }, [])

  const search = (e) => {
    setFilter(e.target.value)

  }
  
  const exactCountry = useMemo(() => countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())), [countries, filter])
 
  return (
    <div>
      {/* <Searchbox /> */}
      <div>
        Find Countries <input value={filter} onChange={search}/>
      </div>
      <div>
        {
          exactCountry.length >= 10 ? 
          (
            <div>Too many matches, specify another filter</div>
          ):
          <SearchResult exactCountry={exactCountry}/>  
        }
      </div>
    </div>
  )
}

export default App
