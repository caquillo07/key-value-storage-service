import { PostsRepository } from '../repositories';
import sanitizeHtml from 'sanitize-html';

const { sequelize } = require('../models');

class PostController {
    constructor() {
    }

    static async listAction(req, res) {
        try {
            res.send(await PostsRepository.getAllPosts());
        } catch (e) {
            console.log(e);
            res.status(500).send(e.message);
        }
    }

    static async postAction(req, res) {

        // Start a transaction.
        const transaction = await sequelize.transaction();
        try {
            const { links, references } = req.body;

            // sequelize already sanitizes for us, but better save than sorry
            const html = sanitizeHtml(req.body.html);
            const newPost = await PostsRepository.addPost({ links, references, html }, transaction);
            await transaction.commit();
            return res.send({ id: newPost.id });
        } catch (e) {
            console.log(e);
            await transaction.rollback();
            res.status(500).send(e.message);
        }
    }

    static async getAction(req, res) {
        const { query, id } = req.query;
        const tuple = this.extractTupleFromQuery(query);

        // extraction failed
        if (tuple === false && !id) {
            return res.status(400).send('Invalid tuple, please send in this format "key,id"');
        }

        try {

            // We will use the tuple to perform the query, but we can also
            // allow for just the post ID to be sent as well, which will return
            // the entire post (all three keys)
            const results = await PostsRepository.get(tuple || [undefined, id]);
            return res.send(results || {});
        } catch (e) {
            console.log(e);
            res.status(500).send(e.message);
        }
    }

    // Some helper methods
    /**
     *
     * @param {string} query
     */
    static extractTupleFromQuery(query) {
        if (!query) {
            return false;
        }

        const trimmedQuery = query.replace(/\s/g, '');
        const tuple = trimmedQuery.split(',');
        if (tuple.length !== 2) {
            return false; // bad tuple.
        }
        return tuple;
    }
}

export default PostController;
