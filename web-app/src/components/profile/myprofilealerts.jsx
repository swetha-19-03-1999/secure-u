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
const apiSatusCodes = { "LOADING": "loading", "FAILED": "fail", "SUCCESS": "success" }

const MyProfileAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [updateUi, setUpdateUi] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiSatusCodes.LOADING);
    const [showToast, setShowToast] = useState(false);  //this handles the toast visiblity
    const [toastMessage, setToastMessage] = useState('');
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

                                        if (each.incident_mode == 0) {
                                            return <ReportIncident key={each.id} alertDetails={each} onAlertAcceptClick={onAlertAcceptClick} />;
                                        } else if (each.incident_mode == 1) {
                                            return <SosEmergency key={each.id} alertDetails={each} onAlertAcceptClick={onAlertAcceptClick} />;
                                        } else if (each.incident_mode == 2) {
                                            return <MedicalEmergency key={each.id} alertDetails={each} onAlertAcceptClick={onAlertAcceptClick} />;
                                        } else {
                                            return null;
                                        }
                                    })

                        }


                    </Row>
                </Container>
            </div>
            <ToastMessageComponent toastMessage={toastMessage} showToast={showToast} closeToast={() => setShowToast(false)} />
        </div>
    )
}
export default MyProfileAlerts