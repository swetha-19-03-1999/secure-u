import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './safezone.css'; // For custom styles if needed
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ToastMessageComponent from '../toast/toastmessage';

function SafeZoneDetails(props) {
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [zoneDetails, setZoneDetails] = useState({
    zone_name: "",
    zone_img: "",
    number_of_incidents: 0, note: "", safe_times: "", danger_time: ""
  })
  const [isEditEnabled,setIsEditEnabled]= useState({editEnabled:false,zone_temp_image: ""})
  const { zone_name = "", zone_img = "", number_of_incidents = 0, note = "", safe_times = "", danger_time = "" } = zoneDetails;

  useEffect(() => {
    axios.get(`http://localhost:3001/safe-zones/${id}`).then((res) => {
      setZoneDetails(res.data[0])
    }).catch((e) => {
      console.log(e)
    })
  }, [])

  const onchangeInputFields = (e) => {
    setZoneDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    
  }

  // const onChangefile = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setZoneDetails(prev => ({ ...prev, zone_img: reader.result }));
  //   }
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // }
  const onChangefile = (e) => {
    debugger
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
    console.log(fileURL)
    setZoneDetails(prev => ({ ...prev, zone_img: file, zone_temp_image: fileURL })); // Store the file URL in the state
    setIsEditEnabled(prev=>({...prev ,zone_temp_image: fileURL,editEnabled:true}))
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
    const jsonInputs = {
      "zone_name": zoneDetails.zone_name,
      "zone_img": zoneDetails.zone_img,
      "number_of_incidents": zoneDetails.number_of_incidents,
      "note": zoneDetails.note,
      "safe_times": zoneDetails.safe_times,
      "danger_time": zoneDetails.danger_time
    }

    axios.put(`http://localhost:3001/safe-zones/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 204) {
        setToastMessage("Update success");
        setShowToast(true);
      }
    }).catch(e => {
      setToastMessage("Update failed: "+ e);
      setShowToast(true);
    });
  }

  return (
    <Container fluid className="safe-zone-details-div">
      <Row className=" text-start ">
        <Col sm={12} className='col1 p-0'>
          <div className="bg2 page-div black-text text-center">
            Secure - <span className="text1"> U</span>
          </div>
          {/* <div className="skyblue-bg page-div text2  text4 text-center">
            Safe - Zone
         </div> */}
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
                      Update
                    </Button>
                    <Button className='butt'>
                      Delete
                    </Button>
                  </Col>
                </Form.Group>
              </Col>
            </Form.Group>
            <Form.Group controlId="formNote" className="mt-3">
              <Form.Label column sm={2}>Update Image</Form.Label>
              <Col sm={10}>
                <Form.Control style={{ width: '85%' }} type="file"  placeholder={zone_img} name="note" onChange={onChangefile} />
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
            {isEditEnabled.editEnabled ?<Image src={isEditEnabled.zone_temp_image} className="safeZome-imagecls" />: 
            <Image src={"http://localhost:3001/"+zone_img} className="safeZome-imagecls" /> }
          </div>
        </Col>
      </Row>
      {/* <ToastContainer className="p-5 "> */}
      {/* <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide className="toast-message">  */}
        {/* <Toast onClose={() => setShowToast(false)} show={showToast}  className="toast-message">
       
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer> */}
      <ToastMessageComponent   toastMessage={toastMessage} showToast={showToast} closeToast={()=>setShowToast(false)}/>
    </Container>
  );
}

export default SafeZoneDetails;