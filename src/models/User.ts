import { Sequelize, DataTypes } from 'sequelize'

export default function(sequelize: Sequelize){
    return sequelize.define('User', {
        name: {
            type     : DataTypes.STRING,
            allowNull: false,
            unique   : true
        },
        hashedpassword: DataTypes.STRING,
        refreshToken  : DataTypes.STRING
    })
}