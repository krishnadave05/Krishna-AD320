import React from 'react'
import './FlashCard.css'

function FlashCard() {
  return <div className='card'>
    <div className='img'>
      <img src='https://hi-static.z-dn.net/files/d60/c746efb8807770ea7ad2af25ee7ed2ab.jpg' alt='hello' />
    </div>
    <div className='info'>
      <div className='card-title'>
        <h2>Card Title</h2>
      </div>
      <div className='card-desc'>
        <p>My first sight of the place that some refer to as Kalimpong’s best-kept secret came on a spring afternoon as we were speeding through the town fringed by vernacular architecture. Our local guide made a sharp turn, away from this famed hill station, and all at once, the scenery erupted into a thick curl of terraced fields, fog hanging over meticulously designed Buddhist gompas and valleys carpeted in brilliant green.This is Samthar plateau, a highland of virgin 
          forests, monasteries and uninterrupted views of the Darjeeling Himalayan mountains.
        </p>
      </div>
    </div>
  </div>
}

export default FlashCard