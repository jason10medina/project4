const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const { upload } = require('../middleware/fileUpload');

router.get('/', itemsController.list);

router.get('/new', itemsController.newItem);

router.post('/', upload, itemsController.create_post);

router.get('/:id', itemsController.detail);

router.get('/:id/edit', itemsController.edit);

router.put('/:id', upload, itemsController.update_post);

router.delete('/:id', itemsController.delete_post);

router.post('/:id/delete', itemsController.delete_post);

module.exports = router;
