import bcrypt from 'bcrypt'

import IUserAccessor from '../accessors/IUserAccessor'
import { Unauthorized } from '../errors'

class UserService {
    userAccessor: IUserAccessor

    constructor(userAccessor: IUserAccessor){
        this.userAccessor = userAccessor
    }

    async createUser(username: string, password: string){
        const hashedpass = await bcrypt.hash(password, 10)
        return await this.userAccessor.createUser(username, hashedpass)

    }

    async validatePassword(username: string, password:string){
        const passhash = await this.userAccessor.getPassworHashdByUserName(username)
        if (passhash === null) {
            throw new Unauthorized('Such user doesn\'t exist')
        }
        await bcrypt.compare(password, passhash).then((validated)=>{
            if(!validated) {
                throw new Unauthorized('Invalid password')
            }
        })
    }
}
export default UserService