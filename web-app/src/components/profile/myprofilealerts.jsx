import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import alertimage from "../Images/alertImage.jpg"
// import './alerts.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReportIncident from '../dashboard/cards/reportincident';
import SosEmergency from '../dashboard/cards/sosemergency';
import MedicalEmergency from '../dashboard/cards/medicalemergency';
import ToastMessageComponent from '../toast/toastmessage';
import MiniCards from '../dashboard/cards/MiniCards2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
const apiSatusCodes = { "LOADING": "loading", "FAILED": "fail", "SUCCESS": "success" }
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

const MyProfileAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [updateUi, setUpdateUi] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiSatusCodes.LOADING);
    const [showToast, setShowToast] = useState(false);  //this handles the toast visiblity
    const [toastMessage, setToastMessage] = useState('');
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const onAlertAcceptClick = (al, userId, alertStatus) => {
        if (localStorage.getItem("userid")) {
            axios.put(`http://localhost:3001/accept-security-alerts/${al.alert_id}`, {
                "assigned_to": userId,
                "status": alertStatus
            }).then(res => {
                setUpdateUi(prev => !prev)
                setToastMessage("Status Updated Succefully");
                setShowToast(true);
            }).catch(e => {
                console.log(e)
            })
        } else {
            navigate("/login")
        }
    }

    const handleNavigate = (latitude, longitude) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(googleMapsUrl, '_blank');
    };

    useEffect(() => {
        const userId = localStorage.getItem("userid")
        axios.get(`http://localhost:3001/security-alerts/assigned-to-me/${userId}`)
            .then(
                (res) => {
                    setApiStatus(apiSatusCodes.SUCCESS)
                    if (Array.isArray(res.data)) {

                        setAlerts(res.data.reverse())
                    } else {
                        setAlerts([])
                    }
                }
            ).catch(
                (e) => {
                    setApiStatus(apiSatusCodes.FAILED)
                    console.log('No Data Found')
                }
            )
    }, [updateUi])

    const onViewClick = (alert) => {
        setSelectedAlert(alert);
        setShowModal(true);
    };

    return (
        <div className="secure-zone-main">
            <div>
                <div className="skyblue-bg page-div text2  text4 text-center">
                    My Alerts
                </div>
                <Container fluid>
                    <Row className='me-2 mt-2 mb-2 '>
                        {
                            apiStatus === apiSatusCodes.LOADING ? "loading............" :
                                alerts.length < 1 ? <div className="empty-content-cls">
                                <img className="empty-image" src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-result-illustration-download-in-svg-png-gif-file-formats--results-empty-matches-found-zero-query-ecommerce-states-pack-e-commerce-shopping-illustrations-9741054.png?f=webp" alt="no posts available"/>
                                <h1>You dont have Assigned alerts</h1>
                            </div> :
                                    alerts.map(each => {

                                        return (
                                            <MiniCards
                                                key={each.id}
                                                alertDetails={each}
                                                onViewClick={onViewClick}
                                            />
                                        );
                                    })

                        }


                    </Row>
                </Container>
                <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div style={{ margin: 10, float: 'right', cursor: 'pointer' }}><CloseIcon onClick={() => setShowModal(false)} /></div>
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
            <ToastMessageComponent toastMessage={toastMessage} showToast={showToast} closeToast={() => setShowToast(false)} />
        </div>
    )
}
export default MyProfileAlerts