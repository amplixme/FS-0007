import passport from "passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import "dotenv/config"

const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const verifyToken = async (jwt_payload, done) => {
    if (!jwt_payload) return done(null, false, { message: "Invalid Token" })
    return done(null, jwt_payload)
}

passport.use("jwt", new Strategy(strategyConfig, verifyToken))

export default passport