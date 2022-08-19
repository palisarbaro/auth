export default function(sequelize, DataTypes){
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