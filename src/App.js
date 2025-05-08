/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

// Protected Route component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
    };
  
    // Initial check
    checkAuth();
  
    // Handle storage change (from another tab)
    const handleStorageChange = () => {
      checkAuth();
    };
  
    // Optional: listen for focus (trở lại tab sẽ check lại trạng thái)
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", checkAuth);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", checkAuth);
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        
        {/* Main layout with protected routes */}
        <Route path="/">
          {isAuthenticated ? (
            <Main>
              <Switch>
                <Route exact path="/dashboard" component={Home} />
                <Route exact path="/tables" component={Tables} />
                <Route exact path="/billing" component={Billing} />
                <Route exact path="/rtl" component={Rtl} />
                <Route exact path="/profile" component={Profile} />
                <Redirect exact from="/" to="/dashboard" />
                <Redirect from="*" to="/dashboard" />
              </Switch>
            </Main>
          ) : (
            <Redirect to="/sign-in" />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;