import request from "../services/request";
const BASE_URL = "/api/users";

export const signUp = (userData) => {
  return request(BASE_URL, "POST", userData);
};

export const login = (credentials) => {
  return request(`${BASE_URL}/login`, "POST", credentials);
};

export const checkToken = () => {
  return request(`${BASE_URL}/check-token`);
};
