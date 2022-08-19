import denv from 'dotenv'
import fs from 'fs'
denv.config()


export const ACCESS_SECRET = process.env.ACCESS_SECRET || ''
export const REFRESH_SECRET = process.env.REFRESH_SECRET || ''

export const port = process.env.PORT || 5000

export const frontend_url = process.env.FRONTEND || ''

export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_URL = process.env.DB_URL
export const DB_NAME = process.env.DB_NAME


const ssl_key: string = process.env.SSL_KEY || ''
const ssl_cert: string = process.env.SSL_CERT || ''

export let credentials = {}
try{
    credentials = {
        key : fs.readFileSync(ssl_key, 'utf8'),
        cert: fs.readFileSync(ssl_cert, 'utf8')
    }
}
catch(e){
    throw Error('Invalid cert path')
}

