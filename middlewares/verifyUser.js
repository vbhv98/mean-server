const JWT = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies['auth-token']
    if (!token) return res.status(401).send('Access Denied!')
    try {
        const validate = JWT.verify(token, process.env.TOKEN_SECRET)
        req.id = validate.id
        next()
    } catch (err) {
        return res.status(400).send('Invalid Token!')
    }
}

module.exports = verifyToken
