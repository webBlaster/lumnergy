import React, { Component } from "react";
import { Container } from "react-bootstrap";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from "../components/footers/default.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./formstyle.css";
import { getResponseErrors, getApiInstance } from "../utils.js";
import {
  RESPONSE_SUCCESS_MESSAGE,
  RESPONSE_ERROR_MESSAGE,
  PROFILE_INFORMATION_UPDATED,
  PERSONAL_INFORMATION_UPDATE_SUCCESSFUL
} from "../constants.js";
import PersonalInformationForm from "../components/setup/personalinformationform.js";

let yup = require("yup");

class PersonalInformation extends Component {
  state = {
    personalInformationButton: false
  };

  getAPICallback = (
    successAlertMessage,
    actionType = null,
    payload = null,
    loadingButtonName
  ) => {
    return (errors, data, response) => {
      const responseErrors = getResponseErrors(errors, response);
      let { dispatch } = this.props;
      if (responseErrors.length) {
        this.setState({
          ...this.state,
          [loadingButtonName]: false
        });
        dispatch({type:RESPONSE_ERROR_MESSAGE, payload: responseErrors });
      } else {
        this.setState({
          ...this.state,
          [loadingButtonName]: false
        });
        dispatch({type:RESPONSE_SUCCESS_MESSAGE, payload: successAlertMessage });
        this.props.dispatch({
          type: actionType,
          payload
        });

        if (response.body.data.isProfileUpdated) {
          this.props.dispatch({ type: PROFILE_INFORMATION_UPDATED });
          this.props.history.push("/dashboard");
        }
      }
    };
  };

  updatePersonalInformation = personalInformation => {
    const apiInstance = getApiInstance(this.props.auth.authToken);
    const loadingButtonName = "personalInformationButton";
    this.setState({ ...this.state, [loadingButtonName]: true });
    const callback = this.getAPICallback(
      "Personal information updated successfully.",
      PERSONAL_INFORMATION_UPDATE_SUCCESSFUL,
      personalInformation,
      loadingButtonName
    );
    apiInstance.accountInfoTypePost(
      "personal-information",
      personalInformation,
      callback
    );
  };

  render() {
    const phoneNumberRegex = /^\+234[0-9]{10}$/;
    const personalInformationSchema = yup.object({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      phoneNumber: yup.string().max(14).min(14).matches(phoneNumberRegex, "Phone Number Format is Invalid").required("Phone Number is required"),
      address: yup.string().required("Address is required")
    });

    const personalInformationValues = {
      firstName: this.props.auth.firstName,
      lastName: this.props.auth.lastName,
      phoneNumber: this.props.auth.phoneNumber,
      address: this.props.auth.address
    };

    let { personalInformationButton } = this.state;

    return (
      <div className="h-100 d-flex flex-column justify-content-between">
        <DefaultHeader />
        <Container className="setup-forms-container mt-5">
          <PersonalInformationForm
            className="setup-form"
            auth={this.props.auth}
            personalInformationButton={personalInformationButton}
            updatePersonalInformation={this.updatePersonalInformation}
            personalInformationValues={personalInformationValues}
            personalInformationSchema={personalInformationSchema}
          />
        </Container>
        <DefaultFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PersonalInformation));
