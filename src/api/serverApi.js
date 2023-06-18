import * as request from "./request.js";
import { setUserData, clearUserData } from "./util.js";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export const get = request.get;
export const post = request.post;
export const put = request.put;
export const del = request.delete;

export async function login(email, password) {
  const user = await request.post(endpoints.login, { email, password });

  setUserData(user);
}

export async function register(email, password) {
  const user = await request.post(endpoints.register, { email, password });

  setUserData(user);
}

export async function logout() {
  await request.get(endpoints.logout);
  clearUserData();
}
