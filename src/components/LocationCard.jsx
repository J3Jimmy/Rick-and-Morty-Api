import './styles/LocationCard.css'


const LocationCard = ({ location }) => {
  return (
    <div>
      <article className='info__cards'>
        <h2 className="CardsLocation2">{location?.name}</h2>
        <ul>
          <li><span className="CardsLocation">Type:</span><span className="CardsLocation1">{location?.type}</span><span></span></li>
          <li><span className="CardsLocation">Dimension:</span><span className="CardsLocation1">{location?.dimension}</span><span></span></li>
          <li><span className="CardsLocation">Polulation:</span><span className="CardsLocation1">{location?.residents.length}</span><span></span></li>
        </ul>
      </article>
    </div>
  )
}

export default LocationCard
