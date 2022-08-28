import { Sequelize } from 'sequelize'
import fs from 'fs'

import User from './User'
import { DB_USER, DB_NAME, DB_PASSWORD, DB_URL } from '../config'



const logStream = fs.createWriteStream('./sql.log', { 'flags': 'a' })
const options = { logging: (msg: string) => logStream.write(msg) }
let sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`, options)
if(process.env.NODE_ENV === 'test'){
    sequelize = new Sequelize('sqlite::memory:', options)
}
const models_fn = [User]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db: any = { sequelize }

for(const model_fn of models_fn){
    const model = model_fn(sequelize)
    db[model.name] = model
}
export default db