const UserModel = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

  // Create Password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)
 

  try {
    await UserModel.create({name, email, city, password:passwordHash})
    res.status(201).json({msg: "Usuário criado com sucesso!"})
  } catch (error) {
    console.error(error)
    res.send(error.message)
  }
}

async function updateUser(req, res) {
  try{
    const id = req.params.id
    await UserModel.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({msg: "Usuário atualizado com sucesso!"})
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

async function login(req, res) {
  const { email, password } = req.body

  // Validations
  if(!email) {
    return res.status(422).json({msg:"O campo e-mail é obrigatório!"})
  }

  if(!password) {
    return res.status(422).json({msg: "O campo 'senha' é obrigatório!"})
  }

  // Check if user exists
  const user = await UserModel.findOne({email: email})
  if(!user) {
    return res.status(404).json({msg: "Usuário não encontrado!"})
  }

  //Check if password match
  const checkPassword = await bcrypt.compare(password, user.password)
  if(!checkPassword) {
    return res.status(422).json({msg: "Senha inválida!"})
  }

  //Autentication and generation token
  try {
    const secret = process.env.SECRET
    const token = jwt.sign({
      id: user._id
    }, secret)

    res.status(200).json({msg: "Autenticação realizada com sucesso!", token})
  } 
  
  catch(error) {
    res.send(error.message)
  }
}

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split('')[1]
  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()

  } catch(error) {
    res.status(400).json({msg:"Token inválido!"})
  }
}

module.exports = {
  readUsers,
  readUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkToken
}
