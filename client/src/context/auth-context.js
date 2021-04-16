import React from "react";

export default React.createContext({
  token: null,
  email: null,
  setToken: (token) => {},
  setEmail: (email) => {},
  login: (token, email) => {},
  logout: () => {},
});
