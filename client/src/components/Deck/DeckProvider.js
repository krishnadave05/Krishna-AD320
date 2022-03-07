import React, { useState } from "react"

import { Paper, List, ListItemButton, ListItemText, Stack } from '@mui/material'

import Deck from './Deck'
import CreateFlashcard from '../Flashcard/CreateFlashcard'

const DeckProvider = ({userId ,decks, createMode }) => {
  const [index, setIndex] = useState(0)

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start"
        spacing={2}
        sx={{ mt: 3 }}
    >
      <Paper elevation={3}>
      <List sx={{ width: "15vw" }}>
        {decks.map((deck, idx) => {
          return (
            <ListItemButton
              key={idx}
              selected={idx === index}
              onClick={() => {
                setIndex(idx)
              }}
            >
              <ListItemText primary={`${deck.name}`} />
            </ListItemButton>
          )
        })}
      </List>
    </Paper>
    <div>{createMode ? <CreateFlashcard userId={userId} deckId={decks[index].deckId}/> : <Deck deck={decks[index]} />}</div>
    </Stack>
  )
}

export default DeckProvider
