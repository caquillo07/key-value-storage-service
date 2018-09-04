'use strict';
module.exports = (sequelize, DataTypes) => {
    const definition = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        html: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    };

    const configuration = { timestamps: false };

    const Post = sequelize.define('Post', definition, configuration);

    Post.associate = function (models) {
        // associations can be defined here
        Post.hasMany(models.Link, {
            foreignKey: 'postId',
            as: 'links'
        });

        Post.hasMany(models.Reference, {
            foreignKey: 'postId',
            as: 'references'
        });
    };

    return Post;
};