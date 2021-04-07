import React from "react";
import { Form, Card } from "react-bootstrap";
import { Formik } from "formik";
import LoadingButton from "../../components/loader/loadingbutton.js";

const EmployeeInformationForm = ({
  auth,
  employeeInformationSchema,
  updateEmploymentInformation,
  employeeInformationValues,
  employeeInformationButton,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Employee Information</Card.Title>
        <Formik
          validationSchema={employeeInformationSchema}
          onSubmit={updateEmploymentInformation}
          initialValues={employeeInformationValues}
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
              <Form.Group controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  onChange={handleChange}
                  defaultValue={auth.companyName}
                  required
                  autoFocus
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
                  defaultValue={auth.companyURL}
                  required
                  isInvalid={!!errors.companyURL}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyURL}
                </Form.Control.Feedback>
              </Form.Group>
              <LoadingButton name="Next" loading={employeeInformationButton} />
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default EmployeeInformationForm;
