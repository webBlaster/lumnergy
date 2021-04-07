import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Card } from 'react-bootstrap';

import DefaultHeader from '../components/headers/default.js';
import DefaultFooter from '../components/footers/default.js';
import { getResponseErrors, getApiInstance } from '../utils.js';
import LoadingButton from "../components/loader/loadingbutton.js";
import { connect } from "react-redux";
import { RESPONSE_SUCCESS_MESSAGE, RESPONSE_ERROR_MESSAGE } from "../constants.js";

import { Formik } from 'formik';
let yup = require('yup');

const LumnergyApi = require("lumnergy_api");


class ForgotPassword extends Component {
    state = {
        showSuccessInformation: false,
        loading:false
    };

    resetPassword = forgotPasswordData => {
        let { dispatch } = this.props;
        this.setState({...this.state, loading:true });
        let forgotPasswordInformation = new LumnergyApi.ForgotPasswordInformation.constructFromObject(forgotPasswordData);
        const apiInstance = getApiInstance();
        const callback = (errors, data, response) => {
            const responseErrors = getResponseErrors(errors, response);
            if (responseErrors.length) {
                this.setState({...this.state, loading:false });
                dispatch({type:RESPONSE_ERROR_MESSAGE, payload: responseErrors });
            } else {
                this.setState({...this.state, showSuccessInformation: true, loading:false });
                dispatch({type:RESPONSE_SUCCESS_MESSAGE, payload: response.message });
            }
        }

        apiInstance.accountForgotPasswordPost(forgotPasswordInformation, callback);
    }

    renderForgotPasswordForm = () => {
        const schema = yup.object({
            email: yup.string().email("Email is Invalid").required("Email is required")
        });

        const initialValues = {
            email: ''
        };

        let {loading} = this.state;

        return (
            <Card.Body>
                <Formik validationSchema={schema} onSubmit={this.resetPassword} initialValues={initialValues}>
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
                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" onChange={handleChange} isInvalid={!!errors.email} required />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Link to="/signin" className="nav-link">Sign In</Link>
                                </Form.Group>
                                <LoadingButton name="Reset" loading={loading} />
                            </Form>
                        )
                    }
                </Formik>
            </Card.Body>
        );
    }

    renderSuccessfulRequestInformation = () => {
        return (
            <Card.Body>
                <p>Password reset details has been sent to your registered email.</p>
            </Card.Body>
        );
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column justify-content-between">
                <DefaultHeader />
                <div className="spacer"></div>
                <Card className="page-form-card">
                    {(this.state.showSuccessInformation) ? this.renderSuccessfulRequestInformation() : this.renderForgotPasswordForm()}
                </Card>
                <DefaultFooter />
            </div>
        );
    };
}

const MapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}
export default connect(null, MapDispatchToProps )(ForgotPassword);