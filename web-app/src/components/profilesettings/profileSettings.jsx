
import { Button, Form } from 'react-bootstrap';
import './profilesettings.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastMessageComponent from '../toast/toastmessage';
import ProfileImageUploader from '../profile/ProfileImageUploader';

const ProfileSettingsComponent = () => {
    const [userDetails, setUserDetails] = useState({
        first_name: "",
        last_name: "",
        user_contact_number: "",
        user_email_id: "",
        user_dob: "", user_university_name: "", employ_id: "",
        employ_photo: ""
    })
    const [updateUI, setUpdateUI] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [errorCodes, setErroCodes] = useState({
        first_name: false,
        first_nameCode: "PLease provide a valid first name",
        last_name: false,
        last_nameCode: "PLease provide a valid first name",
        user_university_name: false,
        user_university_nameCode: "provide your valid university Name",
        employ_id: false,
        employ_idCode: "please provide valid employ id",
        user_email_id: false,
        user_email_idCode: "provie valid Email Id",
        user_contact_number: false,
        user_contact_numberCode: "provide valid contact Number"
    })
  
    const onchangeInputFields = (e) => {

        // if(e.target.value.length >3){
        //     setErroCodes({...errorCodes,[e.target.name]:false})
        // }else{
        //     setErroCodes({...errorCodes,[e.target.name]:true})
        // }
        setUserDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
        switch (e.target.name) {
            case "first_name":
                case "last_name":
                case "user_university_name":
                case "employ_id":
                if (e.target.value.length > 3) {
                    setErroCodes({ ...errorCodes, [e.target.name]: false })
                } else {
                    setErroCodes({ ...errorCodes, [e.target.name]: true })
                }
                break;

            case "user_email_id":
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isValidEmail = emailRegex.test(e.target.value);
                if (e.target.value === "") {
                    setErroCodes((prev) => ({ ...prev, user_email_id: true, user_email_idCode: "Email is required" }));
                } else if (isValidEmail) {
                    setErroCodes((prev) => ({ ...prev, user_email_id: false, user_email_idCode: "" }));
                } else {
                    setErroCodes((prev) => ({ ...prev, user_email_id: true, user_email_idCode: "Invalid email format" }));
                }
                break;
            case "user_contact_number":
                if (e.target.value.length === 10) {

                    setErroCodes((prev) => ({ ...prev, user_contact_number: false, }));

                } else {
                    setErroCodes((prev) => ({ ...prev, user_contact_number: true, user_contact_numberCode: "please provide valid mobile number" }));
                }
                break;

                default :
               break
        }
    }

    const formValidationchecking = () => {
        let isValid = true;
        if ((userDetails.first_name= userDetails.first_name || "").length < 3) {
            setErroCodes((prev) => ({ ...prev, first_name: true }));
            isValid = false;
        } if ((userDetails.last_name= userDetails.last_name || "").length < 3) {
            setErroCodes((prev) => ({ ...prev, last_name: true }));
            isValid = false;
        }
        if ((userDetails.user_university_name = userDetails.user_university_name || "").length < 3) {
            setErroCodes((prev) => ({ ...prev, user_university_name: true }));
            isValid = false;
        }
        if ((userDetails.employ_id = userDetails.employ_id || "").length < 3) {
            setErroCodes((prev) => ({ ...prev, employ_id: true }));
            isValid = false;
        } 
        if ((userDetails.user_email_id= userDetails.user_email_id || "").length < 3) {
            setErroCodes((prev) => ({ ...prev, user_email_id: true }));
            isValid = false;
        }
        if ((userDetails.user_contact_number= userDetails.user_contact_number || "").length !== 10) {
            setErroCodes((prev) => ({ ...prev, user_contact_number: true }));
            isValid = false;
        }

        return isValid
    }
    useEffect(() => {
        const userId = localStorage.getItem('userid')
        axios.get(`http://localhost:3001/admin-users/${userId}`).then((res) => { console.log(res.data); setUserDetails(res.data) }).catch((e) => {
            console.log(e)

        })
    }, [updateUI])

    const onClickResetChanges = () => {
        setErroCodes((prev) => ({ ...prev, first_name: false, last_name: false,user_university_name: false, user_email_id: false, employ_id: false,    user_contact_number: false, }));

        setUpdateUI(prev => (!prev))
    }

    const onSubmitUpdateProfileSettings = (e) => {
        e.preventDefault();
        const isValid = formValidationchecking();

        if (!isValid){
            setShowToast(true)
            setToastMessage("fields should not be empty")
            return;
        }
        const user_id = localStorage.getItem("userid")
        const jsonObj = {
            "first_name": userDetails.first_name,
            "last_name": userDetails.last_name,
            "user_contact_number": userDetails.user_contact_number,
            "user_email_id": userDetails.user_email_id,
            "user_dob": userDetails.user_dob,
            "user_university_name": userDetails.user_university_name,
            "employ_id": userDetails.employ_id
        }
        
        
        axios.put(`http://localhost:3001/admin-users/profile-details/${user_id}`, jsonObj).then(res => {
            setUpdateUI(prev => (!prev))
            setShowToast(true)
            setToastMessage("profile Details updated Succesfully")
        }).catch(e => {
            setShowToast(true)
            setToastMessage("" + e)
        })
    }
    return (

        <div className="personal-component-div ">
            {/* <div className="bg2 page-div black-text text-center">
                Secure - <span className="text1"> U</span>
            </div> */}

            <div className='p-2'>
                <h1 className="text1 mt-2
            mb-4">Settings</h1>
                <p className="text1 m-0">Profile </p>
                <p className="plain-text">
                    <ProfileImageUploader image={userDetails?.employ_photo} />
                </p>
                <Form className="setting-form" onSubmit={onSubmitUpdateProfileSettings}>
                    <div className="d-flex">

                        <Form.Group controlId="formfirstname" className="mt-3 text-start form-group">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className='p-2' placeholder="Your First Name" name="first_name" value={userDetails.first_name} isInvalid={errorCodes.first_name} onChange={onchangeInputFields} />
                            <Form.Control.Feedback type="invalid">
                                {errorCodes.first_nameCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formlastname" className="mt-3 ms-4  text-start form-group">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className='p-2' placeholder="Your Last Name" name="last_name" value={userDetails.last_name} isInvalid={errorCodes.last_name} onChange={onchangeInputFields} />
                            <Form.Control.Feedback type="invalid">
                                {errorCodes.last_nameCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="d-flex">

                        <Form.Group controlId="formPassword" className="mt-3 text-start form-group">
                            <Form.Label>University Name</Form.Label>
                            <Form.Control className='p-2' placeholder="Your University Name" name="user_university_name" value={userDetails.user_university_name} isInvalid={errorCodes.user_university_name} onChange={onchangeInputFields} />
                            <Form.Control.Feedback type="invalid">
                                {errorCodes.user_university_nameCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-3 ms-4  text-start form-group">
                            <Form.Label>Employ Id Number</Form.Label>
                            <Form.Control className='p-2' placeholder="Your Employ Id" name="employ_id" value={userDetails.employ_id} isInvalid={errorCodes.employ_id} onChange={onchangeInputFields} />
                            <Form.Control.Feedback type="invalid">
                                {errorCodes.employ_idCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId="formPassword" className="mt-3 text-start form-group">
                            <Form.Label>Email Adress</Form.Label>
                            <Form.Control className='p-2' placeholder="Your Email Address" name="user_email_id" value={userDetails.user_email_id} isInvalid={errorCodes.user_email_id} onChange={onchangeInputFields} />
                            <Form.Control.Feedback type="invalid">
                                {errorCodes.user_email_idCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-flex">
                            <Form.Group controlId="formPassword" className="mt-3 text-start form-group" >
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control className='p-2' placeholder="Date of birth"
                                    value={userDetails.user_dob ? new Date(new Date(userDetails.user_dob).getTime() - new Date(userDetails.user_dob).getTimezoneOffset() * 60000).toISOString().split('T')[0] : ''}


                                    type="date" name="user_dob" isInvalid={errorCodes.password} onChange={onchangeInputFields} />
                                <Form.Control.Feedback type="invalid">
                                    {errorCodes.passwordCode}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3 ms-4 text-start form-group">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control className='p-2' placeholder="Your Contact Number" name="user_contact_number" value={userDetails.user_contact_number} isInvalid={errorCodes.user_contact_number} onChange={onchangeInputFields} />
                                <Form.Control.Feedback type="invalid">
                                    {errorCodes.user_contact_numberCode}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="mt-4  w-100 d-flex align-items-end flex-1 justify-content-between">
                            {/* <div className='yourphoto ' >
                                <p className="m-0">Your Photo</p>
                                <p className="plain-text">
                                    This will be displayed on your profile
                                </p>
                            </div> */}
                            <div className="d-flex align-items-end ">
                                <Button className="update-btn black-text " onClick={onClickResetChanges}>
                                    Revert changes
                                </Button>
                                <Button className="ms-3 update-btn text1" type="submit">
                                    Update
                                </Button>

                            </div>
                        </div>
                    </div>



                </Form>
            </div>
            <ToastMessageComponent toastMessage={toastMessage} showToast={showToast} closeToast={() => setShowToast(false)} />
        </div>
    )
}
export default ProfileSettingsComponent;