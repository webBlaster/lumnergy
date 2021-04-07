import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import LoadingButton from "../components/loader/loadingbutton.js";
import DefaultHeader from '../components/headers/default.js';
import DefaultFooter from '../components/footers/default.js';
import { registerUser } from '../actions/auth.js';

let yup = require('yup');

const lumnergyApi = require('lumnergy_api');
const apiInstance = new lumnergyApi.AccountApi();


class SignUp extends Component {
    state = {
        loading:false
    };

    signUp = (signUpInformation) => {
        let {state} = this;
        this.setState({...state, loading:true});
        let customer = new lumnergyApi.Customer.constructFromObject(signUpInformation);
        let callback = (errors, data, response) => {
            if (errors) {
                if (response) {
                    if (response.body.errors) {
                        this.setState({...state, loading:false});
                    } else {
                        this.setState({...state, loading:false });
                    }
                } else {
                    this.setState({ ...state, loading:false });
                }
            } else {
                this.props.history.push('/setup');
            }
        }

        registerUser(apiInstance, customer, callback)(this.props.dispatch);
    }

    render() {
        const phoneNumberRegex = /^\+234[0-9]{10}$/;
        const schema = yup.object({
            firstName: yup.string().required("First Name is required"),
            lastName: yup.string().required("Last Name is required"),
            email: yup.string().email("Invalid Email").required("Email is required"),
            phoneNumber: yup.string().max(14).min(14).matches(phoneNumberRegex, "Phone Number Format is Invalid").required("Phone Number is required"),
            password: yup.string().required("Password is required"),
            confirmPassword: yup.string().required("Confirm Password is required"),
        });

        const initialValues = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        };

        let { loading } = this.state;

        return (
            <div className="h-100 d-flex flex-column justify-content-between">
                <DefaultHeader />
                <div className="spacer"></div>
                <Card className="page-form-card">
                    <Card.Body>
                        <Formik validationSchema={schema} onSubmit={this.signUp} initialValues={initialValues}>
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" name="firstName" required onChange={handleChange} isInvalid={!!errors.firstName}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" name="lastName" required onChange={handleChange} isInvalid={errors.lastName}/>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter Email" required isInvalid={errors.email} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="phoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" name="phoneNumber" onChange={handleChange} placeholder="Enter Phone Number" required isInvalid={errors.phoneNumber} />
                                        <Form.Text className="text-muted">Phone number must be of format +2348000000000</Form.Text>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phoneNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" required isInvalid={errors.password} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" required isInvalid={errors.confirmPassword} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <LoadingButton name="Sign Up" loading={loading} />
                                    <Button variant="link" block><Link to="/signin">Sign In</Link></Button>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
                <DefaultFooter />
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
