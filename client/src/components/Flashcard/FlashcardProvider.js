import React, { useState } from "react"
import { List, ListItemButton, ListItemText, Paper, Stack } from "@mui/material"

import Flashcard from "./Flashcard"

const FlashcardProvider = ({ deck }) => {
  const [index, setIndex] = useState(0)

  const previous = () => {
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  const next = () => {
    if (index < deck.cards.length - 1) {
      setIndex(index + 1)
    }
  }

  console.log("[Flashcard Provider] length of cards ", deck.cards.length)
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
          {deck.cards.map((card, idx) => {
            return (
              <ListItemButton
                key={idx}
                selected={idx === index}
                onClick={() => {
                  setIndex(idx)
                }}
              >
                <ListItemText primary={`${card.frontText.slice(0, 15)}...`} />
              </ListItemButton>
            )
          })}
        </List>
      </Paper>
      <Flashcard card={deck.cards[index]} previous={previous} next={next} />
    </Stack>
  )
}
export default FlashcardProvider
