import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddEquipmentModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'Equipment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EquipmentName: event.target.EquipmentName.value,
                PurchasePrice: event.target.PurchasePrice.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Equipment
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EquipmentName">
                                        <Form.Label>Equipment Name</Form.Label>
                                        <Form.Control type="text" name="EquipmentName" required
                                            placeholder="Equipment Name" />
                                    </Form.Group>

                                    <Form.Group controlId="PurchasePrice">
                                        <Form.Label>Price Purchase</Form.Label>
                                        <Form.Control type="number" name="PurchasePrice" required
                                            placeholder='Purchase Price' />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary mt-3" type="submit" >
                                            Add Equipment
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