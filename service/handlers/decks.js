import { validationResult } from 'express-validator'
import { User } from '../models/User.js'

export const deckById = async (req, res) => {
  // We're assuming we get a user id from the headers until we cover auth
  const userId = req.headers.user
  console.log(`user: ${userId} deckId ${req.params.id}`)
  try {
    const user = await User.findById(userId)
    const deck = user.decks.id(req.params.id)
    if (deck) {
      res.send(deck)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.log(`${deckById.name}: ${err}`)
    res.sendStatus(500)
  }
}

export const getDecks = async (req, res) => {
  // We're assuming we get a user id from the headers until we cover auth
  const userId = req.headers.user
  try {
    const user = await User.findById(userId)
    if (user) {
      res.send(user.decks)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.log(`${getDecks.name}: ${err}`)
    res.sendStatus(500)
  }
}

export const createDeck = async (req, res) => {
  // ... you get it
  const userId = req.headers.user
  const newDeck = req.body
  try {
    const user = await User.findById(userId)
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
}

export const createCard = async (req, res) => {
  const userId = req.headers.user
  const deckId = req.params.id
  const newCard = req.body
  const errors = validationResult(req)

  if(!errors.isEmpty()){
      return res.status(422).json({
          error: errors.array()[0].msg,
          param: errors.array()[0].param
      })
  }
  try {
    const user = await User.findById(userId)
    
    user.decks.forEach(deck => {
      if(deck.deckId == deckId) {
        deck.cards.push(newCard)
      }
    });
  
    await user.save()
    return res.status(201).json({
      msg: "card stored succesfully"
    })
  } catch (err) {
    console.log(`${createCard.name}: ${err}`)
    return res.status(500).json({
      err: "validation error"
    })
  }
}

export const deleteDeck = async (req, res) => {
  const userId = req.headers.user
  const deckId = req.params.id
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
}

export const updateDeck = async (req, res) => {
  const userId = req.headers.user
  const deckId = req.params.id
  const newDeck = req.body
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
}
