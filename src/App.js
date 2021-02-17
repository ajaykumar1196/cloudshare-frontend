import React, { Component } from "react";
import "./app.scss";
import { Content } from "carbon-components-react";
import TutorialHeader from "./components/TutorialHeader";
import LandingPage from "./content/LandingPage/LandingPage";
import ProfilePage from "./content/ProfilePage/ProfilePage";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <TutorialHeader />
          <Content>
            <Switch>
              <Route exact path="/home" component={LandingPage} />
              <Route path="/home/:folder" component={LandingPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
              {/* <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} /> */}
              <Redirect from="*" to="/home" />
            </Switch>
          </Content>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
