const router = require('express').Router();
const { showAll, create, erase } = require('../controllers/statusController');
const { auth } = require('../middlewares/auth');

router.get('/', showAll);
router.post('/', auth, create);
router.delete('/', auth, erase);
// router.patch('/', auth, edit);

module.exports = router;