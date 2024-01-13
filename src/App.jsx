import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'
import Pagination from '@mui/material/Pagination';


function App() {

  const locationId = getRandomNumber(126)
  const [inputValue, setInputValue] = useState(locationId)
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`
  const [ location, getLocation, hasError ] = useFetch(url)

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    event.preventDefault()
    setPage(value);
  };

  const [totalResidents, setTotalResidents] = useState()

    const [limitResidents, setLimitResidents] = useState(8)
  
    useEffect (() => {
    getLocation()
  }, [inputValue])

    useEffect(() => {
    setTotalResidents(location?.residents.length)
      }, [page, handleChange])

  const inputLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault();
    setInputValue(inputLocation.current.value);
    inputLocation.current.value = '';
  }
 
  let startIndex = (page - 1) * 8;
  let endIndex = startIndex + 8;
  let residents = location?.residents.slice(startIndex, endIndex) || [];
  
  


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
                  residents?.map(url => (
                    <ResidentCard 
                      key={url}
                      url={url}
                    />
                  ))
                }
              </div>
              <Pagination 
              count={parseInt(Math.ceil(totalResidents/8),10)}
              page={page}
              onChange={handleChange}
              
              />
              
            </>
          )
      }
    </div>
    
  );
}

export default App;

