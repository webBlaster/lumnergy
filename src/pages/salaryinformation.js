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
  SALARY_INFORMATION_UPDATE_SUCCESSFUL,
  FINANCING_INFORMATION_UPDATED
} from "../constants.js";
import SalaryInformationForm from "../components/setup/salaryinformationform.js";

let yup = require("yup");

class SalaryInformation extends Component {
  state = {
    salaryInformationButton: false
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
        dispatch({type:FINANCING_INFORMATION_UPDATED});
          this.props.history.push("/checkout");
      }
    };
  };

  updateSalaryInformation = salaryInformation => {
      const apiInstance = getApiInstance(this.props.auth.authToken);
      const loadingButtonName = "salaryInformationButton";
      this.setState({ ...this.state, [loadingButtonName]: true });
      const callback = this.getAPICallback(
        "Salary information updated successfully.",
        SALARY_INFORMATION_UPDATE_SUCCESSFUL,
        salaryInformation,
        loadingButtonName
      );
      apiInstance.accountInfoTypePost(
        "salary-information",
        salaryInformation,
        callback
      );
  };

  render() {
    const salaryInformationSchema = yup.object({
      salary: yup.number().required("Salary is required")
    });

    const salaryInformationValues = {
      salary: 0
    };

    let { salaryInformationButton } = this.state;

    return (
      <div className="h-100 d-flex flex-column justify-content-between">
        <DefaultHeader />
        <Container className="setup-forms-container mt-5">
          <SalaryInformationForm
            className="setup-form"
            auth={this.props.auth}
            salaryInformationSchema={salaryInformationSchema}
            updateSalaryInformation={this.updateSalaryInformation}
            salaryInformationValues={salaryInformationValues}
            salaryInformationButton={salaryInformationButton}
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
)(withRouter(SalaryInformation));
