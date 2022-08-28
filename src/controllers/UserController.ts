import { Request, Response, NextFunction } from 'express'

import { BadRequest, UserAlreadyExists } from '../errors'
import TokenService from '../services/TokenService'
import UserService from '../services/UserService'
import { responseOk } from '../utils'

export default class UserController{
    userService: UserService
    tokenService: TokenService

    constructor(userService: UserService, tokenService: TokenService){
        this.userService = userService
        this.tokenService = tokenService
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try{
            const username = req.body.username
            const password =  req.body.password
            if(!(username && password)){
                throw new BadRequest('Username or password not provided')
            }
            const created = await this.userService.createUser(username, password)
            if (created){
                responseOk(res, undefined)
            }
            else{
                throw new UserAlreadyExists()
            }
        }
        catch(err){
            next(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try{
            const username = req.body.username
            const password =  req.body.password
            if(!(username && password)){
                throw new BadRequest('Username or password not provided')
            }
            await this.userService.validatePassword(username, password)
            const tokens = await this.tokenService.generateTokens({ username })
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 1000 * 60 * 60, httpOnly: true, secure: true })
            responseOk(res, { accessToken: tokens.accessToken })
        }
        catch(err){
            next(err)
        }
    }
}
