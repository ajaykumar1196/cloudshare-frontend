import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../actions/authAction";
import { fetchProfile } from "../../actions/profileAction";

import {
  Header,
  HeaderName,
  HeaderPanel,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SwitcherItem,
  Switcher,
  SwitcherDivider,
  OverflowMenuItem,
} from "carbon-components-react";
import { Close20, Notification20, UserAvatar20 } from "@carbon/icons-react";

function NavHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Header aria-label="Cloudshare">
      <HeaderName element={Link} to="/dashboard" prefix="">
        Cloudshare
      </HeaderName>
      {isAuthenticated ? (
        <>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Notifications">
              <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              onClick={handleExpandClick}
              aria-label="User Avatar"
            >
              {isExpanded ? <Close20 /> : <UserAvatar20 />}
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <HeaderPanel
            aria-label="Profile Panel"
            expanded={isExpanded}
            style={{ bottom: "unset" }}
          >
            <Switcher aria-label="Switcher Container">
              <SwitcherItem
                aria-label="Dashboard Link"
                element={Link}
                to="/dashboard"
              >
                Dashboard
              </SwitcherItem>
              <SwitcherItem
                element={Link}
                to="/profile"
                aria-label="Profile Link"
              >
                Profile
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem
                aria-label="Logout Link"
                onClick={handleLogout}
                className="mb-2"
              >
                Logout
              </SwitcherItem>
            </Switcher>
          </HeaderPanel>
        </>
      ) : null}
    </Header>
  );
}

export default NavHeader;
