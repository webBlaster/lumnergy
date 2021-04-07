import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from "../components/footers/default.js";
import { getResponseErrors, getApiInstance } from "../utils.js";
import LoadingButton from "../components/loader/loadingbutton.js";
import { connect } from "react-redux";
import { RESPONSE_ERROR_MESSAGE } from "../constants.js";

import { Formik } from "formik";
let yup = require("yup");

const LumnergyApi = require("lumnergy_api");

class ResetPassword extends Component {
  state = {
    loading: false,
  };

  resetPassword = (passwordResetData) => {
    let { dispatch } = this.props;
    this.setState({ ...this.state, loading: true });
    let passwordResetInformation = new LumnergyApi.PasswordResetInformation.constructFromObject(
      passwordResetData
    );
    const apiInstance = getApiInstance();
    const callback = (errors, data, response) => {
      const responseErrors = getResponseErrors(errors, response);
      if (responseErrors.length) {
        this.setState({ ...this.state, loading: false });
        dispatch({ type: RESPONSE_ERROR_MESSAGE, payload: responseErrors });
      } else {
        this.setState({ ...this.state, loading: false });
        this.props.history.push("/signin");
      }
    };

    const { authToken } = this.props.match.params;
    apiInstance.accountPasswordResetAuthTokenPost(
      authToken,
      passwordResetInformation,
      callback
    );
  };

  render() {
    const schema = yup.object({
      password: yup.string().required("Password is required"),
      confirmPassword: yup.string().required("Confirm Password is required"),
    });

    const initialValues = {
      password: "",
      confirmPassword: "",
    };
    let { loading } = this.state;
    return (
      <div className="h-100 d-flex flex-column justify-content-between">
        <DefaultHeader />
        <div className="spacer"></div>
        <Card className="page-form-card">
          <Card.Body>
            <Formik
              validationSchema={schema}
              onSubmit={this.resetPassword}
              initialValues={initialValues}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter confirm password"
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Link to="/signin" className="nav-link">
                      Sign In
                    </Link>
                  </Form.Group>
                  <LoadingButton name="Reset" loading={loading} />
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>

        <DefaultFooter />
      </div>
    );
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(null, MapDispatchToProps)(withRouter(ResetPassword));
