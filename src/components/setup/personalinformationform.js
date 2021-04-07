import React from "react";
import { Form, Card } from "react-bootstrap";
import { Formik } from "formik";
import LoadingButton from "../../components/loader/loadingbutton.js";

const PersonalInformationForm = ({
  personalInformationSchema,
  updatePersonalInformation,
  personalInformationValues,
  personalInformationButton,
  auth
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Personal Information</Card.Title>
        <Formik
          validationSchema={personalInformationSchema}
          onSubmit={updatePersonalInformation}
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
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="FirstName"
                  onChange={handleChange}
                  required
                  autoFocus
                  defaultValue={auth.firstName}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="LastName"
                  onChange={handleChange}
                  required
                  defaultValue={auth.lastName}
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
                  defaultValue={auth.phoneNumber}
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
                  defaultValue={auth.address}
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
  );
};

export default PersonalInformationForm;
