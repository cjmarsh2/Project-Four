import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(user)
  })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Email already taken!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function getUser() {
  return tokenService.getUserFromToken();
}

function getUserInfo(user_id) {
  const options = {
    method: "GET"
  };
  return fetch(BASE_URL + user_id, options).then(res => res.json());
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds)
  })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function createList(randomPerp, user_id) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ randomPerp: randomPerp })
  };
  return fetch(BASE_URL + user_id, options).then(res => res.json());
}

function deletePerp(deletePerp, user_id) {
  var body = {
    user: user_id,
    perp: deletePerp
  }
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  return fetch(BASE_URL, options).then(res => res.text());
}

function handleFavorite(favPerp, user_id) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favPerp: favPerp })
  };
  return fetch(BASE_URL + user_id + '/favorite', options).then(res => res.json());
}

export default {
  signup,
  getUser,
  logout,
  login,
  createList,
  getUserInfo,
  deletePerp,
  handleFavorite
};
