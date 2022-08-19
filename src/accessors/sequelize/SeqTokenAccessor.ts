import ITokenAccessor from '../ITokenAccessor'

export default class SeqTokenAccessor implements ITokenAccessor{
    db

    constructor(db){
        this.db = db
    }

    async saveRefreshToken(name: string, refreshToken: string): Promise<void> {
        await this.db.User.update({ refreshToken }, { where: { name } })
    }

    async findNameByRefreshToken(refreshToken: string): Promise<string|null> {
        const user =  await this.db.User.findOne({ where: { refreshToken } })
        if (user === null){
            return null
        }
        return user.name
    }
}