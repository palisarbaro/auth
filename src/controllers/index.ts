import db from '../models/dbInstance'

import SeqUserAccessor from '../accessors/sequelize/SeqUserAccessor'
import SeqTokenAccessor from '../accessors/sequelize/SeqTokenAccessor'

import UserService from '../services/UserService'
import TokenService from '../services/TokenService'

import TokenController from '../controllers/TokenController'
import UserController from './UserController'

const userAccessor = new SeqUserAccessor(db)
const tokenAccessor = new SeqTokenAccessor(db)

const userService  = new UserService(userAccessor)
const tokenService = new TokenService(tokenAccessor)

export const userController = new UserController(userService, tokenService)
export const tokenController = new TokenController(tokenService)