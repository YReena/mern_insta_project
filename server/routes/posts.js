const express = require('express');
const {getpost,createpost, updatePost, deletePost, LikePost} = require('../controllers/posts');
const router = express.Router();
const { auth } = require('../middleware/auth');

router.get('/', getpost);
router.post('/',auth, createpost);
router.patch('/:id',auth, updatePost);
router.delete('/:id', auth,deletePost);
router.patch('/:id/likePost',auth, LikePost);


module.exports= router;