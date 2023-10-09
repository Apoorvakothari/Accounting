const Income = require("../../models/income");

module.exports = {
  create,
  retrieve,
  delete: deleteIncome,
  update,
};

const create = async(req, res) => {
    const income = new Income({
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      account: req.body.account,
      notes: req.body.notes,
      user: req.user._id,
    });
  
    try {
      const savedIncome = await income.save();
      res.json({
        message: "Income submitted successfully",
        data: savedIncome,
        error: null,
      });
    } catch (err) {
      res
        .status(400)
        .json({
            message: "Error submitting income form",
            data: null,
            error: err,
        });
    }
}

const retrieve = async(req, res) =>{
    try {
      const incomes = await Income.find({ user: req.user._id }).sort({
        date: -1,
      });
      res.json({
        message:"Sucessfully retrieved the list of income",
        data: incomes,
        error: null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to retrieve list of incomes",
      });
    }
}

const deleteIncome = async(req, res) => {
    try {
      const deletedIncome = await Income.findByIdAndDelete(req.params.id);
      if (!deletedIncome) {
        return res
            .status(404)
            .json({ 
                message: "Income not found",
                data: null,
                error: err,
            });
      }
      res
        .json({
            message: "Income deleted successfully",
            income: deletedIncome,
            error: null,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ 
            message: "Error deleting income",
            data: null,
            error: err,
        });
    }
}

const update = async(req, res) => {
    try {
      const income = await Income.findById(req.params.id);
      income.description = req.body.description;
      income.amount = req.body.amount;
      income.category = req.body.category;
      income.date = req.body.date;
      income.account = req.body.account;
      income.notes = req.body.notes;
      const updatedIncome = await income.save();
      res
        .json({
            message: "Income updated successfully",
            data: updatedIncome,
            error: null,
        });
    } catch (error) {
      res
        .status(500)
        .json({ 
            message: "Error updating income",
            data: null,
            error: err,
        });
    }
}