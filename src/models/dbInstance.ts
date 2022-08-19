import { Sequelize, DataTypes } from 'sequelize'
import User from './User'
import { DB_USER, DB_NAME, DB_PASSWORD, DB_URL } from '../config'



const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`)

const models_fn = [User]
const db = { sequelize }
for(const model_fn of models_fn){
    const model = model_fn(sequelize, DataTypes)
    db[model.name] = model
}

export default db