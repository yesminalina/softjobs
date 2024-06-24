import bcrypt from 'bcryptjs'

export const encrypt = (password) => bcrypt.hashSync(password)

export const decrypt = (password, encryptedPass) => bcrypt.compareSync(password, encryptedPass)
