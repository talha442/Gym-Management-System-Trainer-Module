import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditEquipmentModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'Equipment', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EquipmentID: event.target.EquipmentID.value,
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
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Equipment Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="EquipmentID">
                                        <Form.Label>Equipment ID</Form.Label>
                                        <Form.Control type="text" name="EquipmentID" required
                                            disabled
                                            defaultValue={this.props.EquipmentID}
                                            placeholder="EquipmentID" />
                                    </Form.Group>

                                    <Form.Group controlId="EquipmentName">
                                        <Form.Label>Equipment Name</Form.Label>
                                        <Form.Control type="text" name="EquipmentName" required
                                            defaultValue={this.props.EquipmentName}
                                            placeholder="EquipmentName" />
                                    </Form.Group>

                                    <Form.Group controlId="PurchasePrice">
                                        <Form.Label>Purchase Price</Form.Label>
                                        <Form.Control type="number" name="PurchasePrice" required
                                            defaultValue={this.props.PurchasePrice}
                                            placeholder="PurchasePrice" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary mt-3" type="submit">
                                            Update Equipment
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