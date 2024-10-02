import './dashboard.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MedicalEmergency from './cards/medicalemergency';
import SosEmergency from './cards/sosemergency';
import ReportIncident from './cards/reportincident';
import SosEmergencyMiniCard from './cards/sosminicard';
import MedicalEmergencyMini from './cards/medicalminicard';
import ReportIncidentMiniCard from './cards/reportmini';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ToastMessageComponent from '../toast/toastmessage';

const apiSatusCodes = { "LOADING": "loading", "FAILED": "fail", "SUCCESS": "success" }

const DashBoardComponent = () =>{
    const [alerts, setAlerts] = useState([]);
    const [updateUi, setUpdateUi] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiSatusCodes.LOADING);
    const [showToast, setShowToast] = useState(false);  //this handles the toast visiblity
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const onAlertAcceptClick = ( al,userId,alertStatus) => {

        
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
        axios.get("http://localhost:3001/security-alerts")
            .then(
                (res) => {
                    setApiStatus(apiSatusCodes.SUCCESS)
                    if (Array.isArray(res.data)) {
                        setAlerts(res.data.reverse())
                        localStorage.setItem("secure_alerts_length",res.data.length)
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

            const fetchAlerts = () => {
                const previousAlertsLength = localStorage.getItem("secure_alerts_length")
                
                axios.get("http://localhost:3001/security-alerts")
                    .then((res) => {
                        if (Array.isArray(res.data)) {
                            const newAlerts = res.data;
                            if (newAlerts.length > previousAlertsLength) {
                                navigate('/home');
                            }
                        }
                    })
                    .catch((e) => {
                        // setApiStatus(apiSatusCodes.FAILED);
                        console.log('No Data Found');
                    });
            };
            
            const intervalId = setInterval(fetchAlerts, 10000); // Fetch every 10 seconds
            

    }, [updateUi])

    return (
        <div className="secure-zone-main">
        <div className="bg2 page-div black-text text-center">
           Secure - <span className="text1"> U</span>
      
           </div>
        <Container fluid className="dashboard-cls">
           
            <Row>

 {
                            apiStatus === apiSatusCodes.LOADING ? "loading............" :
                            (alerts.length > 0 ? 
                                 alerts.map(each => {
                                    
                                    if (each.incident_mode == 0) {
                                        return <ReportIncident key={each.id} alertDetails={each} onAlertAcceptClick={onAlertAcceptClick}/>;
                                    } else if (each.incident_mode == 1) {
                                        return <SosEmergency key={each.id}  alertDetails={each} onAlertAcceptClick={onAlertAcceptClick}/>;
                                    } else if (each.incident_mode == 2) {
                                        return <MedicalEmergency key={each.id} alertDetails={each} onAlertAcceptClick={onAlertAcceptClick}/>;
                                    } else {
                                        return null;
                                    }
                                })
                                
                                : <div className="empty-content-cls">
                                <img className="empty-image" src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-result-illustration-download-in-svg-png-gif-file-formats--results-empty-matches-found-zero-query-ecommerce-states-pack-e-commerce-shopping-illustrations-9741054.png?f=webp" alt="no posts available"/>
                                <h1>No Alerts found </h1>
                            </div>)
                               
                        }

            </Row>
            <ToastMessageComponent  toastMessage={toastMessage} showToast={showToast} closeToast={()=>setShowToast(false)}/>
      </Container>
      </div>
    )
}
export default DashBoardComponent;

