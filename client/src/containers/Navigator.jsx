/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as navigatorActions from "../actions/navigatorActions";
import * as homeActions from "../actions/homeActions";
import * as profileActions from "../actions/profileActions";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";
import navigatorStyle from "assets/jss/boilerplate-react/layouts/navigatorStyle.jsx";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          component={prop.component}
          key={key}
        />
      );
    })}
  </Switch>
);

class Navigator extends React.Component {
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.props.navigatorActions.navigatorDrawerClose();
    }
  };
  componentDidMount() {
    window.addEventListener("resize", this.resizeFunction);
    this.props.profileActions.profileFetch();
    this.props.homeActions.theatreFetch();
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.props.navigator.mobileOpen) {
        this.props.navigatorActions.navigatorDrawerClose();
      }
      this.props.navigatorActions.messengerUnsubscribe();
      this.props.navigatorActions.messengerFetch(this.props.path || "Global");
      this.props.navigatorActions.messengerSubscribe(this.props.profile.id, this.props.path || "Global", this.props.navigatorActions.messengerRecieve);
    }
    
    if (this.props.profile.id && !this.props.navigator.connection) {
      this.props.navigatorActions.messengerFetch(this.props.path || "Global");
      this.props.navigatorActions.messengerSubscribe(this.props.profile.id, this.props.path || "Global", this.props.navigatorActions.messengerRecieve);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        {<Sidebar
          historyPush={this.props.navigatorActions.historyPush}
          logoText={this.props.profile.firstName + " " + this.props.profile.lastName}
          logo={this.props.profile.image}
          handleDrawerToggle={this.props.navigatorActions.navigatorDrawerToggle}
          open={this.props.navigator.mobileOpen}
          color={this.props.navigator.color}
          messages={this.props.navigator.messages}
          sendContent={this.props.navigatorActions.messengerBroadcast}
          theatreCode={this.props.path || "Global"}
          messageInput={this.props.navigator.messageInput}
          updateMessageInput={this.props.navigatorActions.updateMessageInput}
          {...rest}
        />}
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            historyPush={this.props.navigatorActions.historyPush}
            handleDrawerToggle={this.props.navigatorActions.navigatorDrawerToggle}
            theatreCode={this.props.path || "Global"}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    path: state.router.location.pathname.substr(8),
    navigator: state.navigator,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigatorActions: bindActionCreators(navigatorActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(navigatorStyle)(Navigator));
