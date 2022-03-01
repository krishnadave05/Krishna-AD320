import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'

function Flashcard({ card, previous, next }) {
  const [isFront, setIsFront] = useState(true)
  const [content, setContent] = useState({
    image: card.frontImage,
    text: card.frontText
  })

  useEffect(() => {
    if (isFront) {
      setContent({
        image: card.frontImage,
        text: card.frontText
      })
    } else {
      setContent({
        image: card.backImage,
        text: card.backText
      })
    }
  }, [isFront, card])

  const flip = () => {
    setIsFront(!isFront)
  }

  return (
    <Box sx={{ width: '100%', mt: 8, display: 'flex', justifyContent: 'space-around'}}>
      <Card sx={{ width: '40vw' }} elevation={3}>
        { content.image && <CardMedia
          component="img"
          height="200"
          image={content.image} />}
        <CardContent>
          <Typography>{content.text}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
            sx={{ mx: 2 }}
            onClick={ () => previous() }
            variant="outlined"
          >
            Prev
          </Button>
          <Button sx={{ mx: 2 }} variant="outlined" onClick={() => flip()}>
            Flip
          </Button>
          <Button
            sx={{ mx: 2 }}
            onClick={ () => next() }
            variant="outlined"
          >
            Next
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

// TODO - disable previous and next based on index

export default Flashcard