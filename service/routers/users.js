import { Router } from 'express'
import { User } from '../models/User.js'

const usersRouter = Router()

const getUsers = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser") {
    const users = await User.find({})
    res.send(users)
  } else {
    res.status(404).send('only admin and superuser can access this route')
  }
}

const getUsersById = async (req, res) => {
  if(req.user.role == "Admin" || req.user.role == "SuperUser") {
    const user = await User.findById(req.params.id)
  res.send(user)
  } else {
    res.status(404).send('only admin and superuser can access this route')
  }
}

const updateUser = async (req, res) => {
  if(req.user.role == "Admin" || req.user.userId == req.params.id) {
    const result = await User.findByIdAndUpdate(req.params.id, req.body)
    console.log('result ', result)
    res.sendStatus(503)
  } else {
    res.status(404).send('only admin can access this route')
  }
}

const deleteUser = async (req, res) => {
  if(req.user.role == "Admin" || req.user.userId == req.params.id) {
    const result = await User.findByIdAndUpdate(req.params.id, { active: false })
    console.log('result ', result)
    res.sendStatus(503)
  } else {
    res.status(404).send('only admin  can access this route')
  }
  
}

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUsersById)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter
