import { UserAlreadyExists } from '../errors'
import TokenService from '../services/TokenService'
import UserService from '../services/UserService'

export default class UserController{
    userService: UserService
    tokenService: TokenService

    constructor(userService: UserService, tokenService: TokenService){
        this.userService = userService
        this.tokenService = tokenService
    }

    async createUser(req, res, next) {
        try{
            const created = await this.userService.createUser(req.body.username, req.body.password)
            if (created){
                res.responseOk()
            }
            else{
                throw new UserAlreadyExists()
            }
        }
        catch(err){
            next(err)
        }
    }

    async login(req, res, next) {
        try{
            const username = req.body.username
            await this.userService.validatePassword(username, req.body.password)
            const tokens = await this.tokenService.generateTokens({ username })
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 1000 * 60 * 60, httpOnly: true, secure: true })
            res.responseOk({ accessToken: tokens.accessToken })
        }
        catch(err){
            next(err)
        }
    }
}
