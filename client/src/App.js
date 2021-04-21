import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import CreateBlog from "./Components/CreateBlog/CreateBlog";
import BlogPage from "./Components/BlogPage/BlogPage";

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

  useEffect(() => {
    document.querySelector(".divLoader").style.display = "none";
  }, []);

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
            {token && <Route exact path="/" component={Home} />}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            {token && (
              <Route exact path="/create_blog" component={CreateBlog} />
            )}
            {token && <Route path="/blogs/:id" component={BlogPage} />}
            <Redirect to="/" />
          </Switch>
          <Footer />
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
