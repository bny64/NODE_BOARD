module.exports = (sequelize, DataTypes) => (
    sequelize.define('menuList', {
        listNo : {
            type : DataTypes.INTEGER(11),
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type :  DataTypes.STRING(50),
            allowNull : false
        },
        type : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        depth : {
            type : DataTypes.INTEGER(11)            
        },
        parentListNo : {
            type : DataTypes.INTEGER(11)            
        },
        url : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        viewYn : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'Y'
        }
    },{
        createdAt : false,
        updatedAt : false,
        freezeTableName : true,
        tableName : 'menuList'
    })
);