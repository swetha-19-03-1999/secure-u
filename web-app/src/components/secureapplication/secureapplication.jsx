import "./secureapplication.css";
import logo from "../Images/Logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdDashboard } from "react-icons/md";
import { CiSettings, CiLogin, CiSearch } from "react-icons/ci";
import { FaCircleInfo } from "react-icons/fa6";
import { FaRegUserCircle, FaCar, FaHandsHelping } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoNotifications } from "react-icons/io5";
import { Button, Image, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Home from "../home/home";
import CommunityPage from "../community/community";
import { Outlet } from "react-router-dom";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { TbAlertSquareFilled } from "react-icons/tb";
import { useState } from "react";

function SettingComponent({ middleContent }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onLogout() {
        localStorage.removeItem("userid");
        navigate("/login");
    }

    const onLogoutClick = () => {
        localStorage.removeItem("userid");
        navigate("/login");
        handleClose();
    };

    return (
        <Container fluid className="app-container ">
            <Row>
                <Col>
                    <div className="header-container">
                        <div className=" brand-logo" style={{ width: 210 }}>
                            {/* <div className='col'> */}
                            <img src={logo} alt="" className="img_logo" />
                            {/* </div> */}

                            {/* <div className='col d-none d-md-block'> */}
                            <p className="m-0  d-none d-md-block">
                                Secure- <span>U</span>
                            </p>
                            {/* </div> */}
                        </div>

                        <div className="setting_main ">
                            <div style={{flex: 1}}>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <CiSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                        aria-label="Text input with checkbox"
                                        className="search-bar"
                                    />
                                </InputGroup>
                            </div>
                            <div className="d-flex align-items-center ">
                                <IoNotifications className="side_nav_icon ms-3 me-3" />
                                <Link to="/profile">
                                    <Image
                                        height={40}
                                        width={40}
                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                        roundedCircle
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="main-page d-flex">
                <Col xs={3} className="side-navigation">
                    <div className="Icons">
                        <Link to="/home" className="row_1">
                            <div className="col_1 ">
                                <MdDashboard className="side_nav_icon" />
                            </div>

                            <div className="col_1">
                                <p>Dashboard</p>
                            </div>
                        </Link>

                        {/* //alerts page is not required so commenting these code
                        <Link to="/alerts" className='row_1'>
                            <div className='col_1'>
                                <TbAlertSquareFilled className='side_nav_icon' />
                            </div>

                            <div className='col_1'>
                                <p>Alerts Page</p>
                            </div>
                        </Link> */}

                        <Link to="/community" className="row_1" type="button">
                            <div className="col_1">
                                <FaRegUserCircle className="side_nav_icon" />
                            </div>

                            <div className="col_1">
                                <p>Community Page</p>
                            </div>
                        </Link>

                        <Link to="/safezones" className="row_1">
                            <div className="col_1">
                                <AiFillSafetyCertificate className="side_nav_icon" />
                            </div>

                            <div className="col_1">
                                <p>Safe Zone</p>
                            </div>
                        </Link>

                        <Link to="/wellbeing" className="row_1">
                            <div className="col_1">
                                <FaHandsHelping className="side_nav_icon" />
                            </div>

                            <div className="col_1">
                                <p>Wellbeing Page</p>
                            </div>
                        </Link>
                    </div>

                    <div className="settings">
                        <Link to="/settings" className="row_1">
                            <div className="col_1 ">
                                <CiSettings className="side_nav_icon" />
                            </div>

                            <div className="col_1">
                                <p>Settings</p>
                            </div>
                        </Link>

                        <div
                            className="row_1 cian-cls"
                            onClick={handleShow}
                            type="button"
                        >
                            <div className="col_1 ">
                                <CiLogin className="side_nav_icon" />
                            </div>

                            <div className="col_1">
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="main-container">
                    <div className="full-height-cls">
                        <Outlet />
                    </div>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#3fb6d3" }}>
                        {" "}
                        <FaCircleInfo /> Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want logout</Modal.Body>
                <Modal.Footer>
                    <Button className="butt me-2 ms-5" onClick={handleClose}>
                        No
                    </Button>
                    <Button className="butt" onClick={onLogoutClick}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
export default SettingComponent;
