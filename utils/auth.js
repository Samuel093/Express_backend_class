import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next)=>{
    const header = req.headers['authorization']

    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({ message: "Unauthorized, No token provided" })
    }

    const token = header.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_KEY)
        req.user = decodedToken
        next()
    } catch (error) {
        console.log(error.mesage, 'Invalid token')
        return res.status(401).json({ message: 'Unauthorized: Invalid Token' })
    }
}