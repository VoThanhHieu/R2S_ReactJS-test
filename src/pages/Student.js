import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, Row, Button } from "react-bootstrap";
import studentService from "../services/studentService";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast } from "react-toastify";
import majorService from "./../services/majorService";
import { useTranslation } from "react-i18next";
import Ulits from "./../helpers/utils";
import api from "./../services/api";

const Student = () => {
  const defaultImage = "https://restfulapi.dnd-group.net/public/photo-icon.png";
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [majors, setMajors] = useState([]);
  const [confirmOptions, setConfirmOptions] = useState({
    dataId: 0,
    show: false,
    content: "",
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const formik = useFormik({
    initialValues: {
      id: 0,
      stuId: "",
      firstName: "",
      lastName: "",
      gender: 1,
      phone: "",
      email: "",
      majorId: 0,
      avatar: undefined,
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      majorId: Yup.number().required(),
      stuId: Yup.string().required(),
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
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    studentService.list().then((res) => {
      setStudents(res.data);
    });
    majorService.list().then((res) => {
      setMajors(res.data);
    });
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    const selecteStudent = students.find((x) => x.id === id);
    if (selecteStudent) {
      setConfirmOptions({
        show: true,
        dataId: id,
        content: `Are you sure you want to delete "${selecteStudent.lastName} ${selecteStudent.firstName} " ? `,
      });
    }
  };
  const handleSave = (data) => {
    if (data.id > 0) {
      studentService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          loadData(res.data);
          handleModalClose();
          toast.success("Update student success");
        }
      });
    } else {
      studentService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData(res.data);
          handleModalClose();
          toast.success("Add student success");
        }
      });
    }
  };
  const handleSubmit = (id) => {
    setConfirmOptions({ show: false });
    if (id) {
      studentService.delete(id).then((res) => {
        if (res.errorCode === 0) {
          toast.warning("Delete Success");
        } else {
          toast.warning("Delete Faild");
        }
        loadData(res.data);
      });
    }
  };
  const showEditPage = (e, id) => {
    e.preventDefault();
    if (id > 0) {
      const avatarReq = studentService.getAvatarBase64(id);
      const studentReq = studentService.get(id);
      api.promise([avatarReq, studentReq]).then(
        api.spread((...res) => {
          if (res[0].errorCode === 0) {
            setImagePreview(res[0].data.data);
          } else setImagePreview(defaultImage);
          formik.setValues(res[1].data);
          handleModalShow();
        })
      );

      const majorSelect = majors.find((x) => x.id === id);
      console.log(majorSelect);
      // studentService.get(id).then((res) => {
      //   formik.setValues(res.data);
      //   handleModalShow();
      // });
      // studentService.getAvatarBase64(id).then((res) => {
      //   if (res.errorCode === 0) {
      //     setImagePreview(res.data.data);
      //   } else setImagePreview(defaultImage);
      // });
    } else {
      formik.resetForm();
      setImagePreview(defaultImage);
      handleModalShow();
    }
  };
  const inputFieldRef = useRef();
  const handleChaneImage = (e) => {
    if (e.target.files && e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("avatar", e.target.files[0]);
  };
  const downloadImage = () => {
    studentService.downloadAvatar(formik.values.id).then((res) => {
      if (res.size > 0)
        return Ulits.downloadFile(`${formik.values.stuId}.zip`, res);
      else toast.warning("No avatar to download");
    });
  };
  return (
    <>
      <div className="container mt-4">
        <div className="card border-primary bt-5px">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Student <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => showEditPage(e, 0)}
                >
                  <i className="fas fa-plus"></i> {t("add")}
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover mb-0 border-primary">
                <thead className="table-primary border-primary">
                  <tr>
                    <th style={{ width: "50px" }} className="text-center">
                      #
                    </th>
                    <th>Student Id</th>
                    <th>{t("fullname")}</th>
                    <th style={{ width: "50px" }}>{t("gender")}</th>
                    <th>{t("phone")}</th>
                    <th>Email</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <th className="text-center">{index + 1}</th>
                      <td>{student.stuId}</td>
                      <td>
                        {student.lastName} {student.firstName}
                      </td>
                      {student.gender === 0 ? (
                        <td className="text-center">
                          <i className="fas fa-male text-primary fa-lg"></i>
                        </td>
                      ) : (
                        <td className="text-center">
                          <i className="fas fa-female text-warning fa-lg"></i>
                        </td>
                      )}
                      <td>{student.phone}</td>
                      <td>{student.email}</td>
                      <td className="text-center">
                        <a
                          href="/#"
                          onClick={(e) => showEditPage(e, student.id)}
                        >
                          <i className="fas fa-edit text-primary"></i>
                        </a>
                        <a
                          href="/#"
                          onClick={(e, id) => handleDelete(e, student.id)}
                        >
                          <i className="fas fa-trash-alt text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}

      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id > 0 ? "Edit" : "New"} Student
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12} lg={4}>
              <img
                src={imagePreview}
                alt=""
                className="img-thumbnail rounded-circle border-primary d-block"
              />
              <input
                type="file"
                ref={inputFieldRef}
                className="d-none"
                onChange={handleChaneImage}
              />
              <div className="mt-3 d-flex justify-content-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => inputFieldRef.current.click()}
                >
                  Change
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={downloadImage}
                  // onClick={() => inputFieldRef.current.click()}
                >
                  Download
                </Button>
              </div>
            </Col>
            <Col>
              <form>
                <Row className="mb-3">
                  <Col sm={4} lg={2} required className="col-form-label">
                    <label htmlFor="txtId">Code</label>
                  </Col>
                  <Col lg={5}>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.stuId}
                      name="stuId"
                      type="text"
                      className={`form-control ${
                        formik.touched.stuId && formik.errors.stuId
                          ? "is-invalid"
                          : ""
                      }`}
                      id="txtId"
                      placeholder="Student Code"
                    />
                    {formik.errors.stuId ? (
                      <div className="invalid-feedback">
                        {formik.errors.stuId}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={12} lg={2} required className="col-form-label">
                    <label htmlFor="txtLastName">{t("fullname")}</label>
                  </Col>
                  <Col sm={6} lg={5} required className="col-form-label">
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
                    {formik.errors.lastName ? (
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
                    {formik.errors.firstName ? (
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
                    <label htmlFor="radMale"> {t("gender")} </label>
                  </Col>
                  <Col className="col-form-label">
                    <div className="form-check form-check-inline">
                      <input
                        onChange={formik.handleChange}
                        defaultChecked={formik.values.gender === 0}
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="radMale"
                        value="0"
                      />
                      <label className="form-check-label" htmlFor="radMale">
                        {t("male")}
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        onChange={formik.handleChange}
                        defaultChecked={formik.values.gender === 1}
                        className="form-check-input"
                        type="radio"
                        id="radFeMale"
                        name="gender"
                        value="1"
                      />
                      <label className="form-check-label" htmlFor="radFeMale">
                        {t("female")}
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4} lg={2} required className="col-form-label">
                    <label htmlFor="txtPhone">{t("phone")}</label>
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
                      placeholder={t("phone")}
                    />
                    {formik.errors.phone ? (
                      <div className="invalid-feedback">
                        {formik.errors.phone}
                      </div>
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
                    {formik.errors.email ? (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={4} lg={2} required className="col-form-label">
                    <label htmlFor="txtPhone">{t("major")}</label>
                  </Col>
                  <Col lg={5}>
                    <select
                      name="majorId"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.majorId}
                    >
                      {majors.map((major, index) => (
                        <option key={index} value={major.id}>
                          {major.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleModalClose}>
            {t("close")}
          </Button>
          <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}
          >
            {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmDialog options={confirmOptions} onConfirm={handleSubmit} />
    </>
  );
};

export default Student;
