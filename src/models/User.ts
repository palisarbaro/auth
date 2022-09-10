import { Sequelize, DataTypes } from 'sequelize'

export default function(sequelize: Sequelize){
    return sequelize.define('User', {
        name: {
            type     : DataTypes.STRING,
            allowNull: false,
            unique   : true
        },
        hashedpassword: {
            type     : DataTypes.STRING,
            allowNull: false
        },
        refreshToken: DataTypes.STRING
    })
}