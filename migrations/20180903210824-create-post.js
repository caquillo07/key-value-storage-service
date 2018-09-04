'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            html: {
                type: Sequelize.STRING,
                allowNull: true
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Posts');
    }
};