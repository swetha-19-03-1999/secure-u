import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
const ReportIncidentMiniCard = () => {

    return (
            <Col xs={12} lg={4} className="bg-light-yellow card-col">

                <Col xs={12} className="card-header">

                    <p>Report Incident</p>
                    <img className="profile-image" src={"https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"} alt={"profile images"} />

                </Col>
                <Col >
                    <Form className="bg-light-yellow">
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Student name</Form.Label>
                            <Form.Control className="form-controlcls bg-white-yellow" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Student contact</Form.Label>
                            <Form.Control className="form-controlcls bg-white-yellow" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3 form-groupcls" controlId="exampleForm.ControlInput1">
                            <Form.Label className="form-labelcls"  >Student Location</Form.Label>
                            <Form.Control className="form-controlcls bg-white-yellow" placeholder="" />
                        </Form.Group>
                    </Form>
                </Col>
            </Col>
    )
}
export default ReportIncidentMiniCard