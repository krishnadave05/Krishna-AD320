import { Router } from 'express'
import { body } from 'express-validator'
import { User } from '../models/User.js'

const decksRouter = Router()

const getDecks = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser" || req.user.userId == req.params.id) {
    const { userId, role } = req.user
    console.log(`Other data from the token ${role}`)
    try {
      const user = await User.findById(req.params.id)
      if (user) {
        res.send(user.decks)
      } else {
        res.sendStatus(404)
      }
    } catch (err) {
      console.log(`${getDecks.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.status(404).send('you are not authorized to access this route')
  }
  
}

const createDeck = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser" || req.user.userId == req.params.id) {
    const { userId, role } = req.user
    const newDeck = req.body
    try {
      const user = await User.findById(req.params.id)
      user.decks.push({
        name: newDeck.name,
        cards: []
      })
      await user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${createDeck.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.status(404).send('you are not authorized to access this route')
  }
}

const createCard = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser" || req.user.userId == req.params.id) {
    const { userId, role } = req.user
    const deckId = req.params.deckId
    const newCard = req.body
    try {
      const user = await User.findById(req.params.id)
      const deck = user.decks.id(deckId)
      deck.cards.push(newCard)
      await user.save()
      const newId = deck.cards[deck.cards.length - 1]
      res.status(200).send(newId._id)
    } catch (err) {
      console.log(`${createCard.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.status(404).send('you are not authorized to access this route')
  }
  
}

const deleteDeck = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser" || req.user.userId == req.params.id) {
    const { userId, role } = req.user
    const deckId = req.params.deckId
    try {
      const user = await User.findById(req.params.id)
      const removedDeck = user.decks.id(deckId).remove()
      console.log(removedDeck)
      user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${deleteDeck.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.status(404).send('you are not authorized to access this route')
  }
}

const updateDeck = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser" || req.user.userId == req.params.id) {
    const { userId, role } = req.user
    const deckId = req.params.deckId
    const newDeck = req.body
    try {
      const user = await User.findById(req.params.id)
      const deck = user.decks.id(deckId)
      deck.name = newDeck.name
      await user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${updateDeck.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.status(404).send('you are not authorized to access this route')
  }
}

const updateCard = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser" || req.user.userId == req.params.id) {
    const { userId, role } = req.user
    const deckId = req.params.deckId
    const cardId = req.params.cardId
    const newCard = req.body
    try {
      const user = await User.findById(req.params.id)
      const deck = user.decks.id(deckId)
      const card = deck.cards.id(cardId)
      card.frontImage = newCard.frontImage
      card.frontText = newCard.frontText
      card.backImage = newCard.backImage
      card.backText = newCard.backText
      await user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${createCard.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.status(404).send('you are not authorized to access this route')
  }
}

const deleteCard = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser" || req.user.userId == req.params.id) {
    const { userId, role } = req.user
    const deckId = req.params.deckId
    const cardId = req.params.cardId
    try {
      const user = await User.findById(req.params.id)
      const deck = user.decks.id(deckId)
      const removedCard = deck.cards.id(cardId).remove()
      console.log(removedCard)
      user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${deleteCard.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.status(404).send('you are not authorized to access this route')
  }
}

decksRouter.get('/:id', getDecks)
decksRouter.post('/:id', body('name').not().isEmpty(), createDeck)
decksRouter.put(
  '/:id/:deckId',
  body('name').not().isEmpty(),
  updateDeck
)
decksRouter.delete('/:id/:deckId', deleteDeck)

decksRouter.post(
  '/:id/:deckId/cards',
  body('frontImage').isURL(),
  body('frontText').not().isEmpty(),
  body('backImage').isURL(),
  body('backText').not().isEmpty(),
  createCard
)
decksRouter.put(
  '/:id/:deckId/:cardId/cards',
  body('frontImage').isURL(),
  body('frontText').not().isEmpty(),
  body('backImage').isURL(),
  body('backText').not().isEmpty(),
  updateCard
)

decksRouter.delete('/:id/:deckId/:cardId', deleteCard)

export default decksRouter
