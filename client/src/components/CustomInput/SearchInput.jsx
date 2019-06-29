import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Search from "@material-ui/icons/Search";
// core components
import searchInputStyle from "assets/jss/boilerplate-react/components/searchInputStyle.jsx";

function SearchInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  return (
    <div className={classes.searchWrapper}>
      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
      >
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
        <Input
          classes={{
            root: classes.labelRoot,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          onKeyPress={(target) => {
            if(target.charCode === 13) {
              target.preventDefault();
              const videoId = document.getElementById(id).value;
              props.playerBroadcast({ videoId: videoId, videoState: "play", theatreCode: props.theatreCode });
              document.getElementById(id).value = "";
            }
          }}
          {...inputProps}
        />
        {error ? (
          <Clear className={classes.feedback + " " + classes.labelRootError} />
        ) : success ? (
          <Check className={classes.feedback + " " + classes.labelRootSuccess} />
        ) : null}
      </FormControl>
      <IconButton onClick={() => {
        const videoId = document.getElementById(id).value;
        props.playerBroadcast({ videoId: videoId, videoState: "play", theatreCode: props.theatreCode });
        document.getElementById(id).value = "";
      }}>
        <Search className={classes.labelRoot + labelClasses} />
      </IconButton>
    </div>
  );
}

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(searchInputStyle)(SearchInput);
