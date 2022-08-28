import IUserAccessor from '../IUserAccessor'
import db from '../../models/dbInstance'
export default class SeqUsernAccessor implements IUserAccessor{

    async createUser(name: string, hashedpassword: string): Promise<boolean> {
        const user =  await db.User.findOne({ where: { name } })
        if (user !== null){
            return false
        }
        await db.User.create({ name, hashedpassword })
        return true
    }

    async getPassworHashdByUserName(name: string): Promise<string|null> {
        const user =  await db.User.findOne({ where: { name } })
        if (user === null){
            return null
        }
        return user.hashedpassword
    }
}