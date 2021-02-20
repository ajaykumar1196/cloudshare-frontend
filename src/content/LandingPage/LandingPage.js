import React from "react";
import FileDetails from "../../components/FileDetails/index";
import Dropzone from "../../components/Dropzone/Dropzone";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="bx--grid bx--grid--full-width">
        <div className="bx--row">
          <div className="bx--col-lg-16">
            <h2>Home</h2>
          </div>
        </div>
        <div className="mb-4"></div>
        <div className="bx--row">
          <div className="bx--col-lg-16 bx--no-gutter">
            <Dropzone disabled={false} />
          </div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-16 bx--no-gutter">
            <FileDetails />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
