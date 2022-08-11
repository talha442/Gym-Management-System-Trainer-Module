import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditTrainerModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Trainer',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                TrainerID:event.target.TrainerID.value,
                TrainerName: event.target.TrainerName.value,
                TrainerEmail: event.target.TrainerEmail.value,
                TrainerSalary: event.target.TrainerSalary.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Client Details
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col md={12}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="TrainerID">
                        <Form.Label>Trainer ID</Form.Label>
                        <Form.Control type="text" name="TrainerID" required
                        disabled
                        defaultValue={this.props.TrainerID} 
                        placeholder="Trainer ID"/>
                    </Form.Group>

                    <Form.Group controlId="TrainerName">
                        <Form.Label>Client Name</Form.Label>
                        <Form.Control type="text" name="TrainerName" required 
                        defaultValue={this.props.TrainerName}
                        placeholder="Trainer Name"/>
                    </Form.Group>

                    <Form.Group controlId="TrainerEmail">
                        <Form.Label>Client Program</Form.Label>
                        <Form.Control type="text" name="TrainerEmail" required 
                        defaultValue={this.props.TrainerEmail}
                        placeholder="Trainer Email"/>
                    </Form.Group>

                    <Form.Group controlId="TrainerSalary">
                        <Form.Label>Client Program</Form.Label>
                        <Form.Control type="text" name="TrainerSalary" required 
                        defaultValue={this.props.TrainerSalary}
                        placeholder="Trainer Salary"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary mt-3" type="submit">
                            Update Class
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}