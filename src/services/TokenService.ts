import jwt from 'jsonwebtoken'

import ITokenAccessor from '../accessors/ITokenAccessor'
import { Unauthorized } from '../errors'
import { ACCESS_SECRET, REFRESH_SECRET } from '../config'
import { UserJWTPayload } from './JWTPayload'

export default class TokenService {
    tokenAccessor: ITokenAccessor

    constructor(tokenAccessor: ITokenAccessor){
        this.tokenAccessor = tokenAccessor
    }

    async generateTokens(payload: UserJWTPayload){
        const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15s' })
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '1m' })
        this.tokenAccessor.saveRefreshToken(payload.username, refreshToken)
        return {
            accessToken,
            refreshToken
        }
    }

    async refresh(refreshToken: string){
        const db_username = await this.tokenAccessor.findNameByRefreshToken(refreshToken)
        if (db_username === null){
            throw new Unauthorized('Invalid token')
        }
        try{
            const token = jwt.verify(refreshToken, REFRESH_SECRET) as UserJWTPayload
            if(token.username != db_username){
                throw new Unauthorized()
            }
            return this.generateTokens({ username: db_username })
        }
        catch(e){
            throw new Unauthorized()
        }
    }
}
