import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import logo from '../assets/images/sidebarlogo.png';
import logoSm from '../assets/images/logo-sm.png';
import profilePic from '../assets/images/users/user-1.jpg';
import {getLoggedInUser} from "../helpers/authUtils";

const ProfileMenus = [{
  label: 'Update Account',
  icon: 'fe-user',
  redirectTo: "/update-account",
},
{
  label: 'Logout',
  icon: 'fe-log-out',
  redirectTo: "/logout",
  hasDivider: true
}];

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser()
    };
  }


  render() {
    return (
      <React.Fragment>
        <div className="navbar-custom">
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li>
              <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenus} username={this.state.user.fullName} />
            </li>
          </ul>
          <div className="logo-box">
            <Link to="/" className="logo text-center">
              <span className="logo-lg">
                <img src={logo} alt="logo" />
              </span>
              <span className="logo-sm">
                <img src={logoSm} alt="" height="24" />
              </span>
            </Link>
          </div>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light" onClick={this.props.menuToggle}>
                <i className="fe-menu"></i>
              </button>
            </li>
          </ul>
        </div>
      </React.Fragment >
    );
  }
}


export default connect()(Topbar);

