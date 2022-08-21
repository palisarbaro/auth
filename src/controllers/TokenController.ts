import { BadRequest } from '../errors'
import TokenService from '../services/TokenService'

export default class TokenController {
    tokenService: TokenService

    constructor(tokenService: TokenService){
        this.tokenService =  tokenService
    }

    async token(req, res, next) {
        try{
            const refreshToken = req.cookies['refreshToken']
            if(!refreshToken){
                throw new BadRequest('refresh token is not provided')
            }
            const tokens = await this.tokenService.refresh(refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 1000 * 60 * 60, httpOnly: true, secure: true })
            res.responseOk({ accessToken: tokens.accessToken })
        }
        catch(err){
            next(err)
        }
    }
}
