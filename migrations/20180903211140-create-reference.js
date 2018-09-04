'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('References', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            anchor: {
                type: Sequelize.STRING,
                allowNull: false
            },
            position: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            link: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Links',
                    key: 'id'
                }
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
        return queryInterface.dropTable('References');
    }
};