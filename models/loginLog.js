module.exports = (sequelize, DataTypes) => (
    sequelize.define('loginLog', {
        listNo : {
            type : DataTypes.INTEGER(11),
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        id : {
            type :  DataTypes.STRING(100),
            allowNull : false
        },
        joinType : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        loginAt : {
            type : 'TIMESTAMP',
            defaultValue : DataTypes.literal('CURRENT_TIMESTAMP')
        },
        name : {
            type : DataTypes.STRING(100),
            allowNull : false           
        }
    },{
        createdAt : false,
        updatedAt : false,
        freezeTableName : true,
        tableName : 'loginLog'
    })
);