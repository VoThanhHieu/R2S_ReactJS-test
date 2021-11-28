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

const Major = () => {
  const [majors, setMajors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);
  const [major, setMajor] = useState({ id: 0, name: "" });
  const [seletedId, setSeletedId] = useState({ id: 0 });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const handleConfirmClose = () => setshowConfirm(false);
  const handleConfirmOpen = () => setshowConfirm(true);

  const showOpenModal = (e, id) => {
    e.preventDefault();

    if (id > 0) {
      majorService.get(id).then((res) => {
        setMajor(res.data);
        handleModalShow();
      });
    } else {
      setMajor({ id: 0, name: "" });
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

  const handleChangeData = (e) => {
    const newData = { ...major };
    newData[e.target.name] = e.target.value;
    setMajor(newData);
    console.log(newData);
  };

  const handleSave = () => {
    if (major.id === 0) {
      majorService.add(major).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add Major Success");
        }
      });
    } else {
      majorService.update(major.id, major).then((res) => {
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
    setSeletedId(id);
    handleConfirmOpen();
    // majorService.delete(id).then((res) => {
    //   if (res.errorCode === 0) {
    //     loadData();
    //     toast.warning("Delete Success");
    //   } else {
    //     toast.error("Delete Failed");
    //   }
    // });
  };
  const handleOk = () => {
    majorService.delete(seletedId).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warning("Delete Success");
      } else {
        toast.error("Delete Failed");
      }
    });
    handleConfirmClose();
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
          <Modal.Title>{major.id > 0 ? "Edit" : "New"} Major</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              defaultValue={major.name}
              label="Major name"
              id="txtMajor"
              type="text"
              name="name"
              onChange={handleChangeData}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modaldialog */}

      <Modal
        show={showConfirm}
        onHide={handleConfirmClose}
        className="text-center"
      >
        <Modal.Body>
          {" "}
          <p>Do you agree to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Major;
