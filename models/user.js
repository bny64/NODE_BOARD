module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        userKey : {
            type : DataTypes.STRING,
            allowNull : false,
            primaryKey : true
        },
        birth : {
            type :  DataTypes.STRING(50)
        },
        createdAt : {
            type : 'TIMESTAMP',
            defaultValue : DataTypes.literal('CURRENT_TIMESTAMP')
        },
        email : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        emailYn : {
            type : DataTypes.STRING(1),
            defaultValue : 'N'
        },
        id : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        imgPath : {
            type : DataTypes.STRING
        },
        introduce : {
            type : DataTypes.TEXT            
        },
        joinType : {
            type : DataTypes.STRING(20),
            allowNull : false,
            defaultValue : 'JAVA'        
        },
        loginFailCnt : {
            type : DataTypes.INTEGER(11)            
        },
        name : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        phoneNumber : {
            type : DataTypes.STRING(100)            
        },
        updatedAt : {
            type : 'TIMESTAMP',
            defaultValue : DataTypes.literal('CURRENT_TIMESTAMP')
        },
        useYn : {
            type : DataTypes.STRING(1),
            defaultValue : 'Y'
        },
        userType : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'B'
        }
    },{
        freezeTableName : true,
        tableName : 'user'
    })
);