const express = require("express");
const router = express.Router();

const expensesCtrl = require("../controllers/expenses.js");
const isAuth = require("../middleware/is-auth.js");

router.post("/", isAuth, expensesCtrl.create);
router.get("/", isAuth, expensesCtrl.retrieve);
router.delete("/:id", isAuth, expensesCtrl.delete);
router.put("/:id", isAuth, expensesCtrl.update);

module.exports = router;
