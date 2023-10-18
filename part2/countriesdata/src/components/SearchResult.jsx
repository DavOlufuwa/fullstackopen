

const SearchResult = ({exactCountry}) => {



  return (
    <div>
        {
          exactCountry.length === 1 ? 
          (
            exactCountry.map(country => 
            <div key={country.name.common}>
            {country.capital.map((c,)=> <p key={c}>Capital {c}</p>)}
              <p>area {country.area}</p>
              <p>Languages</p>
              <ul>
                {
                  Object.values(country.languages).map((l) => <li key={l}>{l}</li>)
                }
              </ul>
              <div>
                {
                  <img src={country.flags.png} alt={country.flags.alt}/>
                }
              </div>
              <h2>Weather in {country.capital}</h2>
              <div>
                temperature : {celsius = (fahrenheit - 32) * 5/9} Celsius
              </div>
              <div>

              </div>
              <div>
                Wind {}
              </div>  
            </div>
            )
          ):
          exactCountry.map(country => <p key={country.name.common}>{country.name.common}<button>show</button></p>)
        }
    </div>
  )
}

export default SearchResult