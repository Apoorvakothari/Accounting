const express = require('express');
const router = express.Router();
const incomesCtrl = require('../controllers/incomes.js');
const isAuth = require('../middleware/is-auth.js');

router.post('/', isAuth, incomesCtrl.create);
router.get('/', isAuth, incomesCtrl.retrieve);
router.delete('/:id', isAuth, incomesCtrl.delete);
router.put('/:id', isAuth, incomesCtrl.update);

module.exports = router;
