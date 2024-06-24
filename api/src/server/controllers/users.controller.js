import { jwtSign, jwtDecode } from '../../utils/auth/JWT.js'
import { insertUser, fetchUser, showUser } from '../models/users.dao.js'

export const registerUser = (req, res) => {
  insertUser(req.body)
    .then((result) => {
      if (result.code) {
        res.status(500).json({ status: false, code: 500, message: 'Ha ocurrido un error.' })
      }
      return res.status(201).json({ status: true, code: 201, message: 'Usuario creado exitosamente.' })
    })
    .catch((message) => res.status(500).json({ status: false, code: 500, message: 'El usuario ya existe.' }))
}

export const loginUser = (req, res) => {
  fetchUser(req.body)
    .then((result) => {
      if (result.length === 0) {
        res.status(200).json({ status: true, code: 200, message: 'Usuario y/o contraseña no existen.' })
      }
      const token = jwtSign(result)
      res.status(200).json({ status: true, code: 200, token })
    })
    .catch((message) => res.status(500).json({ status: false, code: 500, message: 'Usuario y/o contraseña no válidos.' }))
}

export const getUser = (req, res) => {
  const token = req.header('Authorization').split('Bearer ')[1]
  const { payload } = jwtDecode(token)
  const [email] = payload
  showUser(email)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json({ status: false, code: 500, message: error.message }))
}
