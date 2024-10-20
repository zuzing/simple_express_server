const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.post_index);
router.get('/:postID', postController.post_details);
router.post('/', postController.post_create);
router.delete('/:postID', postController.post_delete);


module.exports = router;