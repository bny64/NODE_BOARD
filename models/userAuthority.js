module.exports = (sequelize, DataTypes) => (
    sequelize.define('userAuthority', {
        listNo : {
            type : DataTypes.INTEGER(11),
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        authority : {
            type :  DataTypes.STRING(50),
            allowNull : false,
            defaultValue : 'ROLE_BRONZE'
        },
        createdAt : {
            type : 'TIMESTAMP',
            allowNull : false,
            defaultValue : DataTypes.literal('CURRENT_TIMESTAMP')
        },
        enabled : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'Y'
        },
        id : {
            type : DataTypes.STRING(100),
            allowNull : false           
        },
        name : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        userKey : {
            type : DataTypes.STRING(100),
            allowNull : false,            
        }
    },{
        updatedAt : false,
        freezeTableName : true,
        tableName : 'userAuthority'
    })
);