import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/residentCard'


function App() {

  const locationId = getRandomNumber(126)
  const [inputValue, setInputValue] = useState(locationId)
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [ location, getLocation, hasError ] = useFetch(url)
  

  useEffect (() => {
    getLocation()
  }, [inputValue])

  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault();
    setInputValue(inputLocation.current.value);
    inputLocation.current.value = '';
  }
  
  return (
    <div>
      <h1 className='title_rick'>Rick and Morty Api</h1>
      <form className='input__search' onSubmit={handleSubmit}>
        <input ref={inputLocation} type="text" />
        <button className='button__search'>Search</button>
      </form>
      {
        hasError 
          ? <h2>❌ Hey! you must provide an id 1 to 126 🤣</h2>
          : (
            <>
              <LocationCard location={location} />
              <div className='resident__container'>
                {
                  location?.residents.map(url => (
                    <ResidentCard 
                      key={url}
                      url={url}
                    />
                  ))
                }
              </div>
            </>
          )
      }
    </div>
  );
}

export default App;

