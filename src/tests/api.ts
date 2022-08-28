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

    it('Cannot create second user with the same name', async function()  {
        const username = 'aaa'
        const password1 = 'bbb'
        const password2 = 'ccc'

        let res = await request(app).post('/auth/createuser').send({ username, password: password1 })
        expect(res).have.status(200)

        res = await request(app)
            .post('/auth/createuser')
            .send({ username, password: password2 })
        expect(res).have.status(409)
    })
    it('No server error if username and password are not provided(create user)', async function()  {
        const res = await request(app).post('/auth/createuser')
        expect(res).have.status(400)
    })
    it('No server error if username and password are not provided(login)', async function()  {
        const res = await request(app).post('/auth/login')
        expect(res).have.status(400)
    })
    it('No server error if refresh token is not provided(token)', async function()  {
        const res = await request(app).post('/auth/token')
        expect(res).have.status(400)
    })
    it('Create login refresh', async function()  {
        const username = 'aaa'
        const password = 'bbb'
        const res1 = await request(app)
            .post('/auth/createuser')
            .send({ username, password })
        expect(res1).have.status(200)

        const res2 = await request(app)
            .post('/auth/login')
            .send({ username, password })
        expect(res2).have.status(200)
        expect(res2.body).have.property('accessToken')
        expect(res2).have.cookie('refreshToken')

        const cookie = res2.header['set-cookie'][0]
        const res3 = await request(app).post('/auth/token').set('Cookie', cookie)
        expect(res3).have.status(200)
        expect(res3).have.cookie('refreshToken')
        expect(cookie).not.equal(res3.header['set-cookie'][0]) //refreshToken changed

    })
})