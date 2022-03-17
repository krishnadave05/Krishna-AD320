import { request, Router } from 'express'
import { body } from 'express-validator'
import { User } from '../models/User.js'

const decksRouter = Router()

const getDecks = async (req, res) => {
  const { userId, other } = req.user
  console.log(`Other data from the token ${other}`)
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin' || requestor.role === 'superuser') {
    try {
      console.log(requestor)
      if (requestor) {
        res.send(requestor.decks)
      } else {
        res.sendStatus(404)
      }
    } catch (err) {
      console.log(`${getDecks.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(403).send('forbidden')
  }
}

const createDeck = async (req, res) => {
  const userId = req.user.userId
  const newDeck = req.body
  const requestor = await User.findById(userId)
  if (
    requestor.role === 'admin' ||
    requestor.role === 'superuser' ||
    requestor.role === 'user'
  ) {
    try {
      requestor.decks.push({
        name: newDeck.name,
        cards: [],
      })
      await requestor.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${createDeck.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(403).send('forbidden')
  }
}

const createCard = async (req, res) => {
  const userId = req.user.userId
  const deckId = req.params.id
  const newCard = req.body
  const requestor = await User.findById(userId)
  if (
    requestor.role === 'admin' ||
    requestor.role === 'superuser' ||
    requestor.role === 'user'
  ) {
    try {
      const deck = requestor.decks.id(deckId)
      deck.cards.push(newCard)
      await requestor.save()
      const newId = deck.cards[deck.cards.length - 1]
      res.status(200).send(newId._id)
    } catch (err) {
      console.log(`${createCard.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(403).send('forbidden')
  }
}

const deleteDeck = async (req, res) => {
  const userId = req.user.userId
  const deckId = req.params.id
  const requestor = await User.findById(userId)
  if (
    requestor.role === 'admin' ||
    requestor.role === 'superuser' ||
    requestor.role === 'user'
  ) {
    try {
      const user = await User.findById(userId)
      const removedDeck = user.decks.id(deckId).remove()
      console.log(removedDeck)
      user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${deleteDeck.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(403).send('forbidden')
  }
}

const updateDeck = async (req, res) => {
  const userId = req.user.userId
  const deckId = req.params.id
  const newDeck = req.body
  const requestor = await User.findById(userId)
  if (
    requestor.role === 'admin' ||
    requestor.role === 'superuser' ||
    requestor.role === 'user'
  ) {
    try {
      const user = await User.findById(userId)
      const deck = user.decks.id(deckId)
      deck.name = newDeck.name
      await user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${updateDeck.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(403).send('only admin can update a card')
  }
}

const updateCard = async (req, res) => {
  const userId = req.user.userId
  const deckId = req.params.id
  const cardId = req.params.cardId
  const newCard = req.body
  const requestor = await User.findById(userId)
  if (
    requestor.role === 'admin' ||
    requestor.role === 'superuser' ||
    requestor.role === 'user'
  ) {
    try {
      const user = await User.findById(userId)
      const deck = user.decks.id(deckId)
      const card = deck.cards.id(cardId)
      card.front = newCard.front
      card.back = newCard.back
      await user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${updateCard.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(403).send('forbidden')
  }
}

const deleteCard = async (req, res) => {
  const userId = req.user.userId
  const deckId = req.params.id
  const cardId = req.params.cardId
  const requestor = await User.findById(userId)
  if (
    requestor.role === 'admin' ||
    requestor.role === 'superuser' ||
    requestor.role === 'user'
  ) {
    try {
      const user = await User.findById(userId)
      const deck = user.decks.id(deckId)
      const card = deck.cards.id(cardId)
      card.remove()
      await user.save()
      res.sendStatus(204)
    } catch (err) {
      console.log(`${deleteCard.name}: ${err}`)
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(403).send('forbidden')
  }
}

decksRouter.get('/', getDecks)
decksRouter.post('/', body('name').not().isEmpty(), createDeck)
decksRouter.put('/:id', body('name').not().isEmpty(), updateDeck)
decksRouter.delete('/:id', deleteDeck)

decksRouter.post(
  '/:id/cards',
  body('frontImage').isURL(),
  body('frontText').not().isEmpty(),
  body('backImage').isURL(),
  body('backText').not().isEmpty(),
  createCard
)
decksRouter.put(
  '/:id/cards/:cardId',
  body('frontImage').isURL(),
  body('frontText').not().isEmpty(),
  body('backImage').isURL(),
  body('backText').not().isEmpty(),
  updateCard
)
decksRouter.delete('/:id/cards/:cardId', deleteCard)

export default decksRouter