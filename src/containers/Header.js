import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "./../store/actions";
import { useTranslation } from "react-i18next";
import i18n from "./../i18n";
const Header = (props) => {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.auth.currentUser);
  const [flag, setFlag] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    setFlag(lang === "en" ? "vn" : "us");
  }, []);
  const handleChangLanguage = (e) => {
    e.preventDefault();
    let lang = localStorage.getItem("lang");
    lang = lang === "en" ? "vi" : "en";
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    setFlag(lang === "en" ? "vn" : "us");
  };

  const handleLogoutAction = (e) => {
    e.preventDefault();
    dispatch({
      type: ActionTypes.LOGOUT_USER,
    });
  };
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            {t("appName")}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/major">
                {t("major")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/instructor">
                {t("instructor")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/student">
                {t("student")}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/#">welcome to {userInfo.fullName}</Nav.Link>
              <Nav.Link as={Link} to="/#" onClick={handleLogoutAction}>
                <i className="fas fa-sign-out-alt"></i>
              </Nav.Link>
              <Nav.Link as={Link} to="/#" onClick={handleChangLanguage}>
                {/* <i className="flag-icon flag-icon-vn"></i> */}
                <i className={`flag-icon flag-icon-${flag}`}></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
