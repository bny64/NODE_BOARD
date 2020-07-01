module.exports = (sequelize, DataTypes) => (
    sequelize.define('board', {
        listNo : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        contents : {
            type :  DataTypes.TEXT('medium'),
            allowNull : false
        },
        id : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        name : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : true
        },
        title : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        userKey : {
            type : DataTypes.STRING(100),
            allowNull : false  
        },
        viewYn : {
            type : DataTypes.STRING(2),            
            defaultValue : 'Y'
        },
        passwordYn : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue:'N'
        },
        imgFilePath : {
            type : DataTypes.STRING,
            allowNull : true
        },
        fileName : {
            type : DataTypes.STRING,
            allowNull : true
        },
        orgFileName : {
            type : DataTypes.STRING,
            allowNull : true
        },
        thumbFileName : {
            type : DataTypes.STRING,
            allowNull : true
        },
        thumbImgFilePath : {
            type : DataTypes.STRING,
            allowNull : true
        },
        createdAt : {
            type : 'TIMESTAMP',
            defaultValue : DataTypes.literal('CURRENT_TIMESTAMP')
        },
        updatedAt : {
            type : 'TIMESTAMP',
            defaultValue : DataTypes.literal('CURRENT_TIMESTAMP')
        }
    },{
        freezeTableName : true,
        tableName : 'board'
    })
);