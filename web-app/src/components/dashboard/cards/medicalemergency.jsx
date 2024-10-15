import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SiTicktick } from "react-icons/si";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { stringAvatar } from "../../../helper";
import AvatarImg from "../../profile/Avatar";

const MedicalEmergency = (props) => {
    const { alertDetails, onAlertAcceptClick } = props;

    const {
        user_profile_pic,
        alert_id,
        user_name = "N/A",
        user_mobile_number = "Not Available",
        user_emergency_contact_name = "Not available",
        user_emergency_contact_number = "Not Available",
        user_blood_group = "N/A",
        user_medical_condition = "N/A",
        user_special_requirement = "N/A",
        description = "",
        assigned_contact,
        assigned_name = "N/A",
        assigned_to = 0,
        status = "open",
        location,
        lattitude,
        longitude,
        assigned_first_name = "N/A",
        assigned_last_name = "",
    } = alertDetails;
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    // useEffect(() => {
    //     if(selectedStatus == status){
    //         setSelectedStatus(status);
    //     }
    // }, [status]);

    const onAcceptClick = () => {
        // setSelectedStatus("ASSIGNED");
        onAlertAcceptClick(
            alertDetails,
            localStorage.getItem("userid"),
            "ASSIGNED"
        );
    };

    const onUpdateStatusClick = () => {
        onAlertAcceptClick(
            alertDetails,
            localStorage.getItem("userid"),
            selectedStatus
        );
    };
    const handleNavigate = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lattitude},${longitude}`;
        window.open(googleMapsUrl, "_blank");
    };
    return (
        <Box
            padding={4}
            className="bg-light-green"
        >
            <Col xs={12} lg={12} className="card-col">
                <Col xs={12} className="card-header">
                    <Typography
                        variant="h5"
                    >
                        Medical Emergency
                    </Typography>
                    <AvatarImg image={user_profile_pic} name={user_name} />
                </Col>
                <Col>
                    <Box style={{ height: "70vh", overflow: 'auto' }}>
                        <Form className="bg-light-green">
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Student name
                                </Form.Label>
                                <Form.Control
                                    className="form-controlcls bg-white-green "
                                    placeholder=""
                                    value={user_name}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Incident Description
                                </Form.Label>
                                <Form.Control
                                    className="form-controlcls bg-white-green "
                                    placeholder=""
                                    value={description}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Student location
                                </Form.Label>
                                <Button
                                    variant="outline-primary bg-white-green "
                                    onClick={handleNavigate}
                                >
                                    Navigate{" "}
                                </Button>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Student contact
                                </Form.Label>
                                <Form.Control
                                    className="form-controlcls bg-white-green "
                                    placeholder=""
                                    disabled
                                    value={user_mobile_number}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Student emergency contact name
                                </Form.Label>
                                <Form.Control
                                    className="form-controlcls bg-white-green "
                                    placeholder=""
                                    disabled
                                    value={user_emergency_contact_name}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Student emergency contact number
                                </Form.Label>
                                <Form.Control
                                    className="form-controlcls bg-white-green "
                                    placeholder=""
                                    disabled
                                    value={user_emergency_contact_number}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Blood group
                                </Form.Label>
                                <Form.Control
                                    className="form-controlcls bg-white-green "
                                    placeholder=""
                                    disabled
                                    value={user_blood_group}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    MEdical condition
                                </Form.Label>
                                <Form.Control
                                    className="form-controlcls bg-white-green "
                                    placeholder=""
                                    disabled
                                    value={user_medical_condition}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Special requirements
                                </Form.Label>
                                <Form.Control
                                    className="form-controlcls bg-white-green "
                                    placeholder=""
                                    disabled
                                    value={user_special_requirement}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls ">
                                    Security assigned to
                                </Form.Label>
                                {status === "open" ? (
                                    <Button
                                        variant="outline-primary bg-white-green "
                                        onClick={onAcceptClick}
                                    >
                                        Accept
                                    </Button>
                                ) : (
                                    <Form.Control
                                        className="form-controlcls bg-white-green "
                                        placeholder=""
                                        value={
                                            assigned_first_name +
                                            " " +
                                            assigned_last_name
                                        }
                                        disabled
                                    />
                                )}
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-groupcls"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="form-labelcls">
                                    Status
                                </Form.Label>
                                {status === "open" ? (
                                    <Form.Control
                                        className="form-controlcls bg-white-green "
                                        placeholder=""
                                        disabled
                                        value={status}
                                    />
                                ) : (
                                    <Form.Group controlId="formNote">
                                        <div className="d-flex">
                                            <Form.Select
                                                aria-label="Default select example"
                                                className="bg-white-green "
                                                value={selectedStatus}
                                                onChange={handleChange}
                                            >
                                                <option
                                                    value={"ASSIGNED"}
                                                    className="bg-white-green "
                                                >
                                                    Assigned
                                                </option>
                                                <option
                                                    value={"ONGOING"}
                                                    className="bg-white-green "
                                                >
                                                    On Going
                                                </option>
                                                <option
                                                    value={"PENDING"}
                                                    className="bg-white-green "
                                                >
                                                    Pending
                                                </option>
                                                <option
                                                    value={"COMPLETED"}
                                                    className="bg-white-green "
                                                >
                                                    Completed
                                                </option>
                                                <option
                                                    value={"CHANGEASSIGNEE"}
                                                    disabled
                                                    className="bg-white-green "
                                                >
                                                    Chaneg Assignee
                                                </option>
                                            </Form.Select>
                                            <Button
                                                variant="outline-primary bg-white-green "
                                                onClick={onUpdateStatusClick}
                                                style={{marginLeft: 10}}
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </Form.Group>
                                )}
                            </Form.Group>
                        </Form>
                    </Box>
                </Col>
            </Col>
        </Box>
    );
};
export default MedicalEmergency;
