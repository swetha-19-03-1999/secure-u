
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import '../profilesettings/profilesettings.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { CiSettings, CiLogin, CiSearch } from "react-icons/ci";
import ToastMessageComponent from '../toast/toastmessage';
import './profile.css'
import { CardContent, Card, Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import MyProfileAlerts from './myprofilealerts';
import DashBoardComponent from '../dashboard/dashboard';
const ProfileComponent = () => {
    const [userData, setUserData] = useState({});
    const user_id = localStorage.getItem("userid")
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        first_name: "",
        last_name: "",
        user_contact_number: "",
        user_email_id: "",
        user_dob: "", user_university_name: "", employ_id: ""
    })
    const [updateUI, setUpdateUI] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [errorCodes, setErroCodes] = useState({

        emailId: false,
        emailIdCode: "provie valid Email Id",
        user_university_name: false,
        user_university_nameCode: "Password should have 6 charecters",
        user_contact_number: "",
        user_contact_numberCode: "",
        employ_id: "",
        employ_idCode: ""
    })


    const onchangeInputFields = (e) => {
        setUserDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
        
    }
    useEffect(() => {
        const userId = localStorage.getItem('userid')
        axios.get(`http://localhost:3001/admin-users/${userId}`).then((res) => { setUserDetails(res.data) }).catch((e) => {
            console.log(e)

        })
    }, [updateUI])

    const onClickResetChanges = () => {
        setUpdateUI(prev => (!prev))
    }

    const onSubmitUpdateProfileSettings = (e) => {
        e.preventDefault();
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

    useEffect(
        () => {
            if (localStorage.getItem("userid")) {
            } else {
                navigate("/login")

            }


            axios.get(`http://localhost:3001/admin-users/${user_id}`, {
                "main_id": "8989877hhftgh67",
                "user_id": user_id
            }).then((result) => {

                if (result.status === 200 && result.request.readyState === 4) {

                    setUserData(result.data)
                } else {
                    userData([])
                }
            }).catch(e => {
                console.log("internal server error: ", e)
            })

        }, []
    )


    return (

        <div className="profile-component-div ">
            <div className="bg2 page-div black-text text-center skyblue-bg text2">
                Profile 
            </div>
            <div className="part2">

           
                <Container className="profile-cntnr">
                    <Row className="main-page d-flex" >
                        <Col className="side-profile  p-0">
                        {/* <div className=' page-div text2   text-center  profile-head  '>
                    
               Profiles
                </div> */}
                            <Avatar style={{ margin: 'auto' }} sx={{ width: 150, height: 150 ,marginBottom:'10px',marginTop:'20px'}}>{userData.user_name ? userData.user_name[0].toUpperCase() : "A"}</Avatar>
                            <Link to="/settings" className='row_1 mt-3'>
                                <div className='col_1 '>
                                    <CiSettings className='side_nav_icon' />
                                </div>

                                <div className='col_1'>
                                    <p>Profile Settings</p>
                                </div>
                            </Link>

                        </Col>
                        <Col className="main-profile">
                            <MyProfileAlerts />
                            {/* <DashBoardComponent /> */}
                        </Col>
                    </Row>
                </Container>

                <ToastMessageComponent toastMessage={toastMessage} showToast={showToast} closeToast={() => setShowToast(false)} />
            </div>
        </div>
    )
}
export default ProfileComponent;