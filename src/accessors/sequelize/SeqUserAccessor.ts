import IUserAccessor from '../IUserAccessor'

export default class SeqUsernAccessor implements IUserAccessor{
    db

    constructor(db){
        this.db = db
    }

    async createUser(name: string, hashedpassword: string): Promise<boolean> {
        const user =  await this.db.User.findOne({ where: { name } })
        if (user !== null){
            return false
        }
        await this.db.User.create({ name, hashedpassword })
        return true
    }

    async getPassworHashdByUserName(name: string): Promise<string|null> {
        const user =  await this.db.User.findOne({ where: { name } })
        if (user === null){
            return null
        }
        return user.hashedpassword
    }
}