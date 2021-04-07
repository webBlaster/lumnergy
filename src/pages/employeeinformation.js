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
  EMPLOYMENT_INFORMATION_UPDATE_SUCCESSFUL,
} from "../constants.js";

import EmployeeInformationForm from "../components/setup/employeeinformationform.js";

let yup = require("yup");

class EmployeeInformation extends Component {
  state = {
    employeeInformationButton: false,
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

        this.props.history.push("/contactpersoninformation");
      }
    };
  };

  updateEmploymentInformation = (employmentInformation) => {
    const apiInstance = getApiInstance(this.props.auth.authToken);
    const loadingButtonName = "employeeInformationButton";
    this.setState({ ...this.state, [loadingButtonName]: true });
    const callback = this.getAPICallback(
      "Employment information updated successfully.",
      EMPLOYMENT_INFORMATION_UPDATE_SUCCESSFUL,
      employmentInformation,
      loadingButtonName
    );
    apiInstance.accountInfoTypePost(
      "employee-information",
      employmentInformation,
      callback
    );
  };

  render() {
    const employeeInformationSchema = yup.object({
      companyName: yup.string().required("Company Name is required"),
      companyURL: yup.string().required("Company Url is required"),
    });

    const employeeInformationValues = {
      companyName: this.props.auth.companyName,
      companyURL: this.props.auth.companyURL,
    };

    let { employeeInformationButton } = this.state;

    return (
      <div className="h-100 d-flex flex-column justify-content-between">
        <DefaultHeader />
        <Container className="setup-forms-container mt-5">
          <EmployeeInformationForm
            className="setup-form"
            auth={this.props.auth}
            employeeInformationSchema={employeeInformationSchema}
            updateEmploymentInformation={this.updateEmploymentInformation}
            employeeInformationValues={employeeInformationValues}
            employeeInformationButton={employeeInformationButton}
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
)(withRouter(EmployeeInformation));
