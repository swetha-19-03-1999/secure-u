import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
const SosEmergency = (props) => {
    const {alertDetails,onAlertAcceptClick} = props;
    const {user_profile_pic,alert_id,user_name="N/A",user_mobile_number= "Not Available",user_emergency_contact_name="Not available",user_emergency_contact_number="Not Available",user_blood_group="N/A", user_medical_condition="N/A", special_requirements="N/A", assigned_contact,assigned_name="N/A",assigned_to=0,status="open",location,lattitude="no data",longitude="no data",assigned_first_name="N/A",assigned_last_name=""} = alertDetails;
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
        
    };
    
    const onAcceptClick =()=>{
        onAlertAcceptClick(alertDetails,localStorage.getItem("userid"),"ASSIGNED")
    }
    
    const onUpdateStatusClick =()=>{
        onAlertAcceptClick(alertDetails,localStorage.getItem("userid"),selectedStatus)
    }
    const handleNavigate = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lattitude},${longitude}`;
        window.open(googleMapsUrl, '_blank');
    };
    return (
            <Col xs={12} lg={4} className="bg-light-pink card-col">

                <Col xs={12} className="card-header">

                    <p>SOS Emergency</p>
                    <img className="profile-image" src={'http://localhost:3001/'+user_profile_pic} alt={"profile images"} />

                </Col>
                <Col >
                    <Form className="bg-light-pink">
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Student name</Form.Label>
                            <Form.Control className="form-controlcls bg-white-pink" placeholder="" disabled  value={user_name} readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Student location</Form.Label>
                            <Button variant="outline-primary bg-white-pink" onClick={handleNavigate} >Navigate </Button>
                        </Form.Group>
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Student contact</Form.Label>
                            <Form.Control className="form-controlcls bg-white-pink" placeholder="" disabled  value={user_mobile_number} />
                        </Form.Group>
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Student emergency contact name</Form.Label>
                            <Form.Control className="form-controlcls bg-white-pink" placeholder="" disabled  value={user_emergency_contact_name} />
                        </Form.Group>
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Student emergency contact number</Form.Label>
                            <Form.Control className="form-controlcls bg-white-pink" placeholder=""  disabled value={user_emergency_contact_number} />
                        </Form.Group>
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Security assigned to</Form.Label>
                            {
                            status === "open" ? (
                                
                                <Button variant="outline-primary bg-white-pink" fullWidth  onClick={onAcceptClick}>Accept</Button>
                            ) : (
                                <Form.Control className="form-controlcls bg-white-pink" placeholder=""  disabled value={assigned_first_name + " " + assigned_last_name}  />
                            )
                        }
                        </Form.Group>
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInputstatus">
                            <Form.Label className="form-labelcls"  >Status</Form.Label>
                            {
                            status === "open" ? (
                                <Form.Control className="form-controlcls bg-white-pink" placeholder=""  disabled  value={status}/>
                            ) : (
                                <Form.Group controlId="formNote" >
                               
                               <div className="d-flex">
                           <Form.Select aria-label="Default select example"  className=" bg-white-pink"  value={selectedStatus}
                            onChange={handleChange}
                           >
                            <option value={"ASSIGNED"}  className="bg-white-pink" >Assigned</option>
                           <option value={"ONGOING"}  className="bg-white-pink" >On Going</option>
                           <option value={"PENDING"}  className="bg-white-pink" >Pending</option>
                           <option value={"COMPLETED"}  className="bg-white-pink" >Completed</option>
                           <option value={"CHANGEASSIGNEE"} disabled  className="bg-white-pink" >Chaneg Assignee</option>

                         </Form.Select>
                         <Button variant="outline-primary bg-white-pink" onClick={onUpdateStatusClick}>Update</Button>
                         </div>
                         </Form.Group>
                            )
                        }
                        </Form.Group>
                    </Form>
                </Col>
            </Col>
    )
}
export default SosEmergency