'use strict';
module.exports = (sequelize, DataTypes) => {
    const definition = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };

    const configuration = { timestamps: false };

    const Link = sequelize.define('Link', definition, configuration);

    Link.associate = function (models) {
        Link.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post'
        });

        Link.hasMany(models.Reference, {
            foreignKey: 'link',
            as: 'references'
        });
    };

    return Link;
};