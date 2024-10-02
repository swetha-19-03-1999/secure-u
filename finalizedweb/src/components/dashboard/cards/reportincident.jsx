
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const ReportIncident = (props) => {
    const { alertDetails, onAlertAcceptClick } = props;
    const {user_profile_pic, alert_id, user_name, user_mobile_number = "Not Available", user_emergency_contact_name = "Not available", user_emergency_contact_number = "Not Available", user_blood_group = "N/A", user_medical_condition = "N/A", special_requirements = "N/A", assigned_contact, assigned_name = "N/A", assigned_first_name = "N/A", assigned_last_name = "", assigned_to = 0, status = "open", location, lattitude, longitude, alert_type = "theft", timestamp } = alertDetails;
    const [selectedStatus, setSelectedStatus] = useState(status);

    const getformattedDate = (dateStr) => {
    
        const date = new Date(dateStr);
        // Extract the day, month, and year
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear().toString().slice(-2);
    
        // Extract the time in HH:MM AM/PM format
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12).toString();
    
        const formattedDate = `${day} ${month} ${year} , ${formattedHours}:${minutes}${ampm}`;
        return formattedDate
    }
    const handleChange = (event) => {
        setSelectedStatus(event.target.value);

    };

    const onAcceptClick = () => {
        onAlertAcceptClick(alertDetails, localStorage.getItem("userid"), "ASSIGNED")
    }

    const onUpdateStatusClick = () => {
        onAlertAcceptClick(alertDetails, localStorage.getItem("userid"), selectedStatus)
    }
    return (
        <Col xs={12} lg={4} className="bg-light-yellow card-col">

            <Col xs={12} className="card-header">

                <p>Report Incident</p>
                <img className="profile-image" src={'http://localhost:3001/'+user_profile_pic} alt={"profile images"} />

            </Col>
            <Col >
                <Form className="bg-light-yellow">
                    <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-labelcls"  >Student name</Form.Label>
                        <Form.Control className="form-controlcls bg-white-yellow" placeholder="" disabled value={user_name} />
                    </Form.Group>
                    <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-labelcls"  >Student contact</Form.Label>
                        <Form.Control className="form-controlcls bg-white-yellow" placeholder="" disabled value={user_mobile_number} />
                    </Form.Group>
                    <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-labelcls"  >Issue</Form.Label>
                        <Form.Control className="form-controlcls bg-white-yellow" placeholder="" disabled value={alert_type} />
                    </Form.Group>
                    <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-labelcls"  >Time of issue faced</Form.Label>
                        <Form.Control className="form-controlcls bg-white-yellow" placeholder="" disabled value={getformattedDate(timestamp)} />
                    </Form.Group>
                    <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-labelcls"  >Pictures</Form.Label>
                        <Form.Control className="form-controlcls bg-white-yellow" placeholder="" disabled />
                    </Form.Group>
                    <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-labelcls"  >Security assigned to</Form.Label>
                        {
                            status === "open" ? (
                                <Button variant="outline-primary  bg-white-yellow" onClick={onAcceptClick}>Accept</Button>
                            ) : (
                                <Form.Control className="form-controlcls  bg-white-yellow" placeholder="" disabled value={assigned_first_name + " " + assigned_last_name} />
                            )
                        }

                    </Form.Group>
                    <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-labelcls"  >Status</Form.Label>
                        {
                            status === "open" ? (
                                <Form.Control className="form-controlcls bg-white-yellow" placeholder="" disabled value={status} />
                            ) : (
                                <Form.Group controlId="formNote" >

                                    <div className="d-flex">
                                        <Form.Select aria-label="Default select example" className=" bg-white-yellow" value={selectedStatus}
                                            onChange={handleChange}
                                        >
                                            <option value={"ASSIGNED"} className=" bg-white-yellow" >Assigned</option>
                                            <option value={"ONGOING"} className=" bg-white-yellow" >On Going</option>
                                            <option value={"PENDING"} className=" bg-white-yellow" >Pending</option>
                                            <option value={"COMPLETED"} className=" bg-white-yellow" >Completed</option>
                                            <option value={"CHANGEASSIGNEE"} disabled className=" bg-white-yellow" >Chaneg Assignee</option>

                                        </Form.Select>
                                        <Button variant="outline-primary  bg-white-yellow" onClick={onUpdateStatusClick}>Update</Button>
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
export default ReportIncident