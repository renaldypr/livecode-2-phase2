const router = require('express').Router();
const { showAll, create, login, random, showOne, follow } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

router.get('/', showAll);
router.post('/', create);
router.post('/login', login);
router.post('/random', random);
router.get('/:id', showOne);
router.post('/follow/:id', auth, follow)

module.exports = router;