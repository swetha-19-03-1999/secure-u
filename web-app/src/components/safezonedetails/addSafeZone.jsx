import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './safezone.css'; // For custom styles if needed
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { useNavigate, useParams } from 'react-router-dom';
function AddNewSafeZone(props) {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [zoneDetails, setZoneDetails] = useState({
    zone_name: "",
    zone_img: "",
    number_of_incidents: 0, note: "", safe_times: "", danger_time: "", zone_temp_image: ""
  })

  const { id } = useParams();

  const { zone_name = "", zone_img = "", number_of_incidents = 0, note = "", safe_times = "", danger_time = "", zone_temp_image = "" } = zoneDetails;


  const onchangeInputFields = (e) => {
    setZoneDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))

  }
  const onChangefile = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
    console.log(fileURL)
    setZoneDetails(prev => ({ ...prev, zone_img: file, zone_temp_image: fileURL })); // Store the file URL in the state
  };

  const onSumbitUpdatedetails = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('zone_name', zoneDetails.zone_name);
    formData.append('zone_img', zoneDetails.zone_img);  // Make sure this is the file object
    formData.append('number_of_incidents', zoneDetails.number_of_incidents);
    formData.append('note', zoneDetails.note);
    formData.append('safe_times', zoneDetails.safe_times);
    formData.append('danger_time', zoneDetails.danger_time);
    // const jsonInputs = {
    //   "zone_name": zoneDetails.zone_name,
    //   "zone_img": zoneDetails.zone_img,
    //   "number_of_incidents": zoneDetails.number_of_incidents,
    //   "note": zoneDetails.note,
    //   "safe_times": zoneDetails.safe_times,
    //   "danger_time": zoneDetails.danger_time
    // }


    axios.post('http://localhost:3001/add-newsafezone', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 201) {
        alert("success");
        setShowToast(true)
        navigate("/safezones")
      }
    }).catch(e => {
      alert(e);
    });


  }
  return (

    <Container fluid className="safe-zone-details-div">

      <Row className=" text-start ">
        <Col sm={12} className='col1 p-0'>
          {/* <div className="bg2 page-div black-text text-center">
            Secure - <span className="text1"> U</span>
          </div> */}
          <div className="skyblue-bg page-div text2  text4 text-center">
            Safe - Zone
         </div>
          <h2>Safe Zone</h2>
          <p>Update the details of this safe zone region.</p>
        </Col>


        <Col sm={12} className="zone-details-main-container">
          <Form onSubmit={onSumbitUpdatedetails}>
            <Form.Group controlId="formLocationName">
              <Form.Label column sm={2}>Location Name</Form.Label>
              <Col sm={10}>
                <Form.Control style={{ width: '30%' }} type="text" name="zone_name" placeholder="Location Name" value={zoneDetails.zone_name} onChange={onchangeInputFields} />
              </Col>
            </Form.Group>

            <Form.Group controlId="formNumberOfIncidents" className="mt-3">
              <Form.Label column sm={2}>Number of Incidents</Form.Label>
              <Col sm={10}>
                <Form.Control style={{ width: '30%' }} type="number" name="number_of_incidents" placeholder="Number of Incidents" value={zoneDetails.number_of_incidents} onChange={onchangeInputFields} />
              </Col>
            </Form.Group>

            <Form.Group controlId="formNote" className="mt-3">
              <Form.Label column sm={2}>Note</Form.Label>
              <Col sm={10}>
                <Form.Control style={{ width: '85%' }} as="textarea" rows={2} placeholder="Note" name="note" onChange={onchangeInputFields} value={note} />
              </Col>
            </Form.Group>


            <Form.Group as={Row} controlId="formSafeTimes" className="mt-3">
              <Col>
                <Form.Label>Safe Times</Form.Label>
                <Form.Control type="text" placeholder="10:AM - 7:00PM" value={zoneDetails.safe_times} name="safe_times" onChange={onchangeInputFields} />
              </Col>
              <Col>
                <Form.Label >Time to be aware</Form.Label>
                <Form.Control type="text" placeholder="2:00AM" value={zoneDetails.danger_time} name="danger_time" onChange={onchangeInputFields} />
              </Col>
              <Col>
                <Form.Group as={Row} className="mt-4">
                  <Col >
                    <Button className="butt me-2 ms-5" type="submit">
                      Add Zone
                    </Button>
                    <Button className='butt'>
                      Cancel
                    </Button>
                  </Col>
                </Form.Group>
              </Col>
            </Form.Group>

            {/* <Form.Group as={Row} controlId="formFileUpload" className="mt-3">
          <Form.Label column sm={2}>Upload an image</Form.Label>
          <Col sm={10}>
            <Form.Control type="file" />
          </Col>
        </Form.Group> */}

            <Form.Group controlId="formNote" className="mt-3">
              <Form.Label column sm={2}>Uploads Image</Form.Label>
              <Col sm={10}>
                <Form.Control style={{ width: '85%' }} type="file" placeholder={zone_img} name="note" onChange={onChangefile} />
              </Col>
            </Form.Group>


            <Form.Group as={Row} className="mt-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <img />
              </Col>
            </Form.Group>


          </Form>

          <div>
            <h2>
              Photo
            </h2>
            <p>Uploade a picture for describing the situation better</p>
            <Image src={zone_temp_image} className="safeZome-imagecls" />
          </div>
        </Col>
      </Row>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide position="top-center">
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </Container>
  );
}

export default AddNewSafeZone;