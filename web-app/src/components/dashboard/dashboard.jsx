import "./dashboard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import MedicalEmergency from "./cards/medicalemergency";
import SosEmergency from "./cards/sosemergency";
import ReportIncident from "./cards/reportincident";
import SosEmergencyMiniCard from "./cards/sosminicard";
import MedicalEmergencyMini from "./cards/medicalminicard";
import ReportIncidentMiniCard from "./cards/reportmini";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ToastMessageComponent from "../toast/toastmessage";
import MiniCards from "./cards/MiniCards";

const apiSatusCodes = {
    LOADING: "loading",
    FAILED: "fail",
    SUCCESS: "success",
};

const modalStyle = {
    // maxHeight: '90vh',
    overflow: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "10px"
    // p: 4,
  };

const DashBoardComponent = () => {
    const [alerts, setAlerts] = useState([]);
    const [updateUi, setUpdateUi] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiSatusCodes.LOADING);
    const [showToast, setShowToast] = useState(false); //this handles the toast visiblity
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

    const [selectedAlert, setSelectedAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const onViewClick = (alert) => {
        setSelectedAlert(alert);
        setShowModal(true);
    };

    const onAlertAcceptClick = (al, userId, alertStatus) => {
        if (localStorage.getItem("userid")) {
            // axios.get(`http://localhost:3001/security-alerts/${al.alert_id}`).then(res => {
            //     // if (Array.isArray(res.data)){
            //     if (res.data.status === "open") {
            //         axios.put(`http://localhost:3001/accept-security-alerts/${al.alert_id}`, {
            //             "assigned_to": userId,
            //             "status": alertStatus
            //         }).then(res => {
            //             setUpdateUi(prev => !prev)
            //         }).catch(e => {
            //             console.log(e)
            //         })
            //     } else if (res.data.status === "ASSIGNED") {
            //         alert("alert is Assigned to some other User")
            //     } else {
            //         alert("some error occured while assigning")
            //     }
            // }
            // ).catch(e => {
            //     alert("Some error occured")
            // })
            axios
                .put(
                    `http://localhost:3001/accept-security-alerts/${al.alert_id}`,
                    {
                        assigned_to: userId,
                        status: alertStatus,
                    }
                )
                .then((res) => {
                    setUpdateUi((prev) => !prev);
                    setToastMessage("Status Updated Succefully");
                    setShowToast(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            navigate("/login");
        }
    };

    const handleNavigate = (latitude, longitude) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(googleMapsUrl, "_blank");
    };

    useEffect(() => {
        axios
            .get("http://localhost:3001/security-alerts")
            .then((res) => {
                setApiStatus(apiSatusCodes.SUCCESS);
                if (Array.isArray(res.data)) {
                    setAlerts(res.data.reverse());
                    localStorage.setItem(
                        "secure_alerts_length",
                        res.data.length
                    );
                } else {
                    setAlerts([]);
                }
            })
            .catch((e) => {
                setApiStatus(apiSatusCodes.FAILED);
                console.log("No Data Found");
            });

        const fetchAlerts = () => {
            const previousAlertsLength = localStorage.getItem(
                "secure_alerts_length"
            );

            axios
                .get("http://localhost:3001/security-alerts")
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        const newAlerts = res.data;
                        if (newAlerts.length > previousAlertsLength) {
                            navigate("/home");
                        }
                    }
                })
                .catch((e) => {
                    // setApiStatus(apiSatusCodes.FAILED);
                    console.log("No Data Found");
                });
        };

        const intervalId = setInterval(fetchAlerts, 10000); // Fetch every 10 seconds
    }, [updateUi]);

    return (
        <div className="secure-zone-main">
            <div className="bg2 page-div black-text text-center">
                Secure - <span className="text1"> U</span>
            </div>
            <Container fluid className="dashboard-cls">
                <Row>
                    {apiStatus === apiSatusCodes.LOADING ? (
                        "loading............"
                    ) : alerts.length > 0 ? (
                        <>
                            {alerts.map((each) => {
                                return (
                                    <MiniCards
                                        alertDetails={each}
                                        onViewClick={onViewClick}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <div className="empty-content-cls">
                            <img
                                className="empty-image"
                                src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-result-illustration-download-in-svg-png-gif-file-formats--results-empty-matches-found-zero-query-ecommerce-states-pack-e-commerce-shopping-illustrations-9741054.png?f=webp"
                                alt="no posts available"
                            />
                            <h1>No Alerts found </h1>
                        </div>
                    )}
                </Row>
                <ToastMessageComponent
                    toastMessage={toastMessage}
                    showToast={showToast}
                    closeToast={() => setShowToast(false)}
                />
            </Container>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography> */}
                    {selectedAlert?.incident_mode == 0 && (
                        <ReportIncident
                            key={selectedAlert.id}
                            alertDetails={selectedAlert}
                            onAlertAcceptClick={onAlertAcceptClick}
                        />
                    )}
                    {selectedAlert?.incident_mode == 1 && (
                        <SosEmergency
                            key={selectedAlert.id}
                            alertDetails={selectedAlert}
                            onAlertAcceptClick={onAlertAcceptClick}
                        />
                    )}
                    {selectedAlert?.incident_mode == 2 && (
                        <MedicalEmergency
                            key={selectedAlert.id}
                            alertDetails={selectedAlert}
                            onAlertAcceptClick={onAlertAcceptClick}
                        />
                    )}
                </Box>
            </Modal>
        </div>
    );
};
export default DashBoardComponent;
