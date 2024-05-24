const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const { all, add, remove, edit, publication } = require('../controllers/publications');

//api/publications
router.get('/', auth, all);
//api/publications/:id
router.get('/:id', auth, publication);
//api/publications/add
router.post('/add', auth, add);
//api/publications/remove/:id
router.post('/remove/:id', auth, remove);
//api/publications/edit/:id
router.put('/edit/:id', auth, edit);

module.exports = router;