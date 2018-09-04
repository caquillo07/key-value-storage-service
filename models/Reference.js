'use strict';
module.exports = (sequelize, DataTypes) => {
    const definition = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        anchor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        link: {
            type: DataTypes.BIGINT,
            allowNull: false,
        }
    };
    const configuration = { timestamps: false };

    const Reference = sequelize.define('Reference', definition, configuration);

    Reference.associate = function (models) {
        // associations can be defined here
        Reference.belongsTo(models.Link, {
            foreignKey: 'link'
        });

        Reference.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post'
        });
    };
    return Reference;
};