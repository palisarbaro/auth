
import cookieParser from 'cookie-parser'
import express from 'express'
import https from 'https'
import cors from 'cors'

import db from './models/dbInstance'
import router from './router'
import { addResponseOkFuncToResObject } from './middlewares'
import { errorHandler } from './errors'
import { port, frontend_url, credentials } from './config'

const app = express()

app.use(express.json())
app.use(cors({ origin: frontend_url, methods: ['GET', 'POST'], credentials: true, optionsSuccessStatus: 200 }))
app.use(cookieParser())
app.use(addResponseOkFuncToResObject)
app.use('/auth', router)
app.use(errorHandler)


const httpsServer = https.createServer(credentials, app)


async function start() {
    try{
        httpsServer.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    catch(e){
        console.log(e)
    }

}
db.sequelize.sync({ alter: true }).then(start)
