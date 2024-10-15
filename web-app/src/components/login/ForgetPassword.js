import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function ForgetPassword() {
  const [errorCode, setErrorcode] = React.useState("")
  const [showErrors, setShowErrors] = React.useState(false)
  const [firstName, setFirstName] = React.useState("")
  const [name, setName] = React.useState("")
  const [userName, setUserName] = React.useState("")
  const [universityName, setUniversityName] = React.useState("")
  const [employId, setEmployId] = React.useState("")
  const [contactNumber, setContactNumber] = React.useState("")
  const [emailId, setEmailId] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [logginErrors, setLogginErrors] = React.useState({
    show: false,
    message: "Invalid UserName or Password"
  })
  const [errorCodes, setErroCodes] = React.useState({
    firstName: false,
    firstNameCode: "Name Should have 3 charecters atleast",
    name: false,
    nameCode: "Name Should have 3 charecters atleast",
    userName: false,
    userNameCode: "User Name Should have 3 charecters atleast",
    universityName: "",
    universityNameCode: "User Name Should have 3 charecters atleast",
    employId: false,
    employIdCode: "User Name Should have 6 charecters atleast",
    contactNumber: false,
    contactNumberCode: "Contact Number should have 10digits",
    emailId: false,
    emailIdCode: "provie valid Email Id",
    password: false,
    passwordCode: "Password should have 6 charecters",
    confirmPassword: false,
    confirmPasswordCode: "confirm password should match with password",
  })
  const navigate = useNavigate();

  const onChangeFirstName = (e) => {


    const nameRegex = /^[a-zA-Z ]+$/; // Allows letters (uppercase and lowercase), spaces, and periods

    // 3. Update state and provide feedback based on validation:
    if (e.target.value == "") {
      setFirstName(e.target.value);
      setErroCodes(prev => ({ ...prev, firstName: true, firstNameCode: "Name Should have 3 charecters atleast" }))
    }
    else if (nameRegex.test(e.target.value)) {
      if (e.target.value.length < 3) {
        setFirstName(e.target.value);
        setErroCodes(prev => ({ ...prev, firstName: true, firstNameCode: "Name Should have 3 charecters atleast" }))
      }
      else if (e.target.value.length >= 20) {
        setErroCodes(prev => ({ ...prev, firstName: true, firstNameCode: "Name Should not greater than 20 charecters" }))
      }
      else {
        setFirstName(e.target.value);
        setErroCodes(prev => ({ ...prev, firstName: false, firstNameCode: "" }))
      }

    } else {
      // Provide informative error message or visual feedback (e.g., highlighting the input)
      setErroCodes(prev => ({ ...prev, firstName: true, firstNameCode: "Invalid name: Please enter only letters, spaces" }))

    }

  }

  const onChangeName = (e) => {


    const nameRegex = /^[a-zA-Z ]+$/; // Allows letters (uppercase and lowercase), spaces, and periods

    // 3. Update state and provide feedback based on validation:
    if (e.target.value == "") {
      setName(e.target.value);
      setErroCodes(prev => ({ ...prev, name: true, nameCode: "Name Should have 3 charecters atleast" }))
    }
    else if (nameRegex.test(e.target.value)) {
      if (e.target.value.length < 3) {
        setName(e.target.value);
        setErroCodes(prev => ({ ...prev, name: true, nameCode: "Name Should have 3 charecters atleast" }))
      }
      else if (e.target.value.length >= 20) {
        setErroCodes(prev => ({ ...prev, name: true, nameCode: "Name Should not greater than 20 charecters" }))
      }
      else {
        setName(e.target.value);
        setErroCodes(prev => ({ ...prev, name: false, nameCode: "" }))
      }

    } else {
      // Provide informative error message or visual feedback (e.g., highlighting the input)
      setErroCodes(prev => ({ ...prev, name: true, nameCode: "Invalid name: Please enter only letters, spaces" }))

    }

  }

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
    if ((e.target.value.length >= 6) && (e.target.value == confirmPassword)) {

      setErroCodes(prev => ({ ...prev, confirmPassword: false, confirmPasswordCode: "" }))
    }


  }



  const validateRegistrationFeilds = () => {
    let isvalid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Allows standard email format

    if (firstName.length < 6) {
      setErroCodes(prev => ({ ...prev, firstName: true, }))
      isvalid = false
    }
    if (name.length < 6) {
      setErroCodes(prev => ({ ...prev, name: true, }))
      isvalid = false
    }
   
    if (!emailRegex.test(emailId)) {
      setErroCodes(prev => ({ ...prev, emailId: true, emailIdCode: "Enter valid Email address" }))
      isvalid = false
    } 
    if (password.length < 6) {
      setErroCodes(prev => ({ ...prev, password: true, passwordCode: "password Should have 6 charecters atleast" }))
      isvalid = false
    } 

    return isvalid
  }

  const handleSubmit = (event) => {
    navigate('/login');
    // event.preventDefault();


    // const isValide = validateRegistrationFeilds()
    // if (isValide) {
    //   const SecurityCustomSalt = '$2a$10$CwTycUXWue0Thq9StjUM0u'

    //   const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    //   const userDeatailsObj = {
       
    //     "first_name":firstName,
    //     "last_name":name,
    //     "user_role": "security",
    //     "user_email_id": emailId,
    //     "user_password_hashcode": hashedPassword
    //   }


    //   axios.post('http://localhost:3001/registersecurityusers', userDeatailsObj).then((res) => {

    //     //if the registration successfull then it will returns 1 from the database so add a flag to check wether it succssfull or not.

    //     navigate('/Login')


    //   }).catch((e) => {
    //     setLogginErrors({show:true,message:"Error Accured "+e})
           
    //   })
    // } else {
    //   return
    // }
  };

  React.useEffect(
    () => {
      if (localStorage.getItem("userid")) {
        navigate("/home")

      }

    }, []
  )

  
  return (
    <Container className="cont  d-flex  align-items-center" fluid style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={8} xl={4} className='coloumn'>
          <div className="text-start mb-4">
            <h2>Forgot your Password ?</h2>
            <p>Remember your password? <Link to="/login">Sign in</Link></p>
            {/* <div className='linediv'>
              <div className='lineone'><hr></hr></div>
              <div className='p-1 ms-2 me-2'> or </div>
              <div className='linetwo'><hr></hr></div>
            </div> */}
          </div>
          <Form className='p-4'>
            
          <Form.Group controlId="formResEmail" className="mt-3 text-start">
              <Form.Label>Registered Email</Form.Label>
              <Form.Control className='p-2' type="email"
                placeholder="Enter your registered email"
                onChange={onChangeEmail} isInvalid={errorCodes.emailId} autoComplete={false} autoSave={false}
              />
              <Form.Control.Feedback type="invalid">
                {errorCodes.emailIdCode}
              </Form.Control.Feedback>
              </Form.Group>


            <Form.Group controlId="formNewPassword" className="mt-3 text-start">
              <Form.Label>New Password</Form.Label>
              <Form.Control className='p-2' type="password" autoComplete={false} autoSave={false}
                placeholder="Password" isInvalid={errorCodes.password} onChange={onPasswordChange} />
              <Form.Control.Feedback type="invalid">
                {errorCodes.passwordCode}
              </Form.Control.Feedback> </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3 text-start">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control className='p-2' type="password"
                placeholder="Confirm Password" isInvalid={errorCodes.password} onChange={onPasswordChange} />
              <Form.Control.Feedback type="invalid">
                {errorCodes.passwordCode}
              </Form.Control.Feedback> </Form.Group>
          
          </Form>
          <p className="text-danger mt-2" hidden={!logginErrors.show}>{logginErrors.message}</p>
          <div >
            <Button className='butt w-100 mt-4' onClick={handleSubmit}>
              Change Password
            </Button>

          </div>

        </Col>
      </Row>
    </Container>
  );
}

export default ForgetPassword;
