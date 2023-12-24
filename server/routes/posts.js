const express = require('express');
const {getpost,getposts, createpost, updatePost, deletePost, LikePost,getPostsBySearch } = require('../controllers/posts');
const router = express.Router();
const { auth } = require('../middleware/auth');

router.get('/', getposts);
router.get('/:id', getpost);

router.post('/search', getPostsBySearch);
router.post('/',auth, createpost);
router.patch('/:id',auth, updatePost);
router.delete('/:id', auth,deletePost);
router.patch('/:id/likePost',auth, LikePost);


module.exports= router;