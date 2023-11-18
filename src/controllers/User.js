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

  //Validations
  if(!name) {
    return res.status(422).json({msg: "O campo nome é obrigatório!"})
  }

  if(!email) {
    return res.status(422).json({msg: "O campo email é obrigatório!"})
  }

  if(!password) {
    return res.status(422).json({msg: "O campo senha é obrigatório"})
  }

  if(!city) {
    return res.status(422).json({msg: "O campo cidade é obrigatório!"})
  }

  // Check if user exists
  const userExists = await UserModel.findOne({email: email})
  if(userExists) {
    return res.status(422).json({msg:"Endereço de e-mail já cadastrado!"})
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
    await UserModel.findByIdAndDelete(id)
    res.json({msg: "Usuário excluído com sucesso!"})
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
