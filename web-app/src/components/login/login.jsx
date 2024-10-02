import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function SignIn() {
    const [emailId, setEmailId] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [logginErrors, setLogginErrors] = React.useState({
        show: false,
        message: "Invalid UserName or Password"
    })
    const [errorCodes, setErroCodes] = React.useState({

        emailId: false,
        emailIdCode: "provie valid Email Id",
        password: false,
        passwordCode: "Password should have 6 charecters",

    })
    const navigate = useNavigate()

    const onChangeEmail = (e) => {


        // 2. Email validation using a stricter regular expression:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Allows standard email format
        const nameRegex = /^[a-zA-Z0-9@.]*$/;
        const isValidEmail = emailRegex.test(e.target.value);

        // 3. Update state and provide feedback based on validation:
        if (e.target.value === "") {
            setEmailId("");
            setErroCodes((prev) => ({ ...prev, emailId: true, emailIdCode: "Email is required" }));
        } else if (isValidEmail) {
            setEmailId(e.target.value.toLowerCase()); // Convert to lowercase (optional)
            setErroCodes((prev) => ({ ...prev, emailId: false, emailIdCode: "" }));
        } else {

            setEmailId(e.target.value.toLowerCase()); // Convert to lowercase (optional)


            setErroCodes((prev) => ({ ...prev, emailId: true, emailIdCode: "Invalid email format" }));
        }
    };

    const onPasswordChange = (e) => {

        // 3. Update state and provide feedback based on validation:

        if (e.target.value.length < 6) {
            setPassword(e.target.value);
            setErroCodes(prev => ({ ...prev, password: true, passwordCode: "Password Should have atleast 6 charecters" }))
        }
        else if (e.target.value.length > 20) {
            setErroCodes(prev => ({ ...prev, password: true, passwordCode: "Password Should not more than 20 charecters" }))
        }
        else {
            setPassword(e.target.value);
            setErroCodes(prev => ({ ...prev, password: false, passwordCode: "" }))
        }



    }

    const validateRegistrationFeilds = () => {
        let isvalid = true;


        if (emailId.length < 5) {
            setErroCodes(prev => ({ ...prev, emailId: true, emailIdCode: "Enter valid Email address" }))
            isvalid = false
        } if (password.length < 6) {
            setErroCodes(prev => ({ ...prev, password: true, passwordCode: "password Should have 6 charecters atleast" }))
            isvalid = false
        }

        return isvalid
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValide = validateRegistrationFeilds()
        if (isValide) {

            axios.post("http://localhost:3001/admin-login", {
                user_email_id: emailId,
                user_password_hashcode: bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u'),
            }).then(
                (result) => {

                    if (result.status == 200 && result.request.readyState == 4) {

                        if (typeof result.data === "object" && Object.keys(result.data).length > 0) {
                            
                            localStorage.setItem("userid", result.data[0].user_id)
                            navigate("/")
                        } else {
                            setLogginErrors({ show: true, message: "Invalid UserName or Password" })
                            return
                        }

                    } else {
                        setLogginErrors({ show: true, message: "Invalid UserName or Password" })
                    }

                }
            ).catch(
                (err) => {
                    console.log(err)
                    setLogginErrors({ show: true, message:  ""+err })

                }
            )
        }
        else {
            return
        }
    };
    const onForgotpasswordClick = () => {
        navigate("/forgotPassword")
    }

    const onregisterClick = () => {
        navigate("/register")
    }

    React.useEffect(
        () => {
            if (localStorage.getItem("userid")) {
                navigate("/Home")

            }

        }, []
    )

    return (
        <Container className="cont  d-flex  align-items-center" fluid style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={8} xl={4} className='coloumn'>
                    <div className="text-start mb-4">
                        <h2>Get’s started.</h2>
                        <p>Don’t have an account? <Link to="/register">Sign Up</Link></p>
                        <div className='linediv'>
                            <div className='lineone'><hr></hr></div>
                            <div className='p-1 ms-2 me-2'> or </div>
                            <div className='linetwo'><hr></hr></div>
                        </div>
                    </div>
                    <Form className='p-4'  >


                        <Form.Group controlId="formEmail" className="mt-3 text-start">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className='p-2' type="email" placeholder="Enter email" isInvalid={errorCodes.emailId} onChange={onChangeEmail} />
                            <Form.Control.Feedback type="invalid">
                                {errorCodes.emailIdCode}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mt-3 text-start">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='p-2' value={password} type="password" placeholder="Password" isInvalid={errorCodes.password} onChange={onPasswordChange} />
                            <Form.Control.Feedback type="invalid">
                                {errorCodes.passwordCode}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form>

                    <div className="d-flex justify-content-between align-items-center p-3 mt-3">
                        <Form.Check type="checkbox" label="Remember me" />
                        {/* <a href="/forgot-password">Forgot your password?</a> */}
                        <Link to="/forgotPassword">Forgot-Password ?</Link>
                    </div>
                    <p className="text-danger" hidden={!logginErrors.show}>{logginErrors.message}</p>
                    <div >
                        <Button className='butt w-100' onClick={handleSubmit} >
                            Sign In
                        </Button>

                    </div>

                </Col>
            </Row>
        </Container>
    );
}

export default SignIn;