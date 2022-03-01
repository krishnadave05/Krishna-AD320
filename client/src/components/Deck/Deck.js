import React from 'react'

import FlashcardProvider from '../Flashcard/FlashcardProvider'
import CreateFlashcard from '../Flashcard/CreateFlashcard'

const Deck = ({deck, createMode}) => {
  return <div>{ createMode ? <CreateFlashcard deckId={"621b05269ad2729f51111c21"} /> : <FlashcardProvider deck={deck} />}</div>
}

export default Deck