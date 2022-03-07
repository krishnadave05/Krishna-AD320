import React from 'react'

import FlashcardProvider from '../Flashcard/FlashcardProvider'
import CreateFlashcard from '../Flashcard/CreateFlashcard'

const Deck = ({deck}) => {
  return <div> <FlashcardProvider deck={deck} /></div>
}

export default Deck