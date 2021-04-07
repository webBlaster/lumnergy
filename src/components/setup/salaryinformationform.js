import React from "react";
import { Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import LoadingButton from "../../components/loader/loadingbutton.js";
import DesktopViewButtons from "../../components/setup/desktopviewbuttons.js";
const SalaryInformationForm = ({
    auth,
    salaryInformationSchema,
    updateSalaryInformation,
    salaryInformationValues,
    salaryInformationButton
}) => {
  return (
              <Card>
                <Card.Body>
                  <Card.Title>Salary Information</Card.Title>
                  <Formik
                    validationSchema={salaryInformationSchema}
                    onSubmit={updateSalaryInformation}
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
                            autoFocus
                            onChange={handleChange}
                            defaultValue={auth.salary}
                          />
                        </Form.Group>
                        <span className="mobile-setup-form-container">
                        <LoadingButton
                          name="Next"
                          loading={salaryInformationButton}
                        />
                        <Link to='/contactpersoninformation' className="btn btn-primary mt-2 btn-block">Previous</Link>
                        </span>
                        <DesktopViewButtons route={"/contactpersoninformation"} />
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
  );
};

export default SalaryInformationForm;
