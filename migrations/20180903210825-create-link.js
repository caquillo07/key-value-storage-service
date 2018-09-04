'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Links', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            uri: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            postId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Posts',
                    key: 'id',
                    as: 'postId'
                }
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Links');
    }
};