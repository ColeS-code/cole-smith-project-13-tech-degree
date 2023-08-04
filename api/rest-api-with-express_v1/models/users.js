
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Users extends Sequelize.Model {}
    Users.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        emailAddress: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING
        }
    }, { sequelize }); 
    
    Users.associate = (models) => {
        Users.hasMany(models.Courses, {
            as: 'teacher',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };
    return Users;
}