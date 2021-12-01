import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Container,
  Card,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Input from "../components/Input";
// import { useNavigate } from "react-router-dom";
import majorService from "../services/majorService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConfirmDialog from "../components/ConfirmDialog";

const Major = () => {
  const [majors, setMajors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [major, setMajor] = useState({ id: 0, name: "" });
  const [confirmOptions, setConfirmOptions] = useState({
    show: false,
    content: "",
    dataId: 0,
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const frm = useFormik({
    initialValues: {
      id: 0,
      name: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required("Required").min(5, ">=5 Character"),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });
  const showOpenModal = (e, id) => {
    e.preventDefault();

    if (id > 0) {
      majorService.get(id).then((res) => {
        frm.setValues(res.data);
        handleModalShow();
      });
    } else {
      frm.resetForm();
      handleModalShow();
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    majorService.list().then((res) => {
      setMajors(res.data);
    });
  };

  // const handleChangeData = (e) => {
  //   const newData = { ...major };
  //   newData[e.target.name] = e.target.value;
  //   setMajor(newData);
  //   console.log(newData);
  // };

  const handleSave = (data) => {
    if (data.id === 0) {
      majorService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add Major Success");
        }
      });
    } else {
      majorService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Update Major Success");
        }
      });
    }
  };

  const hanhdleDelete = (e, id) => {
    e.preventDefault();
    const selecteMajor = majors.find((x) => x.id === id);
    if (selecteMajor) {
      setConfirmOptions({
        show: true,
        content: `Are you sure you want to delete "${selecteMajor.name}" ? `,
        dataId: id,
      });
    }
  };
  const handleConfirm = (id) => {
    setConfirmOptions({ show: false });
    if (id) {
      majorService.delete(id).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          toast.warning("Delete Success");
        } else {
          toast.error("Delete Failed");
        }
      });
    }
  };
  return (
    <div>
      <Container className="mt-4">
        <Card className="border-primary bt-5px">
          <Card.Header>
            <Row>
              <Col>
                <h3 className="card-title">
                  Major <small className="text-muted">list</small>
                </h3>
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={(e) => showOpenModal(e, 0)}>
                  {" "}
                  <i className="fas fa-plus"></i> Add
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Table bordered hover>
              <thead className="table-primary border-primary">
                <tr>
                  <th style={{ width: "50px" }} className="text-center">
                    #
                  </th>
                  <th>Major Name</th>
                  <th style={{ width: "80px" }} className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {majors.map((major, idx) => (
                  <tr key={major.id}>
                    <th className="text-center">{idx + 1}</th>
                    <td>{major.name}</td>
                    <td className="text-center">
                      <a href="/#" onClick={(e) => showOpenModal(e, major.id)}>
                        <i className="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#" onClick={(e) => hanhdleDelete(e, major.id)}>
                        <i className="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      {/* <!-- Modal --> */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{frm.values.id > 0 ? "Edit" : "New"} Major</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              label="Major name"
              id="txtMajor"
              type="text"
              name="name"
              frmField={frm.getFieldProps("name")}
              err={frm.touched.name && frm.errors.name}
              errMessage={frm.errors.name}
            />
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={frm.handleSubmit}
            disabled={!frm.dirty || !frm.isValid}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modaldialog */}
      <ConfirmDialog options={confirmOptions} onConfirm={handleConfirm} />
    </div>
  );
};

export default Major;
