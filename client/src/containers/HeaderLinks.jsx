/*eslint-disable*/
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as globalActions from "actions/globalActions";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Home, Person, Fingerprint, Extension, Apps } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/containers/headerLinksStyle.jsx";

class HeaderLinks extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={() => { this.props.globalActions.historyPush('/'); }}
          >
            <Home className={classes.icons} /> Home
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={() => { this.props.globalActions.historyPush('/profile'); }}
          >
            <Person className={classes.icons} /> Profile
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={() => { this.props.globalActions.historyPush('/login'); }}
          >
            <Fingerprint className={classes.icons} /> Login
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={() => { this.props.globalActions.historyPush('/components'); }}
          >
            <Extension className={classes.icons} /> Examples
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Applications"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Apps}
            dropdownList={[
              <Link
                target="_blank"
                className={classes.dropdownLink}
                onClick={() => { this.props.globalActions.historyPush('/components'); }}
              >
                <Extension className={classes.icons} /> App 1
              </Link>,
              <Link
                target="_blank"
                className={classes.dropdownLink}
                onClick={() => { this.props.globalActions.historyPush('/components'); }}
              >
                <Extension className={classes.icons} /> App 2
              </Link>,
            ]}
          />
        </ListItem>
      </List>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object
};

function mapStateToProps(state) {
  return {
    global: state.global,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    globalActions: bindActionCreators(globalActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));