const UserModel = require('../models/Users')

async function readUsers(req, res) {
  try {
    const users = await UserModel.find({})
    res.send(users)
  } catch (error) {
    res.send(error.message)
  }
}

async function readUserById(req, res) {
  try { 
    const id = req.params.id
    const user = await UserModel.findById(id)
    res.send(user)

  } catch (error) {
    res.send(error.message)
  }
}

async function createUser(req, res) {
  try {
    const user = await UserModel.create(req.body)
    res.send(user)
  } catch (error) {
    console.error(error)
    res.send(error.message)
  }
}

async function updateUser(req, res) {
  try{
    const id = req.params.id
    const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})
    res.send(user)
  } catch (error) {
    res.send(error.message)
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id
    const user = await UserModel.findByIdAndDelete(id)
    res.send(user)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  readUsers,
  readUserById,
  createUser,
  updateUser,
  deleteUser
}
