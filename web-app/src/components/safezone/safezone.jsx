import { Image } from 'react-bootstrap'
import './safezone.css'
import plusimg from '../Images/plus-img.png'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { Button, Modal } from 'react-bootstrap';
import { FaCircleInfo } from "react-icons/fa6";

const SafeZonePage = () => {
   const [safeZonesList, setSafeZonesList] = useState([])
   const [updateui, setUpdateui] = useState(false)
   const [show, setShow] = useState(false);
   const [zoneidTobedlete, setZoneidTobedlete] = useState(0);
   const handleClose = () => setShow(false);
   const handleShow = (event,zonedetail) =>{ 
      event.stopPropagation(); 
      setZoneidTobedlete(zonedetail.zone_id)
       setShow(true)
      };



  const onDleteConfirmClick = (event,safezonedetails) => {
      onDeleteSafeZone(zoneidTobedlete)
      handleClose();
  }

  
   const navigate = useNavigate();
   const onDeleteSafeZone =(zoneidTobedlete)=>{
      // event.stopPropagation();
      // alert(safezonedetails.zone_id)
      axios.delete(`http://localhost:3001/safe-zones/${zoneidTobedlete}`).then(res => {
         
         setUpdateui(prev =>(!prev))
      }).catch(e => { console.log(e) })

   }
   useEffect(() => {
      axios.get("http://localhost:3001/safe-zones").then(res => {
         
         setSafeZonesList(res.data)
      }).catch(e => { console.log(e) })
   }, [updateui])

   const onSafeZoneClick =(zone)=>{

      navigate(`/safezone/${zone.zone_id}`)

   }
   return (

      <div className="secure-zone-main">
         <div className="bg2 page-div black-text text-center">
            Secure - <span className="text1"> U</span>
         </div>
         <div className="skyblue-bg page-div text2  text4 text-center">
            Safe - Zone
         </div>
         {/* <div className="secure-zone-middle-div"> */}
         <Container fluid>
            <Row className='me-2 mt-2 mb-2 '>

               {

                  safeZonesList.map(each => (

                     <Col xs={6} md={4} key={each.title} >
                        <div className="image-container" onClick={()=>{onSafeZoneClick(each)}}>
                           <Image className="secure-zone-images" src={"http://localhost:3001/"+each.zone_img} alt={each.zone_name} />
                           <p className="image-title text-center">{each.zone_name}</p>
                           <button className="delete-button" onClick={(event) => { handleShow(event,each) }}>Delete <MdDelete /></button>
                           {/* <button className="delete-button" onClick={(event) => { onDeleteSafeZone(event,each) }}>Delete <MdDelete /></button> */}
                        </div>
                     </Col>



                  ))
               }
               <Col xs={6} md={4}>
               <div className="image-container "  onClick={()=>{navigate('/add-safeozne')}}>
                           <Image className="secure-zone-images" src={plusimg} alt="Add new" />
                           <p className="image-title p-2 text-center">Add New Zone</p>
                        </div>
                
               </Col>

            </Row>
         </Container>
         {/* </div> */}
         <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:'#3fb6d3'}} > <FaCircleInfo /> Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to Delete safezone</Modal.Body>
                <Modal.Footer>
                    <Button className="butt me-2 ms-5" onClick={handleClose}>
                        No
                    </Button>
                    <Button className='butt' onClick={onDleteConfirmClick}>
                        Yes
                    </Button> 
                    
                </Modal.Footer>
          
            </Modal>
      </div>
   )
}
export default SafeZonePage