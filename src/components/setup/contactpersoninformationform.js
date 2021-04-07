import React from "react";
import { Form, Card } from "react-bootstrap";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import LoadingButton from "../../components/loader/loadingbutton.js";
import DesktopViewButtons from "../../components/setup/desktopviewbuttons.js";

const ContactPersonInformationForm = ({
  auth,
  contactPersonInformationSchema,
  updateContactPersonInformation,
  contactPersonInformationValues,
  contactPersonInformationButton,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Contact Person Information</Card.Title>
        <Formik
          validationSchema={contactPersonInformationSchema}
          onSubmit={updateContactPersonInformation}
          initialValues={contactPersonInformationValues}
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
              <Form.Group controlId="contactPersonFullname">
                <Form.Label>Contact Person Fullname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact Person Fullname"
                  required
                  autoFocus
                  onChange={handleChange}
                  isInvalid={!!errors.contactPersonFullname}
                  defaultValue={auth.contactPersonFullname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="contactPersonPhoneNumber">
                <Form.Label>Contact Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  required
                  autoFocus
                  onChange={handleChange}
                  isInvalid={!!errors.contactPersonPhoneNumber}
                  defaultValue={auth.contactPersonPhoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactPersonPhoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="contactPersonEmail">
                <Form.Label>Contact Person Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  required
                  autoFocus
                  onChange={handleChange}
                  isInvalid={!!errors.contactPersonEmail}
                  defaultValue={auth.contactPersonEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactPersonEmail}
                </Form.Control.Feedback>
              </Form.Group>
              <span className="mobile-setup-form-container">
                <LoadingButton
                  name="Next"
                  loading={contactPersonInformationButton}
                />
                <Link
                  to="/financialassistancesetup"
                  className="btn btn-primary mt-2 btn-block"
                >
                  Previous
                </Link>
              </span>

              <DesktopViewButtons route={"/financialassistancesetup"} />
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default ContactPersonInformationForm;
