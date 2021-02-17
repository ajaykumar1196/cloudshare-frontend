import React from "react";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderPanel,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SwitcherItem,
  Switcher,
  SwitcherDivider,
} from "carbon-components-react";
import { Notification20, UserAvatar20 } from "@carbon/icons-react";
import { Link } from "react-router-dom";

const TutorialHeader = () => (
  <HeaderContainer
    render={() => (
      <Header aria-label="Carbon Tutorial">
        <HeaderName element={Link} to="/" prefix="">
          Cloudshare
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Notifications">
            <Notification20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction isActive aria-label="User Avatar">
            <UserAvatar20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        {/* <HeaderPanel aria-label="Profile Panel" expanded={true}>
          <Switcher aria-label="Switcher Container">
            <SwitcherItem aria-label="Link 1" href="#">
              Dashboard
            </SwitcherItem>
            <SwitcherItem href="#" aria-label="Link 2">
              Profile
            </SwitcherItem>
            <SwitcherDivider />
            <SwitcherItem href="#" aria-label="Link 3">
              Logout
            </SwitcherItem>
          </Switcher>
        </HeaderPanel> */}
      </Header>
    )}
  />
);

export default TutorialHeader;
