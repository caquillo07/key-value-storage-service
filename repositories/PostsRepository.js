const { Post, Link, Reference } = require('../models');

class PostsRepository {
    posts = ['hello', 'there'];

    constructor() {
        console.log('created new repo');
    }

    getAllPosts() {

        // We would NEVER do this on a production app, but I added here
        // for testing.
        return Post.findAll();
    }

    async addPost(post, transaction = null) {
        const { links, references } = post;

        // First create the post so we cna use it on the rest of the models.
        const options = { transaction, validate: true };
        const createdPost = await Post.create(post, options);

        // First save the links, and get the IDs.
        if (links && links.length > 0) {
            links.forEach(link => link.postId = createdPost.id);
            await Link.bulkCreate(links, options);
        }

        // Then lets save all of the references and get the IDs
        if (references && references.length > 0) {
            references.forEach(references => references.postId = createdPost.id);
            await Reference.bulkCreate(references, options);
        }

        return createdPost;
    }

    /**
     * Returns
     * @param tuple
     * @param transaction
     * @returns {Promise<void>}
     */
    async get([key, id], transaction = null) {

        // lets start by building the where
        let include = [];
        let where = { id };
        let attributes = ['id'];
        switch (key) {
            case undefined:
            case '':
                attributes.push('html');
                include = [
                    {
                        model: Link,
                        as: 'links'
                    },
                    {
                        model: Reference,
                        as: 'references'
                    }
                ];
                break;
            case 'html':
                attributes.push('html');
                break;
            case 'links':
                include.push({
                    model: Link,
                    as: 'links'
                });
                break;
            case 'references':
                include.push({
                    model: Reference,
                    as: 'references'
                });
                break;
        }

        const options = {
            transaction,
            where,
            include,
            attributes
        };

        try {
            // return results.
            return await Post.find(options);
        } catch (e) {
            throw e;
        }
    }
}

export default PostsRepository;
