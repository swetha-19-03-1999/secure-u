import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap'
import plusimg from '../Images/plus-img.png'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import alertimage from "../Images/alertImage.jpg"
import './alerts.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiSatusCodes = { "LOADING": "loading", "FAILED": "fail", "SUCCESS": "success" }

const AlertsComponent = () => {
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
        <div className="secure-zone-main grey-bg">
            <div>
                {/* <div className="bg2 page-div black-text text-center">
                    Secure - <span className="text1"> U</span>
                </div> */}
                <div className="skyblue-bg page-div text2  text4 text-center">
                    Alerts
                </div>
                <Container fluid>
                    <Row className='me-2 mt-2 mb-2 '>

                        {
                            apiStatus === apiSatusCodes.LOADING ? "loading............" :
                                alerts.map(each => (

                                    <Col xs={6} md={6} lg={6} xl={4} key={each.title} >
                                        {/* <div className="image-container">
                                        <Image className="secure-zone-images" src={each.zone_img} alt={each.zone_name} />
                                        <p className="image-title text-center">{each.zone_name}</p>
                                    </div> */}

                                        <Card className="mb-2" >
                                            <Card.Img variant="top" src={alertimage} />
                                            <Card.Body>
                                                {/* {
                                                    each.status == "open" ?
                                                        <div className='d-flex '>
                                                            <button className="btn btn-primary" onClick={(e) => onAlertAcceptClick(e, each)}>
                                                                Accpet
                                                            </button>
                                                        </div>
                                                        :

                                                        <div className='d-flex '>
                                                            <h6><b>Status:</b></h6>
                                                            <p style={{ fontSize: "15px", textAlign: "left" }}>{each.status} To  {each.assigned_name}</p>
                                                        </div>
                                                } */}
                                                <Card.Title>Status:{each.status == "open" ? "Open" : each.status + " To " + each.assigned_name}</Card.Title>
                                                <Card.Text>
                                                    stuident contact: {each.user_contact_number} <br></br>
                                                    Location: {each.location}
                                                </Card.Text>
                                                <div className="d-flex">
                                                    {
                                                        each.status == "open" &&
                                                        <div className='d-flex '>
                                                            <button className="btn navigate-btn me-5" onClick={(e) => onAlertAcceptClick(e, each)}>
                                                                Accpet
                                                            </button>
                                                        </div>

                                                    }
                                                    <Button className="navigate-btn " onClick={() => { handleNavigate(each.latitude, each.longitude) }} >Navigate</Button>
                                                </div>

                                            </Card.Body>
                                        </Card>
                                    </Col>



                                ))
                        }


                    </Row>
                </Container>
            </div>   </div>
    )
}
export default AlertsComponent