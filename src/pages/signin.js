import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import LoadingButton from "../components/loader/loadingbutton.js";
import DefaultHeader from "../components/headers/default.js";
import DefaultFooter from "../components/footers/default.js";
import { signInUser } from "../actions/auth.js";

import { Formik } from "formik";

let yup = require("yup");

const lumnergyApi = require("lumnergy_api");
const apiInstance = new lumnergyApi.AccountApi();

class SignIn extends Component {
  state = {
    loading:false
  };

  signIn = signInInformation => {
    let {state} = this;
    this.setState({...state, loading:true});
    let customerLoginInformation = new lumnergyApi.CustomerLoginInformation.constructFromObject(
      signInInformation
    );
    let callback = (errors, data, response) => {
      if (errors) {
        if (response && response.body) {
          if (response.body.errors) {
            this.setState({...state, loading:false });
          } else {
            this.setState({...state, loading:false });
          }
        } else {
          this.setState({...state, loading:false });
        }
      } else {
        this.props.history.push("/dashboard");
      }
    };

    signInUser(apiInstance, customerLoginInformation, callback)(
      this.props.dispatch
    );
  };

  render() {
    const schema = yup.object({
      email: yup.string().email("Invalid Email").required("Email is required"),
      password: yup.string().required("Password is required")
    });

    const initialValues = {
      email: "",
      password: ""
    };
    let {loading} =this.state;
    return (
      <div className="h-100 d-flex flex-column justify-content-between">
        <DefaultHeader />
        <div className="spacer"></div>
        <Card className="page-form-card">
          <Card.Body>
            <Formik
              validationSchema={schema}
              onSubmit={this.signIn}
              initialValues={initialValues}
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
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Link className="nav-link" to="/forgotpassword">
                      Forgot Password?
                    </Link>
                  </Form.Group>
                  <LoadingButton name="Sign In" loading={loading} />
                  <Button variant="link" block>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      
        <DefaultFooter className="static-footer" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SignIn));
