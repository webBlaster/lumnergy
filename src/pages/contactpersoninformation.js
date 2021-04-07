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
  CONTACT_PERSON_INFORMATION_UPDATE_SUCCESSFUL,
} from "../constants.js";
import ContactPersonInformationForm from "../components/setup/contactpersoninformationform.js";

let yup = require("yup");

class ContactPersonInformation extends Component {
  state = {
    contactPersonInformationButton: false,
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
          [loadingButtonName]: false,
        });
        dispatch({ type: RESPONSE_ERROR_MESSAGE, payload: responseErrors });
      } else {
        this.setState({
          ...this.state,
          [loadingButtonName]: false,
        });
        dispatch({
          type: RESPONSE_SUCCESS_MESSAGE,
          payload: successAlertMessage,
        });
        this.props.dispatch({
          type: actionType,
          payload,
        });
        this.props.history.push("/salaryinformation");
      }
    };
  };

  updateContactPersonInformation = (contactPersonInformation) => {
    const apiInstance = getApiInstance(this.props.auth.authToken);
    const loadingButtonName = "contactPersonInformationButton";
    this.setState({ ...this.state, [loadingButtonName]: true });
    const callback = this.getAPICallback(
      "Contact information updated successfully.",
      CONTACT_PERSON_INFORMATION_UPDATE_SUCCESSFUL,
      contactPersonInformation,
      loadingButtonName
    );

    const requestData = {
      fullName: contactPersonInformation.contactPersonFullname,
      phoneNumber: contactPersonInformation.contactPersonPhoneNumber,
      email: contactPersonInformation.contactPersonEmail,
    };

    apiInstance.accountInfoTypePost(
      "contact-person-information",
      requestData,
      callback
    );
  };

  render() {
    const phoneNumberRegex = /^\+234[0-9]{10}$/;
    const contactPersonInformationSchema = yup.object({
      contactPersonFullname: yup.string().required("Full Name is required"),
      contactPersonPhoneNumber: yup
        .string()
        .max(14)
        .min(14)
        .matches(phoneNumberRegex, "Phone Number Format is Invalid")
        .required("Phone Number is required"),
      contactPersonEmail: yup
        .string()
        .email("Email is Invalid")
        .required("Email is required"),
    });

    const contactPersonInformationValues = {
      contactPersonFullname: this.props.auth.contactPersonFullname,
      contactPersonPhoneNumber: this.props.auth.contactPersonPhoneNumber,
      contactPersonEmail: this.props.auth.contactPersonEmail,
    };

    let { contactPersonInformationButton } = this.state;

    return (
      <div className="h-100 d-flex flex-column justify-content-between">
        <DefaultHeader />
        <Container className="setup-forms-container mt-5">
          <ContactPersonInformationForm
            className="setup-form"
            auth={this.props.auth}
            contactPersonInformationSchema={contactPersonInformationSchema}
            updateContactPersonInformation={this.updateContactPersonInformation}
            contactPersonInformationValues={contactPersonInformationValues}
            contactPersonInformationButton={contactPersonInformationButton}
          />
        </Container>
        <DefaultFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactPersonInformation));
