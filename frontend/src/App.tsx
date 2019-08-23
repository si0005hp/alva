import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";
import Login from "./components/Login";
import auth0 from "./auth0/auth0-util";
import Ping from "./components/Ping";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/callback" render={auth0.callback} />
        <Route exact path="/main" render={withAuth(Main)} />
        <Route exact path="/ping" component={Ping} />
        <Redirect to="/main" />;
      </Switch>
    </div>
  );
};

const withAuth = (Component: any) => (props: any) =>
  auth0.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />;

export default App;
