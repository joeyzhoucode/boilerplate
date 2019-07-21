import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as globalActions from "actions/globalActions";
import * as profileActions from "actions/profileActions";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import HeaderLinks from "containers/HeaderLinks.jsx";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

// Product Section
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import InfoArea from "components/InfoArea/InfoArea.jsx";

// Work Section
import CustomInput from "components/CustomInput/CustomInput.jsx";

import landingPageStyle from "assets/jss/material-kit-react/containers/landingPage.jsx";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.profileActions.profileFetch();
  }

  componentDidUpdate() {
    const userId = this.props.profile.id;
    if(userId && !this.props.global.connection) {
      this.props.globalActions.messengerSubscribe(userId, "Global", data => { console.log(data); });
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Boilerplate"
          rightLinks={<HeaderLinks/>}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4>
                  Every landing page needs a small description after the big
                  bold title, that{"'"}s why we added this text here. Add here
                  all the information that can make you or your product create
                  the first impression.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch video
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                  <h2 className={classes.description}>Let{"'"}s talk product</h2>
                  <h5 className={classes.description}>
                    This is the paragraph where you can write more details about your
                    product. Keep you user engaged by providing meaningful
                    information. Remember that by this time, the user is curious,
                    otherwise he wouldn{"'"}t scroll to get here. Add a button if you
                    want the user to see more.
                  </h5>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem cs={12} sm={12} md={8}>
                  <h2 className={classes.description}>ActionCable Example</h2>
                  <form>
                    <GridContainer>
                      <CustomInput
                        labelText="Your Message"
                        id="message"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.textArea
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5
                        }}
                      />
                      <GridContainer justify="center">
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          className={classes.textCenter}
                        >
                          <Button
                            color="primary"
                            onClick={() => { this.props.globalActions.messengerBroadcast({ message: "Hello World!", groupName: "Global" }) }}
                          >
                            Send Message To Console
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </GridContainer>
                  </form>
                </GridItem>
              </GridContainer>
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InfoArea
                      title="Free Chat"
                      description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                      icon={Chat}
                      iconColor="info"
                      vertical
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InfoArea
                      title="Verified Users"
                      description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                      icon={VerifiedUser}
                      iconColor="success"
                      vertical
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InfoArea
                      title="Fingerprint"
                      description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                      icon={Fingerprint}
                      iconColor="danger"
                      vertical
                    />
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object
};

function mapStateToProps(state) {
  return {
    global: state.global,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    globalActions: bindActionCreators(globalActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(landingPageStyle)(LandingPage));