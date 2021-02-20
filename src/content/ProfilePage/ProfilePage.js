import React from "react";
import {
  Tabs,
  Tab,
  InlineNotification,
  RadioTile,
  Button,
  TileGroup,
} from "carbon-components-react";
import { Copy20, Cut20, Delete20, Edit20 } from "@carbon/icons-react";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
        <div className="bx--row">
          <div className="bx--col-lg-16">
            <h2>Profile</h2>
          </div>
        </div>
        <div className="mb-4"></div>
        <div className="bx--row">
          <div className="bx--col-lg-16 bx--no-gutter">
            <div style={{ width: "100%" }}>
              <Tabs scrollIntoView={true} type="container">
                <Tab href="#" id="tab-1" label="General">
                  <div className="some-content">
                    <div class="bx--row">
                      <div class="bx--col-lg-12">
                        <h5>Name</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="w-50">
                        <p className="bx--text-truncate--end">Ajay Kumar</p>
                      </div>
                      <div>
                        <Button size="field" renderIcon={Edit20}>
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div class="bx--row mt-3">
                      <div class="bx--col-lg-12">
                        <h5>Email</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="w-50">
                        <p className="bx--text-truncate--end">
                          ajaykumar@gmail.com
                        </p>
                      </div>
                      <div>
                        <Button size="field" renderIcon={Edit20}>
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div class="bx--row mt-3">
                      <div class="bx--col-lg-12">
                        <h5>Password</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="w-50">
                        <p className="bx--text-truncate--end">
                          ****************
                        </p>
                        <p className="text-muted small">
                          Last updated at {new Date().toDateString()}
                        </p>
                      </div>
                      <div>
                        <Button size="field" renderIcon={Edit20}>
                          Change
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div class="bx--row mt-3">
                    <div class="bx--col-lg-12">
                      <h5>Delete Account</h5>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="w-50">
                      <p className="bx--text-truncate--end">
                        Delete my account
                      </p>
                    </div>
                    <div>
                      <Button kind="danger" size="field" renderIcon={Delete20}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <InlineNotification
                    kind="warning"
                    hideCloseButton
                    lowContrast
                    iconDescription="describes the close button"
                    title="If you delete your account, your data will be gone forever."
                  />
                </Tab>
                <Tab href="#" id="tab-2" label="Plan">
                  <div className="">
                    <div class="bx--row mb-2">
                      <div class="bx--col-lg-12">
                        <h5>Current Plan</h5>
                      </div>
                    </div>
                    <div className="bx--row">
                      <RadioTile
                        id="tile-1"
                        name="tiles"
                        tabIndex={0}
                        value="standard"
                        className="bx--col-lg-2"
                        checked={true}
                      >
                        <h6>Standard</h6>
                        <h3>2GB</h3>
                      </RadioTile>
                      <RadioTile
                        id="tile-2"
                        name="tiles"
                        tabIndex={0}
                        disabled
                        className="bx--col-lg-2"
                      >
                        <h6>Upgrade</h6>
                        <h3>Coming Soon</h3>
                      </RadioTile>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
