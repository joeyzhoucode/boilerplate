import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as profileActions from "actions/profileActions";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

// Product Section
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import InfoArea from "components/InfoArea/InfoArea.jsx";

// Team Section
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import team1 from "assets/img/faces/avatar.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";

// Work Section
import CustomInput from "components/CustomInput/CustomInput.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Boilerplate"
          rightLinks={<HeaderLinks />}
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
                  <h2 className={classes.title}>Let{"'"}s talk product</h2>
                  <h5 className={classes.description}>
                    This is the paragraph where you can write more details about your
                    product. Keep you user engaged by providing meaningful
                    information. Remember that by this time, the user is curious,
                    otherwise he wouldn{"'"}t scroll to get here. Add a button if you
                    want the user to see more.
                  </h5>
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
            <div className={classes.section}>
              <h2 className={classes.title}>Here is our team</h2>
              <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                        <img src={team1} alt="..." className={imageClasses} />
                      </GridItem>
                      <h4 className={classes.cardTitle}>
                        Gigi Hadid
                        <br />
                        <small className={classes.smallTitle}>Model</small>
                      </h4>
                      <CardBody>
                        <p className={classes.description}>
                          You can write here details about one of your team members.
                          You can give more details about what they do. Feel free to
                          add some <a href="#pablo">links</a> for people to be able to
                          follow them outside the site.
                        </p>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                        <img src={team2} alt="..." className={imageClasses} />
                      </GridItem>
                      <h4 className={classes.cardTitle}>
                        Yi Zhou
                        <br />
                        <small className={classes.smallTitle}>Developer</small>
                      </h4>
                      <CardBody>
                        <p className={classes.description}>
                          You can write here details about one of your team members.
                          You can give more details about what they do. Feel free to
                          add some <a href="#pablo">links</a> for people to be able to
                          follow them outside the site.
                        </p>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card plain>
                      <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                        <img src={team3} alt="..." className={imageClasses} />
                      </GridItem>
                      <h4 className={classes.cardTitle}>
                        Kendall Jenner
                        <br />
                        <small className={classes.smallTitle}>Model</small>
                      </h4>
                      <CardBody>
                        <p className={classes.description}>
                          You can write here details about one of your team members.
                          You can give more details about what they do. Feel free to
                          add some <a href="#pablo">links</a> for people to be able to
                          follow them outside the site.
                        </p>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem cs={12} sm={12} md={8}>
                  <h2 className={classes.title}>Work with us</h2>
                  <h4 className={classes.description}>
                    Divide details about your product or agency work into parts. Write
                    a few lines about each one and contact us about any further
                    collaboration. We will responde get back to you in a couple of
                    hours.
                  </h4>
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Your Name"
                          id="name"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Your Email"
                          id="email"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
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
                          <Button color="primary">Send Message</Button>
                        </GridItem>
                      </GridContainer>
                    </GridContainer>
                  </form>
                </GridItem>
              </GridContainer>
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
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(landingPageStyle)(LandingPage));