process.env.NODE_ENV = 'test'


import { expect, use, request } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../index'
import db  from '../models/dbInstance'

use(chaiHttp)
describe('API tests', () => {
    beforeEach(async function () {
        await db.sequelize.sync({ force: true })
    })

    it('Can create user', async function()  {
        const username = 'aaa'
        const password = 'bbb'
        const res = await request(app)
            .post('/auth/createuser')
            .send({ username, password })
        expect(res).have.status(200)
        expect(res.body.status).to.equal('ok')
        const user = await db.User.findOne({ where: { name: username } })
        expect(user, 'user not in database').not.be.equal(null)
    })
})