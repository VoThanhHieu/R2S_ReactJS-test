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
import InputTwo from "../components/InputTwo";

export const Instructor = () => {
  const [showModal, setShowModal] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [confirmOptions, setConfirmOptions] = useState({
    show: false,
    content: "",
    dataId: 0,
  });
  // const phoneRegExp = `/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/`;
  const formik = useFormik({
    initialValues: {
      id: 0,
      code: "",
      firstName: "",
      lastName: "",
      gender: 1,
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      code: Yup.string().required("Required"),
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

      {/* Modal Instructor*/}

      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id > 0 ? "Edit" : "New"} Instructor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <InputTwo
              type="text"
              label="Code"
              id="txtId"
              name="code"
              placeholder="Instructor Code"
              frmField={formik.getFieldProps("code")}
              err={formik.touched.code && formik.errors.code}
              errMessage={formik.errors.code}
            />
            <InputTwo
              label="Full Name"
              type="text"
              rows="2"
              id="txtLastName"
              id2="txtFirstName"
              placeHolder="Last name"
              placeHolder2="First Name"
              name="lastName"
              name2="firstName"
              frmField={formik.getFieldProps("lastName")}
              err={formik.touched.lastName && formik.errors.lastName}
              errMessage={formik.errors.lastName}
              frmField2={formik.getFieldProps("firstName")}
              err2={formik.touched.firstName && formik.errors.firstName}
              errMessage2={formik.errors.firstName}
            />
            <InputTwo
              type="radio"
              label="Gender"
              name="gender"
              id="radMale"
              frmField={formik.getFieldProps("gender")}
              err={formik.touched.gender && formik.errors.gender}
              errMessage={formik.errors.gender}
              defaultChecked={parseInt(formik.values.gender)}
            />
            {/* <div>Picked: {formik.values.gender}</div> */}
            <InputTwo
              type="tel"
              label="Phone"
              id="txtPhone"
              name="phone"
              placeholder="Phone number"
              frmField={formik.getFieldProps("phone")}
              err={formik.touched.phone && formik.errors.phone}
              errMessage={formik.errors.phone}
            />
            <InputTwo
              type="email"
              label="Email"
              id="txtEmail"
              name="email"
              placeholder="Email address"
              frmField={formik.getFieldProps("email")}
              err={formik.touched.email && formik.errors.email}
              errMessage={formik.errors.email}
            />
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal confirm delete                 */}
      <ConfirmDialog options={confirmOptions} onConfirm={handleConfirm} />
    </>
  );
};
