import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Card,
  Table,
} from "react-bootstrap";
import instructorsService from "../services/instructorService";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/ConfirmDialog";
import * as Yup from "yup";
import { useFormik } from "formik";

export const Instructor2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [confirmOptions, setConfirmOptions] = useState({
    show: false,
    content: "",
    dataId: 0,
  });
  // const phoneRegExp =
  // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      id: 0,
      code: "",
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      code: Yup.string().required(),
      firstName: Yup.string()
        .min(2, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),
      lastName: Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),
      gender: Yup.number().required(),
      phone: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(8)
        .required("A phone number is required"),
      // phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });
  // const [instructor, setInstructor] = useState({
  //   id: "",
  //   code: "",
  //   firstName: "",
  //   lastName: "",
  //   gender: "",
  //   phone: "",
  //   email: "",
  // });
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    instructorsService.list().then((res) => {
      setInstructors(res.data);
    });
  };

  const showOpenModal = (e, id) => {
    e.preventDefault();
    if (id > 0) {
      instructorsService.get(id).then((res) => {
        formik.setValues(res.data);
        handleModalShow();
        console.log(id);
      });
    } else {
      console.log(id);
      formik.resetForm();
      handleModalShow();
    }
  };

  // const handleChangeData = (e) => {
  //   const newData = { ...instructor };
  //   newData[e.target.name] = e.target.value;
  //   setInstructor(newData);
  //   console.log(newData);
  // };

  const handleSave = (data) => {
    if (data.id === 0) {
      instructorsService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add Success");
        }
      });
    } else {
      instructorsService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Update Success");
        }
      });
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    const selecteIntrustor = instructors.find((x) => x.id === id);
    setConfirmOptions({
      show: true,
      content: `Are you sure you want to delete "${selecteIntrustor.lastName} ${selecteIntrustor.firstName}" ?`,
      dataId: id,
    });
  };
  const handleConfirm = (id) => {
    setConfirmOptions({ show: false });
    if (id) {
      instructorsService.delete(id).then((res) => {
        loadData();
        toast.warning("Delete Success");
      });
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Card className="border-primary bt-5px">
          <Card.Header>
            <Row>
              <Col>
                <h3 className="card-title">
                  Instructor <small className="text-muted">list</small>
                </h3>
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={(e) => showOpenModal(e, 0)}>
                  <i className="fas fa-plus"></i> Add
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Table bordered hover responsive="md">
              <thead className="table-primary border-primary">
                <tr>
                  <th style={{ width: "50px" }} className="text-center">
                    #
                  </th>
                  <th>Instructor Id</th>
                  <th>Full name</th>
                  <th style={{ width: "50px" }}>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th style={{ width: "80px" }}></th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((instructor, index) => (
                  <tr key={instructor.id}>
                    <th className="text-center">{index + 1}</th>
                    <td>{instructor.code}</td>
                    <td>
                      {instructor.lastName} {instructor.firstName}
                    </td>
                    <td className="text-center">
                      {instructor.gender === 0 ? (
                        <i className="fas fa-female text-warning fa-lg"></i>
                      ) : (
                        <i className="fas fa-male text-primary fa-lg"></i>
                      )}
                    </td>
                    <td>{instructor.phone}</td>
                    <td>{instructor.email}</td>
                    <td className="text-center">
                      <a
                        href="/#"
                        onClick={(e) => showOpenModal(e, instructor.id)}
                      >
                        <i className="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#">
                        <i
                          className="fas fa-trash-alt text-danger"
                          onClick={(e) => handleDelete(e, instructor.id)}
                        ></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal */}

      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Row className="mb-3">
              <Col sm={4} lg={2} required className="col-form-label">
                <label htmlFor="txtId">Code</label>
              </Col>
              <Col lg={5}>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  name="code"
                  type="text"
                  className={`form-control ${
                    formik.touched.code && formik.errors.code
                      ? "is-invalid"
                      : ""
                  }`}
                  id="txtId"
                  placeholder="Instructor Code"
                />
                {formik.touched.code && formik.errors.code ? (
                  <div className="invalid-feedback">{formik.errors.code}</div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={12} lg={2} required className="col-form-label">
                <label htmlFor="txtLastName">Full name</label>
              </Col>
              <Col sm={6} lg={5} required className="col-form-labe">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  name="lastName"
                  type="text"
                  className={`form-control ${
                    formik.touched.lastName && formik.errors.lastName
                      ? "is-invalid"
                      : ""
                  }`}
                  id="txtLastName"
                  placeholder="Last name"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="invalid-feedback">
                    {formik.errors.lastName}
                  </div>
                ) : (
                  ""
                )}
              </Col>
              <Col sm={6} lg={5} required className="col-form-label">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  name="firstName"
                  type="text"
                  className={`form-control ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "is-invalid"
                      : ""
                  }`}
                  id="txtFirstName"
                  placeholder="First name"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="invalid-feedback">
                    {formik.errors.firstName}
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={2} required className="col-form-label">
                <label htmlFor="radMale">Gender</label>
              </Col>
              <Col className="col-form-label">
                <div className="form-check form-check-inline">
                  <input
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender === 1}
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="radMale"
                    value="1"
                  />
                  <label className="form-check-label" htmlFor="radMale">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender === 0}
                    className="form-check-input"
                    type="radio"
                    id="radFeMale"
                    name="gender"
                    value="0"
                  />
                  <label className="form-check-label" htmlFor="radFeMale">
                    Female
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4} lg={2} required className="col-form-label">
                <label htmlFor="txtPhone">Phone</label>
              </Col>
              <Col lg={5}>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  name="phone"
                  type="tel"
                  className={`form-control ${
                    formik.touched.phone && formik.errors.phone
                      ? "is-invalid"
                      : ""
                  }`}
                  id="txtPhone"
                  placeholder="Phone number"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4} lg={2} required className="col-form-label">
                <label htmlFor="txtPhone">Email</label>
              </Col>
              <Col lg={5}>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  name="email"
                  type="email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  id="txtEmail"
                  placeholder="Email address"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal confirm delete                 */}
      <ConfirmDialog options={confirmOptions} onConfirm={handleConfirm} />
    </>
  );
};
