import { jwtVerify } from '../../utils/auth/jwt.js'

export const tokenAuth = (req, res, next) => {
  const authorization = req.header('Authorization')
  if (!authorization) {
    res.status(401).json({ status: false, code: 401, message: 'Error: No se proporciona el token.' })
  }
  const [bearer, token] = authorization.split(' ')
  if (bearer === 'bearer') {
    res.status(401).json({ status: false, code: 401, message: 'Error: Formato del token no es correcto.' })
  }

  try {
    jwtVerify(token) && next()
  } catch (error) {
    res.status(401).json({ status: false, code: 401, message: 'Error: Token no válido.' })
  }
}

export const usersLogger = (req, res, next) => {
  console.log(
    {
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers
    }
  )
  next()
}
