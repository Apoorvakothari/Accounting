import request from "../services/request";

const BASE_URL = "/api/incomes";

export async function createIncome(incomeFormData) {
  return await request(`${BASE_URL}`, "POST", incomeFormData);
}

export async function getIncomes() {
  return await request(`${BASE_URL}`, "GET");
}

export async function deleteIncome(incomeId) {
  return await request(`${BASE_URL}/${incomeId}`, "DELETE");
}

export async function updateIncome(incomeId, incomeFormData) {
  return await request(`${BASE_URL}/${incomeId}`, "PUT", incomeFormData);
}
