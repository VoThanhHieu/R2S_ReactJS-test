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

export const Instructor = () => {
  const [showModal, setShowModal] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [showConfirm, setshowConfirm] = useState(false);
  const [deleteId, setdeleteId] = useState("");
  const [instructor, setInstructor] = useState({
    id: "",
    code: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
  });
  const handleConfirmClose = () => setshowConfirm(false);
  const handleConfirmOpen = () => setshowConfirm(true);
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
        setInstructor(res.data);
        handleModalShow();
      });
    } else {
      setInstructor({
        id: 0,
        code: "",
        firstName: "",
        lastName: "",
        gender: 1,
        phone: "",
        email: "",
      });
      handleModalShow();
    }
  };

  const handleChangeData = (e) => {
    const newData = { ...instructor };
    newData[e.target.name] = e.target.value;
    setInstructor(newData);
    console.log(newData);
  };

  const handleSave = () => {
    if (instructor.id === 0) {
      instructorsService.add(instructor).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add Success");
        }
      });
    } else {
      instructorsService.update(instructor.id, instructor).then((res) => {
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
    setdeleteId(id);
    handleConfirmOpen();
  };
  const handOk = () => {
    instructorsService.delete(deleteId).then((res) => {
      loadData();
      toast.warning("Delete Success");
    });
    handleConfirmClose();
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
          <Modal.Title>New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Row className="mb-3">
              <Col sm={4} lg={2} required className="col-form-label">
                {" "}
                <label htmlFor="txtId">Student Id</label>
              </Col>
              <Col lg={5}>
                <input
                  onChange={handleChangeData}
                  defaultValue={instructor.code}
                  name="code"
                  type="text"
                  className="form-control"
                  id="txtId"
                  placeholder="Student Id"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={12} lg={2} required className="col-form-label">
                <label htmlFor="txtLastName">Full name</label>
              </Col>
              <Col sm={6} lg={5} required className="col-form-label">
                <input
                  onChange={handleChangeData}
                  name="lastName"
                  defaultValue={instructor.lastName}
                  type="text"
                  className="form-control"
                  id="txtLastName"
                  placeholder="Last name"
                />
              </Col>
              <Col sm={6} lg={5} required className="col-form-label">
                <input
                  onChange={handleChangeData}
                  name="firstName"
                  defaultValue={instructor.firstName}
                  type="text"
                  className="form-control"
                  id="txtFirstName"
                  placeholder="First name"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={2} required className="col-form-label">
                <label htmlFor="radMale">Gender</label>
              </Col>
              <Col className="col-form-label">
                <div className="form-check form-check-inline">
                  <input
                    onChange={handleChangeData}
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="radMale"
                    value="1"
                    defaultChecked={instructor.gender === 1}
                  />
                  <label className="form-check-label" htmlFor="radMale">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    onChange={handleChangeData}
                    className="form-check-input"
                    type="radio"
                    id="radFeMale"
                    name="gender"
                    value="0"
                    defaultChecked={instructor.gender === 0}
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
                  onChange={handleChangeData}
                  name="phone"
                  defaultValue={instructor.phone}
                  type="tel"
                  className="form-control"
                  id="txtPhone"
                  placeholder="Phone number"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col sm={4} lg={2} required className="col-form-label">
                <label htmlFor="txtPhone">Email</label>
              </Col>
              <Col lg={5}>
                <input
                  onChange={handleChangeData}
                  name="email"
                  defaultValue={instructor.email}
                  type="email"
                  className="form-control"
                  id="txtEmail"
                  placeholder="Email address"
                />
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal confirm delete                 */}
      <Modal
        show={showConfirm}
        onHide={handleConfirmClose}
        className="text-center"
      >
        <Modal.Body>
          {" "}
          <p>Do you agree to delete?</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleConfirmClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
