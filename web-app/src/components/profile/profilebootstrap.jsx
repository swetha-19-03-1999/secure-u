import { Call, Circle, DateRange, Email, House, LocationCity, PermIdentity, Place } from "@mui/icons-material"
import { CardContent, Container, Card, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack, Button } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import './profile.css'
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
// import PostsTabs from "./profileTabscomponents/poststabs"

function ProfileComponent() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({});
    const [show, setShow] = useState(false);
    const user_id = localStorage.getItem("userid")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onLogout(){
        localStorage.removeItem("userid")
        navigate("/login")

    }
    function Path() {
        navigate('/changePass')

    }
    const onLogoutClick = () => {

        localStorage.removeItem("userid")
        navigate('/login')
        handleClose();
    }

    function Path2() {
        navigate('/forgotPassword')
    }

    const getProfileSettingsOptionsJSX = () => {

        return (
            <Grid container xs={12} className=" flex-column">

                <Avatar style={{ margin: 'auto' }} sx={{ width: 100, height: 100 }}>{userData.user_name ? userData.user_name[0].toUpperCase() : "A"}</Avatar>
                <Stack direction="row" spacing={2}>
                    <List>
                        <ListItem>
                            <Button variant="text" color="info">Change Image</Button>
                        </ListItem>
                        <ListItem>
                            <Button onClick={() => Path()} variant="text" color="primary">Change Password</Button>
                        </ListItem>
                        <ListItem>
                            <Button onClick={() => Path2()} variant="text">Forgot Password</Button>
                        </ListItem>
                        {/* <ListItem>
                            <Button onClick={() => navigate(`/myaddress/${localStorage.getItem("userid")}`)} variant="text">My Address</Button>
                        </ListItem> */}
                        {/* <ListItem>
                            <Button onClick={() => navigate(`/saveforlater`)} variant="text">Save for later Items</Button>
                        </ListItem> */}
                        {/* <ListItem>
                            <Button onClick={() => navigate(`/helpandsupport`)} variant="text">Help & Support</Button>
                        </ListItem> */}
                        <ListItem>
                            <Button onClick={handleShow}>LogOut</Button>
                        </ListItem>
                    </List>
                </Stack>

            </Grid>
        )
    }
    React.useEffect(
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

        <div>
            <Container component={"main"} maxWidth="lg">
                <h2 className=" text-start " style={{fontWeight:'700',padding:"10px 0px 0px 0px"}}>Profile</h2>
                <Card sx={{ elevation: true ,padding:'0px'} } elevation={0} >
                    <CardContent align="center" className="pb-0"  >
                        <Grid container spacing={2}  >
                            <Grid container xs={12} sm={6} md={4} className="d-none d-md-block" >
                                {getProfileSettingsOptionsJSX()}
                            </Grid>
                            {/* <Grid  item xs={12} sm={6} md={4} className="settingsoption1 d-none d-md-block">
                    <Avatar style={{margin:'auto'}} sx={{ width: 100, height: 100 }}>{userData.UserFirstName ? userData.UserFirstName[0].toUpperCase() : "A"}</Avatar>
                    <Stack direction="row" spacing={2}>
                    <List>
                        <ListItem>
                            <Button  variant="text" color="info">Change Image</Button>
                        </ListItem>
                        <ListItem>
                        <Button onClick={()=>Path()} variant="text" color="primary">Change Password</Button>
                        </ListItem>                    
                        <ListItem>
                        <Button onClick={()=>Path2()} variant="text">Forgot Password</Button>                        
                        </ListItem>
                        <ListItem>
                        <Button onClick={()=> navigate(`/myaddress/${localStorage.getItem("userid")}`)} variant="text">My Address</Button>                        
                        </ListItem>
                        <ListItem>
                        <Button onClick={()=> navigate(`/saveforlater`)} variant="text">Save for later Items</Button>                        
                        </ListItem>
                        <ListItem>
                        <Button onClick={()=> navigate(`/helpandsupport`)} variant="text">Help & Support</Button>                        
                        </ListItem>
                        <ListItem>
                            <Button   onClick={handleShow}>LogOut</Button>
                        </ListItem>
                    </List>
                    </Stack>
    
                    </Grid> */}

                            <Grid item xs={12} sm={6} md={8} className="settingsoption2 profilev2">

                                {/* <PostsTabs userData={userData} getProfileSettingsOptionsJSX={getProfileSettingsOptionsJSX} /> */}
                            </Grid>

                        </Grid>



                    </CardContent>
                </Card>
            </Container>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> <Circle /> Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want logout</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={onLogoutClick}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    )

}
export default ProfileComponent