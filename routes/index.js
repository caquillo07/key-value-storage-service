import { Router } from 'express';
import PostsController from '../controllers/PostController';

const router = Router();

router.get('/', (req, res) => res.send('Hello World!\n'));
router.post('/posts', PostsController.postAction);
router.get('/posts', PostsController.getAction.bind(PostsController));

export default router;
