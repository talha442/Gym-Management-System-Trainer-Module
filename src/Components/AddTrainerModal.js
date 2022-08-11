import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddTrainerModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Trainer',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
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
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Trainer
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="TrainerName">
                        <Form.Label>Trainer Name</Form.Label>
                        <Form.Control type="text" name="TrainerName" required 
                        placeholder="Trainer Name"/>
                    </Form.Group>

                    <Form.Group controlId="TrainerEmail">
                        <Form.Label>Trainer Email</Form.Label>
                        <Form.Control type="text" name="TrainerEmail" required 
                        placeholder="Trainer Email"/>
                    </Form.Group>

                    <Form.Group controlId="TrainerSalary">
                        <Form.Label>Trainer Salary</Form.Label>
                        <Form.Control type="text" name="TrainerSalary" required 
                        placeholder="Trainer Salary"/>
                    </Form.Group>

                    <Form.Group>
                        <Button  variant="primary mt-3" type="submit" >
                            Add New Trainer
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