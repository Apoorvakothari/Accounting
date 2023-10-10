const express = require("express");
const router = express.Router();

const userRouter = require("./users.js");
const incomeRouter = require("./incomes.js");
const expenseRouter = require("./expenses.js");

router.use("/users", userRouter);
router.use("/expenses", expenseRouter);
router.use("/incomes", incomeRouter);

module.exports = router;
