import React, { useEffect, useState } from 'react';
import { Button, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ToastMessageComponent from '../toast/toastmessage';
import { Form, Col } from 'react-bootstrap';
import axios from 'axios';
import AvatarImg from './Avatar';

function ProfileImageUploader({ image }) {
  const [selectedImage, setSelectedImage] = useState(image ? image : null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false); 
  const [imgUrlSrc, setImgUrlSrc] = useState("");


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onImageSave = () => {
    if (selectedImage)
    {
      const user_id = localStorage.getItem("userid")
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('admin_img', selectedImage);
      axios.post("http://localhost:3001/add-admin-image", formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
          setToastMessage("Image Uploaded successfuly");
          setShowToast(true);
          // setImgUrlSrc("");
      }
      ).catch(e => {
          console.log(e)
          setToastMessage("Upload Image failed: ");
          setShowToast(true);
      });
    }
    else
    {
      setToastMessage("Image is not Uploaded!!");
      setShowToast(true);
    }
};

const onChangefile = (e) => {
  const file = e.target.files[0];
  const fileURL = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
  console.log(fileURL)
  setSelectedImage(file); // Store the file URL in the state
  setImgUrlSrc(fileURL)
};

useEffect(() => {
  setSelectedImage(image)
}, [image]);

console.log(image, '>>>>>>>>>>>>>>', selectedImage)

  return (
    <div style={{ width: 150, margin: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* <Avatar
          alt="Profile Image"
          src={selectedImage}
          sx={{ width: 120, height: 120, marginBottom: 2 }}
        />
         */}
        <AvatarImg
          alt="Profile Image"
          image={selectedImage}
          src={imgUrlSrc}
          name={localStorage.getItem('userName')}
          sx={{ width: 120, height: 120, marginBottom: 2 }}
        />
        {/* <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          type="file"
          onChange={handleImageChange}
        /> */}
        <Form.Group controlId="formNote" >
          {/* <Form.Label column >Profile Image</Form.Label> */}
          <Col >
            <Form.Control style={{ width: '100%' }} type="file" placeholder={selectedImage} name="note" onChange={onChangefile} />
          </Col>
        </Form.Group>
        {/* <label htmlFor="image-upload">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label> */}
        <Button variant="contained" className=" update-btn text1" disabled={!imgUrlSrc} component="span" sx={{ marginTop: 1 }} onClick={onImageSave}>
          Upload Image
        </Button>
        
        <ToastMessageComponent  toastMessage={toastMessage} showToast={showToast} closeToast={()=>setShowToast(false)}/>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
