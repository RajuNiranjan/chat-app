import jwt from 'jsonwebtoken'
import { ENV_VAR } from './env.js'

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VAR.JWT_SECRET_KEY, {
        expiresIn: ENV_VAR.JWT_EXPIRES_IN
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV_VAR.NODE_ENV === "production"
    });
    return token
} 