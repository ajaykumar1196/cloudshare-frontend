import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./app.scss";
import { Content } from "carbon-components-react";
import NavHeader from "./components/NavHeader/NavHeader";
import FileUpload from "./components/FileUpload/FileUpload";
import LandingPage from "./content/LandingPage/LandingPage";
import ProfilePage from "./content/ProfilePage/ProfilePage";
import LoginPage from "./content/LoginPage/LoginPage";
import SignupPage from "./content/SignupPage/SignupPage";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  const link = useSelector((state) => state.fileDownload.link);

  useEffect(() => {
    const url = link;
    var ifrm = document.createElement("object");
    ifrm.setAttribute("data", url);
    ifrm.style.height = "0px";
    document.body.appendChild(ifrm);
  }, [link]);

  return (
    <div>
      <BrowserRouter>
        <NavHeader />
        <Content>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={LandingPage} />
            <PrivateRoute path="/dashboard/:folder" component={LandingPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </Content>
        <FileUpload />
      </BrowserRouter>
    </div>
  );
};

export default App;
