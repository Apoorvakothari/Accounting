import request from "../services/request";

const BASE_URL = "/api/expenses";

export async function createExpense(expenseFormData) {
  return await request(`${BASE_URL}`, "POST", expenseFormData);
}

export async function getExpenses() {
  return await request(`${BASE_URL}`, "GET");
}

export async function deleteExpense(expenseId) {
  return await request(`${BASE_URL}/${expenseId}`, "DELETE");
}

export async function updateExpense(expenseId, expenseFormData) {
  return await request(`${BASE_URL}/${expenseId}`, "PUT", expenseFormData);
}
