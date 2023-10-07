const Expense = require("../../models/expense");

module.exports = {
  create,
  retrieve,
  delete: deleteExpense,
  update,
};

const create = async (req, res) => {
  const expense = new Expense({
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    account: req.body.account,
    notes: req.body.notes,
    user: req.user._id,
  });

  try {
    const savedExpense = await expense.save();

    res.json({
      message: "Expense submitted successfully",
      data: savedExpense,
      error: null,
    });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Error submitting expense form",
        data: null,
        error: err,
      });
  }
}

const retrieve = async(req, res) => {
    try {
      const expenses = await Expense.find({ user: req.user._id }).sort({
        date: -1,
      });
      res.json({
        message: "List of expense retrived successfully",
        data: expenses,
        error: null,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
            message: "Failed to retrieve list of expenses",
            data: null,
            error: err,
      });
    }
}

const deleteExpense = async(req, res) => {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
      if (!deletedExpense) {
        return res
            .status(404)
            .json({ 
                message: "Expense not found",
                data: null,
                error: err,
            });
      }
      res
        .json({
            success: true,
            message: "Expense deleted successfully",
            expense: deletedExpense,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ 
            message: "Error deleting expense",
            data: null,
            error: err,
        });
    }
}

const update = async(req, res) =>{
    try {
      const expense = await Expense.findById(req.params.id);
      expense.description = req.body.description;
      expense.amount = req.body.amount;
      expense.category = req.body.category;
      expense.date = req.body.date;
      expense.account = req.body.account;
      expense.notes = req.body.notes;
      const updatedExpense = await expense.save();
      res
        .json({
            message: "Updated Expense",
            data: updatedExpense,
            error: null,
        });
    } catch (error) {
      res
        .status(500)
        .json({ 
            message: "Error updating expense",
            data: null,
            error: err,
        });
    }
}