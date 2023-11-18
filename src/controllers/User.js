const UserModel = require('../models/Users')

async function readUsers(req, res) {
  try {
    const users = await UserModel.find({}, '-password')
    res.send(users)
  } catch (error) {
    res.send(error.message)
  }
}

async function readUserById(req, res) {
  try { 
    const id = req.params.id
    const user = await UserModel.findById(id, '-password')
    res.send(user)

  } catch (error) {
    res.send(error.message)
  }
}

async function createUser(req, res) {
  const {name, email, password, city} = req.body

  if(!name) {
    return res.json({msg: "O campo nome é obrigatório!"})
  }

  if(!email) {
    return res.json({msg: "O campo email é obrigatório!"})
  }

  if(!password) {
    return res.json({msg: "O campo senha é obrigatório"})
  }

  if(!city) {
    return res.json({msg: "O campo cidade é obrigatório!"})
  }

  

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
