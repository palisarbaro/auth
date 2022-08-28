import ITokenAccessor from '../ITokenAccessor'
import db from '../../models/dbInstance'

export default class SeqTokenAccessor implements ITokenAccessor{

    async saveRefreshToken(name: string, refreshToken: string): Promise<void> {
        await db.User.update({ refreshToken }, { where: { name } })
    }

    async findNameByRefreshToken(refreshToken: string): Promise<string|null> {
        const user =  await db.User.findOne({ where: { refreshToken } })
        if (user === null){
            return null
        }
        return user.name
    }
}