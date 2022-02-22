import React from 'react'
import './App.css';
import Topbar from './components/Topbar/Topbar'
import CardNavigation from './components/CardNavigation/CardNavigation'
import FlashCard from './components/FlashCard/FlashCard';

function App() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="container">
        <CardNavigation />
        <FlashCard />
      </div>
      <div className='btn-cont'>
      <button>Back</button>
      <button>Flip</button>
      <button>Next</button>
      </div>
    </React.Fragment>
  );
}

export default App;
