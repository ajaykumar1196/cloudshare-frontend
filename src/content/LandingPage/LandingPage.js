import React from "react";
import FileDetails from "../../components/FileDetails/index";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="bx--grid bx--grid--full-width">
        <div className="bx--row">
          <div className="bx--col-lg-16">
            <h2>Home</h2>
          </div>
        </div>
      </div>
      <FileDetails />
    </React.Fragment>
  );
};

export default LandingPage;
