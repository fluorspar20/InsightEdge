import { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";

import AuthContext from "./context/auth-context";

import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const [email, setEmail] = useState(localStorage.getItem("user"));

  const login = (token, email) => {
    setToken(token);
    setEmail(email);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          token: token,
          email: email,
          setToken: setToken,
          setEmail: setEmail,
          login: login,
          logout: logout,
        }}
      >
        <div className="App">
          <Header />
          <Switch>
            {!token && <Route exact path="/" component={Landing} />}
            <Route exact path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
