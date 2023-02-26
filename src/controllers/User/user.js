import { User, Address } from '../../models/index.js'
import { comparePassword } from '../../services/passwordEncrypt.js'
import jwt from 'jsonwebtoken'

const getAllUser = async (req, res) => {
  try {
    const data = await User.findAll({ include: [{ all: true }] })
    data.length === 0
      ? res.status(400).send({ message: 'No users found', success: false })
      : res.status(200).send({ message: 'Get all users', success: true, data })
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

const getByIdUser = async (req, res) => {
  try {
    const { id } = req.params
    const data = await User.findByPk(id, { include: [{ all: true }] })

    data === null
      ? res.status(400).send({
          message: 'User with id ' + id + ' not found',
          success: false,
        })
      : res.status(200).send({
          message: 'User with id ' + id + ' found',
          success: true,
          data,
        })
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, RoleId, StateId } =
      req.body
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      RoleId,
      StateId,
    })
    res.send({
      message: `User created`,
      success: true,
    })
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, userName, password, email, roleId, statusId } =
      req.body
    const user = await User.update(
      {
        firstName,
        lastName,
        userName,
        email,
        password,
        roleId,
        statusId,
      },
      {
        where: { id },
      }
    )

    res.send({
      message: `User updated`,
      success: true,
    })
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await User.destroy({
      where: {
        id,
      },
    })
    res.send({ message: `User with ${id} deleted`, success: true })
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

const createUserAddress = async (req, res) => {
  try {
    const { id } = req.params
    const { street, city, state, zipCode } = req.body
    const address = await Address.create({
      street,
      city,
      state,
      zipCode,
      UserId: id,
    })
    res.send({
      message: `Address created`,
      success: true,
      address,
    })
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

const loginUser = async (req, res) => {
  const verifyUserOrEmail = (userName) => {
    return userName.includes('@') ? { email: userName } : { userName: userName }
  }

  try {
    const { userName, password } = req.body
    const login = verifyUserOrEmail(userName)
    const data = await User.findOne({ where: login })
    if (data === null) {
      res.status(400).send({
        message: `User with username ${userName} not found`,
        success: false,
      })
    } else {
      //TODO: Implement JWT, validate salt and hash password, token expiration
    }
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

export {
  getAllUser,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser,
  createUserAddress,
  loginUser,
}