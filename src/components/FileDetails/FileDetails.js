import React from "react";
import RepoTable from "./RepoTable";

const FileDetails = () => {
  return (
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter">
      <div className="bx--row">
        <div className="bx--col-lg-16">
          <RepoTable />
        </div>
      </div>
    </div>
  );
};

export default FileDetails;
