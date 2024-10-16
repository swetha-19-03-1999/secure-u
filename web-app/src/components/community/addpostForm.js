import Modal from '@mui/material/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

import { Form, Col } from 'react-bootstrap';
import ToastMessageComponent from '../toast/toastmessage';
import { PiX } from 'react-icons/pi';

const AddPostForm = (props) => {
    const { setNewsList ,updateComunityPageUIfunction} = props;
    const [showToast, setShowToast] = React.useState(false);  //this handles the toast visiblity
    const [toastMessage, setToastMessage] = React.useState('');
    const [age, setAge] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [optionsCount, setOptionsCount] = React.useState(2);
    const [pol_data, setPoll_data] = React.useState([]);
    const [newsTitle, setNewsTitle] = React.useState("")
    const [newsImage, setNewsImage] = React.useState("")
    const [newsTempImage, setNewsTempImage] = React.useState("")
    const [newsShortDesc, setNewsShortDesc] = React.useState("")
    const [newsLongDesc, setNewsLongDesc] = React.useState("")

    const onChangefile = (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
        console.log(fileURL)
        setNewsImage( file); // Store the file URL in the state
        setNewsTempImage(fileURL)
    };

    const onOptionsLabelsChange = (e, each, ind, optionsArr) => {

        setPoll_data(prev => {
            prev[ind] = { "id": ind, "value": 0, "label": `${e.target.value}` }
            return [...prev]
        }

        )
    }

    const validateForm = () => {
        let isValid = true
        if (newsTitle.length < 3) {
            alert("please provide valid title for the post")
            isValid = false
        }

        else if (newsImage.length < 3) {
            alert("please provide valid Image  for the post")
            isValid = false
        }
        else if (newsShortDesc.length < 3) {
            alert("please provide valid Short description for the post")
            isValid = false
        }
        else if (newsLongDesc.length < 10) {
            alert("please provide valid Long Description for the post")
            isValid = false
        }
        return isValid
    }

    const validatePollForm = () => {
        let isValid = true
        if (newsTitle.length < 3) {
            alert("please provide valid title for the post")
            isValid = false
        }


        else if (newsShortDesc.length < 3) {
            alert("please provide valid Short description for the post")
            isValid = false
        }
        else if (newsLongDesc.length < 10) {
            alert("please provide valid Long Description for the post")
            isValid = false
        } else {

            pol_data.forEach((each, ind) => {
                if (each.label.length < 1) {
                    alert(`PLease provide valid Label for Poll Option${ind + 1}`)
                    isValid = false

                }


            })
        }
        return isValid
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid ',
        // boxShadow: 24,
        maxHeight: '90vh',
        p: 4,
        overflowY: 'auto',
        boxShadow: '0px 0px 14px  4px #3fb6d3',
        borderRadius:'10px'
    };

    const handleChange = (event) => {
        setOptionsCount(event.target.value);
        const optionsArray = [];
        for (let i = 0; i < event.target.value; i++) {
            optionsArray.push({ id: i, value: 0, label: '' });

        }
        setPoll_data(optionsArray)
    };

    const resetValues = () => {
        setNewsTitle("")
        setNewsImage("")
        setNewsShortDesc("")
        setNewsLongDesc("")
        setPoll_data([])
        setChecked(false)
        setOptionsCount(2)
    }
    const onAddPostClick = () => {
        handleOpen()
    }
    const onCancelClick = () => {
        handleClose()
        resetValues()
    }

    const createArrayFromNumber = (numb) => {
        const optionsArray = [];
        for (let i = 0; i < numb; i++) {
            optionsArray.push(i);

        }


        return optionsArray;
    }
    const onAddPostButtonClick = () => {
  
        if (!checked) {
            const isvalid = validateForm()
            if (!(isvalid)) {
                return
            }
            //this allows only if it selected IMAGE type
            const userName = localStorage.getItem("userName")
            const formData = new FormData();
            formData.append('user_id',localStorage.getItem("userid"));
            formData.append('user_name', userName);  // Make sure this is the file object
            formData.append('news_title', newsTitle);
            formData.append('news_image', newsImage);
            formData.append('short_description',newsShortDesc);
            formData.append('long_description', newsLongDesc);

            const jsonParams = {
                user_id: localStorage.getItem("userid"),
                user_name: userName,
                news_title: newsTitle,
                news_image: newsImage,
                short_description: newsShortDesc,
                long_description: newsLongDesc
            }


            axios.post("http://localhost:3001/add-news", formData,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }).then(res => {
                setToastMessage("New post Added successfuly");

                setShowToast(true);
                handleClose()
                resetValues()
                updateComunityPageUIfunction()

            }
            ).catch(e => {
                console.log(e)
                
                setToastMessage("Post failed: "+ e);
                setShowToast(true);
            })
        }
        else {
            const isvalid = validatePollForm()
            if (!isvalid) {
                return
            } else {
                const userName = localStorage.getItem("userName")

                const jsonParams = {
                    user_id: localStorage.getItem("userid"),
                    user_name: userName,
                    news_title: newsTitle,
                    news_type: checked ? "POLE" : "IMAGE",
                    news_image: "",
                    poll_data: JSON.stringify(pol_data),
                    short_description: newsShortDesc,
                    long_description: newsLongDesc
                }
                const jp = {
                    "long_description": "THis pole is aboout cricket finale",
                    "news_image": "",
                    "news_title": "Who will win the finale",
                    "news_type": "POLE",
                    "poll_data": "[{\"id\":0,\"value\":0,\"label\":\"Inida\"},{\"id\":1,\"value\":0,\"label\":\"Austrelia\"},{\"id\":2,\"value\":0,\"label\":\"newzland\"}]",
                    "short_description": "THis pole is aboout cricket finale",
                    "user_id": "1",
                    "user_name": "Mahesh"
                }


                axios.post("http://localhost:3001/add-news-poll", jsonParams).then(res => {
                    setToastMessage("Posted New POll successfully");
        setShowToast(true);
                    handleClose()
                    resetValues()

                }
                ).catch(e => {
                    console.log(e)
                    setToastMessage("post failed: "+ e);
                    setShowToast(true);
                })

            }


        }

    }


    return (
        <>
            <div className="flex-1 container">


                <p className="  add-post-btn " type="button" onClick={onAddPostClick}>Add New Post</p>
            </div>

            <Modal
                className="modal-cls"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <DialogTitle>Post News</DialogTitle> */}
                <Box form sx={style}  >
                    <div className="image-div ">
                        <div className='d-flex align-items-center mb-3'>
                            <Switch
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                            />
                            <Typography variant="body2" className="text-start  ps-3" style={{ fontWeight: '800' }} color="text.secondary">
                                {!checked ?
                                    "Post Image" : "Post Poll"}
                            </Typography>


                        </div>


                    </div>
                    <Form.Group className="w-100 " controlId="formLocationName">
                        <Form.Label column sm={2}>Title</Form.Label>
                        <Col sm={12}>
                            <Form.Control
                                style={{ width: '100%' }}
                                type="text"
                                name="zone_name"
                                placeholder="Title"
                                multiline
                                value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
                        </Col>
                    </Form.Group>
                   
                    {
                        !checked && 
                       ( <Form.Group controlId="formNote" >
                        <Form.Label column >uploadfile</Form.Label>
                        <Col >
                          <Form.Control style={{ width: '100%' }} type="file" placeholder={newsImage} name="note" onChange={onChangefile} />
                        </Col>
                      </Form.Group>
          
          
                    )
                    }
                    {
                        checked &&
                        <>
                          <Form.Group controlId="formNote" >
                             <Form.Label column >Poll Options</Form.Label>
                        <Form.Select aria-label="Default select example"  value={optionsCount}
                         onChange={handleChange}
                         defaultValue={2}
                        >
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </Form.Select>
                      </Form.Group>
                      
                        <FormControl fullWidth className="ps-3 pb-3 pe-3 m-2 mb-3 mt-3"  style={{ border: '1px solid black' }}>
                           
                            {createArrayFromNumber(optionsCount).map((each, ind, optionsArr) => (
                                  <Form.Group className="w-100 " controlId="formLocationName" key={ind}>
                                  <Form.Label column >{`Option ${ind + 1}`}</Form.Label>
                                  <Col sm={12}>
                                      <Form.Control
                                          style={{ width: '100%' }}
                                          type="text"
                                          name={`option${ind + 1}`}
                                          placeholder={`Add Poll Option ${ind + 1}`}
                                          multiline
                                          value={pol_data[ind] ? pol_data[ind].label : ""} onChange={(e) => onOptionsLabelsChange(e, each, ind, optionsArr)} />
                                  </Col>
                              </Form.Group>

                              
                            ))}
                        </FormControl>
                        </>
                    }
                      <Form.Group className="w-100 pb-3" controlId="formLocationName">
                        <Form.Label column >Short Description</Form.Label>
                        <Col sm={12}>
                            <Form.Control
                                style={{ width: '100%' }}
                                type="textarea"
                                name="zone_name"
                                row={4}
                                placeholder="Short Overview of the post"
                                multiline
                                value={newsShortDesc} onChange={(e) => setNewsShortDesc(e.target.value)} />
                        </Col>
                    </Form.Group>

                    {/* <TextField
                        className="w-100 pb-3"
                        id="outlined-textarea"
                        label="Short Description"
                        placeholder="Short Overview of the post"
                        multiline
                        value={newsShortDesc}
                        onChange={(e) => setNewsShortDesc(e.target.value)}
                    />*/}

<Form.Group className="w-100 pb-3" controlId="formLocationName">
                        <Form.Label column >Long Description</Form.Label>
                        <Col sm={12}>
                            <Form.Control
                                style={{ width: '100%' }}
                                type="text"
                                name="long_desc"
                                placeholder="Full details of the post"
                                multiline
                                value={newsLongDesc}  onChange={(e) => setNewsLongDesc(e.target.value)} />
                        </Col>
                    </Form.Group>

                    {/* <TextField 
                        id="outlined-textarea"
                        className="w-100 pb-3"
                        label="Long Description"
                        placeholder="Full details of the post"
                        multiline
                        value={newsLongDesc}
                        onChange={(e) => setNewsLongDesc(e.target.value)}
                        rows={4}

                    /> */}


                    <Button className=" update-btn text1" onClick={onAddPostButtonClick}>Post</Button>
                    <Button className="ms-3 update-btn text1" onClick={onCancelClick}>Cancel</Button>
                    <ToastMessageComponent  toastMessage={toastMessage} showToast={showToast} closeToast={()=>setShowToast(false)}/>
                </Box>
            </Modal>
           
        </>
    )
}
export default AddPostForm