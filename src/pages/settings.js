import React, { Component } from "react";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from "../components/footers/default.js";
import { Form, Card, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "./formstyle.css";
import { getResponseErrors } from "../utils.js";
import LoadingButton from "../components/loader/loadingbutton.js";
import {
  RESPONSE_SUCCESS_MESSAGE,
  RESPONSE_ERROR_MESSAGE,
  PERSONAL_INFORMATION_UPDATE_SUCCESSFUL,
  EMPLOYMENT_INFORMATION_UPDATE_SUCCESSFUL,
  CONTACT_PERSON_INFORMATION_UPDATE_SUCCESSFUL,
  SALARY_INFORMATION_UPDATE_SUCCESSFUL
} from "../constants.js";

import { Formik } from "formik";
let yup = require("yup");

const LumnergyApi = require("lumnergy_api");
const defaultClient = LumnergyApi.ApiClient.instance;

class Settings extends Component {
  state = {
    passwordInformationButton: false,
    personalInformationButton: false,
    employmentInformationButton: false,
    contactPersonInformationButton: false,
    salaryInformationButton: false
  };

  constructor(props) {
    super(props);

    this.apiInstance = this.getApiInstance();
  }

  getApiInstance = () => {
    let APIKeyAuth = defaultClient.authentications["APIKeyAuth"];
    APIKeyAuth.apiKey = this.props.auth.authToken;
    let apiInstance = new LumnergyApi.AccountApi(defaultClient);

    return apiInstance;
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
      console.log(loadingButtonName)
      if (responseErrors.length) {
        this.setState({
          ...this.state,
          [loadingButtonName]: false
        });
        dispatch({type:RESPONSE_ERROR_MESSAGE, payload: responseErrors});
      } else {
        this.setState({
          ...this.state,
          [loadingButtonName]: false
        });
        dispatch({type:RESPONSE_SUCCESS_MESSAGE, payload: successAlertMessage })
        this.props.dispatch({
          type: actionType,
          payload
        });
      }
    };
  };

  changePassword = passwordInformation => {
    let loadingButtonName = "passwordInformationButton";
    this.setState({ ...this.state, [loadingButtonName]: true });

    const callback = this.getAPICallback(
      "Password changed successfully.",
      null,
      null,
      loadingButtonName
    );
    this.apiInstance.accountPasswordChangePost(passwordInformation, callback);
  };

  updatePersonalInformation = personalInformation => {
    let loadingButtonName = "personalInformationButton";
    this.setState({ ...this.state, [loadingButtonName]: true });

    const callback = this.getAPICallback(
      "Personal information updated successfully.",
      PERSONAL_INFORMATION_UPDATE_SUCCESSFUL,
      personalInformation,
      loadingButtonName
    );
    this.apiInstance.accountInfoTypePost(
      "personal-information",
      personalInformation,
      callback
    );
  };

  updateEmploymentInformation = employmentInformation => {
    let loadingButtonName = "employmentInformationButton";
    this.setState({ ...this.state, [loadingButtonName]: true });

    const callback = this.getAPICallback(
      "Employment information updated successfully.",
      EMPLOYMENT_INFORMATION_UPDATE_SUCCESSFUL,
      employmentInformation,
      loadingButtonName
    );
    this.apiInstance.accountInfoTypePost(
      "employee-information",
      employmentInformation,
      callback
    );
  };

  updateContactPersonInformation = contactPersonInformation => {
    let loadingButtonName = "contactPersonInformationButton";
    this.setState({ ...this.state, [loadingButtonName]: true });

    const callback = this.getAPICallback(
      "Contact information updated successfully.",
      CONTACT_PERSON_INFORMATION_UPDATE_SUCCESSFUL,
      contactPersonInformation,
      loadingButtonName
    );
    this.apiInstance.accountInfoTypePost(
      "contact-person-information",
      contactPersonInformation,
      callback
    );
  };

  updateSalaryInformation = salaryInformation => {
    let loadingButtonName = "salaryInformationButton";
    this.setState({ ...this.state, [loadingButtonName]: true });

    const callback = this.getAPICallback(
      "Salary information updated successfully.",
      SALARY_INFORMATION_UPDATE_SUCCESSFUL,
      salaryInformation,
      loadingButtonName
    );
    this.apiInstance.accountInfoTypePost(
      "salary-information",
      salaryInformation,
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

    const passwordSchema = yup.object({
      currentPassword: yup.string().required("Current Password is required"),
      password: yup.string().required("Password is required"),
      confirmPassword: yup.string().required("Confirm Password is required")
    });

    const passwordValues = {
      currentPassword: "",
      password: "",
      confirmPassword: ""
    };

    const employeeInformationSchema = yup.object({
      companyName: yup.string().required("Company Name is required"),
      companyURL: yup.string().required("Company Url is required")
    });

    const employeeInformationValues = {
      companyName: this.props.auth.companyName,
      companyURL: this.props.auth.companyURL
    };

    const contactPersonInformationSchema = yup.object({
      fullName: yup.string().required("Full Name is required"),
      phoneNumber: yup.string().max(14).min(14).matches(phoneNumberRegex, "Phone Number Format is Invalid").required("Phone Number is required"),
      email: yup.string().email("Invalid Email").required("Email is required")
    });

    const contactPersonInformationValues = {
      fullName: this.props.auth.contactPersonFullname,
      phoneNumber: this.props.auth.contactPersonPhoneNumber,
      email: this.props.auth.contactPersonEmail
    };

    const salaryInformationSchema = yup.object({
      salary: yup.number().required("Salary is required")
    });

    const salaryInformationValues = yup.object({
      salary: this.props.auth.salary
    });

    let {
      passwordInformationButton,
      personalInformationButton,
      employmentInformationButton,
      contactPersonInformationButton,
      salaryInformationButton
    } = this.state;

    return (
      <div>
        <DefaultHeader />
        <Container className="mt-5">
          <Row>
            <Col md={12} className="form-margin">
              <Card>
                <Card.Body>
                  <Card.Title>Password</Card.Title>
                  <Formik
                    validationSchema={passwordSchema}
                    onSubmit={this.changePassword}
                    initialValues={passwordValues}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="currentPassword">
                          <Form.Label>Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Current Password"
                            onChange={handleChange}
                            required
                            isInvalid={!!errors.currentPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.currentPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            isInvalid={!!errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required
                            isInvalid={!!errors.confirmPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <LoadingButton name="Reset" loading={passwordInformationButton} />
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="form-margin">
              <Card>
                <Card.Body>
                  <Card.Title>Personal Information</Card.Title>
                  <Formik
                    validationSchema={personalInformationSchema}
                    onSubmit={this.updatePersonalInformation}
                    initialValues={personalInformationValues}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="firstName">
                          <Form.Label>FirstName</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="FirstName"
                            onChange={handleChange}
                            required
                            defaultValue={this.props.auth.firstName}
                            isInvalid={!!errors.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="lastName">
                          <Form.Label>LastName</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="LastName"
                            onChange={handleChange}
                            required
                            defaultValue={this.props.auth.lastName}
                            isInvalid={!!errors.lastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            required
                            defaultValue={this.props.auth.phoneNumber}
                            isInvalid={!!errors.phoneNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="address">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Address"
                            onChange={handleChange}
                            required
                            defaultValue={this.props.auth.address}
                            isInvalid={!!errors.address}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.address}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <LoadingButton name="Save" loading={personalInformationButton} />
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="form-margin">
              <Card>
                <Card.Body>
                  <Card.Title>Employment Information</Card.Title>
                  <Formik
                    validationSchema={employeeInformationSchema}
                    onSubmit={this.updateEmploymentInformation}
                    initialValues={employeeInformationValues}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="companyName">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Company Name"
                            onChange={handleChange}
                            required
                            defaultValue={this.props.auth.companyName}
                            isInvalid={!!errors.companyName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.companyName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="companyURL">
                          <Form.Label>Company URL</Form.Label>
                          <Form.Control
                            type="url"
                            placeholder="Company URL"
                            onChange={handleChange}
                            required
                            defaultValue={this.props.auth.companyURL}
                            isInvalid={!!errors.companyURL}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.companyURL}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <LoadingButton name="Save" loading={employmentInformationButton} />
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="form-margin">
              <Card>
                <Card.Body>
                  <Card.Title>Contact Person Information</Card.Title>
                  <Formik
                    validationSchema={contactPersonInformationSchema}
                    onSubmit={this.updateContactPersonInformation}
                    initialValues={contactPersonInformationValues}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="fullName">
                          <Form.Label>Contact Fullname</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Fullname"
                            required
                            defaultValue={this.props.auth.contactPersonFullname}
                            onChange={handleChange}
                            isInvalid={!!errors.fullname}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fullname}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="contactPersonPhoneNumber">
                          <Form.Label>Contact Phone Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            required
                            defaultValue={
                              this.props.auth.contactPersonPhoneNumber
                            }
                            onChange={handleChange}
                            isInvalid={!!errors.contactPersonPhoneNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.contactPersonPhoneNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="contactPersonEmail">
                          <Form.Label>Contact Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            required
                            defaultValue={this.props.auth.contactPersonEmail}
                            onChange={handleChange}
                            isInvalid={!!errors.contactPersonEmail}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.contactPersonEmail}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <LoadingButton name="Save" loading={contactPersonInformationButton} />
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="form-margin">
              <Card>
                <Card.Body>
                  <Card.Title>Salary Information</Card.Title>
                  <Formik
                    validationSchema={salaryInformationSchema}
                    onSubmit={this.updateSalaryInformation}
                    initialValues={salaryInformationValues}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      values,
                      touched,
                      isValid,
                      errors
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="salary">
                          <Form.Label>Salary</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Salary"
                            required
                            defaultValue={this.props.auth.salary}
                            onChange={handleChange}
                            isInvalid={!!errors.salary}
                          />
                        </Form.Group>
                        <LoadingButton name="Save" loading={salaryInformationButton} />
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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

export default connect(
  mapStateToProps,
  null
)(Settings);
