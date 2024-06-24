import db from '../database/db_connect.js'
import { encrypt, decrypt } from '../../utils/auth/bcrypt.js'

export const insertUser = ({ email, password, rol, lenguage }) => {
  const encryptedPass = encrypt(password)
  return db('INSERT INTO usuarios (id, email, password, rol, lenguage) VALUES (DEFAULT, $1, $2, $3, $4);', [email, encryptedPass, rol, lenguage])
}
export const fetchUser = async ({ email, password }) => {
  const [user] = await db('SELECT password FROM usuarios WHERE email = $1;', [email])
  const encryptedPass = user.password

  const isPass = decrypt(password, encryptedPass)
  if (!isPass) {
    const error = { status: false, code: 401, message: 'Usuario o contraseña no válidos.' }
    throw error
  }
  return db('SELECT email FROM usuarios WHERE email = $1 AND password = $2;', [email, encryptedPass])
}

export const showUser = ({ email }) => db('SELECT email, rol, lenguage FROM usuarios WHERE email = $1;', [email])
