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

const apiSatusCodes = { "LOADING": "loading", "FAILED": "fail", "SUCCESS": "success" }
const DashBoardComponent = () =>{
    const [alerts, setAlerts] = useState([]);
    const [updateUi, setUpdateUi] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiSatusCodes.LOADING);
    const navigate = useNavigate();

    const onAlertAcceptClick = (e, al) => {
        if (localStorage.getItem("userid")) {

            axios.get(`http://localhost:3001/security-alerts/${al.alert_id}`).then(res => {

                // if (Array.isArray(res.data)){
                if (res.data.status === "open") {
                    axios.put(`http://localhost:3001/accept-security-alerts/${al.alert_id}`, {

                        "assigned_to": localStorage.getItem("userid"),
                        "status": "ASSIGNED"

                    }).then(res => {
                        setUpdateUi(prev => !prev)

                    }).catch(e => {
                        console.log(e)
                    })
                } else if (res.data.status === "ASSIGNED") {
                    alert("alert is Assigned to some other User")
                } else {
                    alert("some error occured while assigning")
                }
            }


            ).catch(e => {
                alert("Some error occured")
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
        {/* <div className="bg2 page-div black-text text-center">
           Secure - <span className="text1"> U</span>
      
           </div> */}
           <div className="skyblue-bg page-div text2  text4 text-center">
                Dashboard - Page
            </div>
        <Container fluid className="dashboard-cls">
           
            <Row>
             
                {/* <SosEmergencyMiniCard />
            <SosEmergency />
            <MedicalEmergencyMini/>
            <MedicalEmergency />
            
      <ReportIncidentMiniCard />
       <ReportIncident/> */}
 {
                            apiStatus === apiSatusCodes.LOADING ? "loading............" :
                                alerts.map(each => {
                                    if (each.incident_mode === 0) {
                                        return <ReportIncidentMiniCard key={each.id} />;
                                    } else if (each.incident_mode === 1) {
                                        return <SosEmergency key={each.id} />;
                                    } else if (each.incident_mode === 2) {
                                        return <MedicalEmergency key={each.id} />;
                                    } else {
                                        return null;
                                    }
                                })
                        }

            </Row>
      
      </Container>
      </div>
    )
}
export default DashBoardComponent;

