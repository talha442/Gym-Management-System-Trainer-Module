import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import '../Stylesheets/Equipment.css'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddEquipmentModal } from './AddEquipmentModal';
import { EditEquipmentModal } from './EditEquipmentModal';

export class Equipment extends Component {

    //Creating Constructor for Equipment
    //Creating State for Equipment
    constructor(props) {
        super(props);
        this.state = {
            Equipments: [],
            addModalShow: false,
            editModalShow: false,
        }
    }

    //Creating LifeCycle for Equipment
    refreshList() {
        fetch(process.env.REACT_APP_API + 'Equipment')
            .then(response => response.json())
            .then(data => {
                this.setState({ Equipments: data });
            });
    }
    //Creating Method for Equipment
    componentDidMount() {
        this.refreshList()
    }
    componentDidUpdate() {
        this.refreshList()
    }

    deleteEquipment(EquipmentID) {
        if (window.confirm("Are you sure you want to delete this Equipment?")) {
            fetch(process.env.REACT_APP_API + 'Equipment/' + EquipmentID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(() => {
                this.refreshList()
            })
        }

    }
    render() {
        //Here we create the variable for Equipment
        const { Equipments, EquipmentID, EquipmentName, PurchasePrice } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="lg">
                    <thead className="Equipmenttbl">
                        <th>Equipment ID</th>
                        <th>Equipment Name</th>
                        <th>Purchase Price</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {Equipments.map(Equipment =>
                            <tr key={Equipment.EquipmentID}>
                                <td>{Equipment.EquipmentID}</td>
                                <td>{Equipment.EquipmentName}</td>
                                <td>{Equipment.PurchasePrice}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button variant="success"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                EquipmentID: Equipment.EquipmentID, EquipmentName: Equipment.EquipmentName, PurchasePrice: Equipment.PurchasePrice
                                            })}
                                            style={{ margin: '0 10px 0 10px' }}>
                                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Equipment
                                        </Button>
                                        <Button variant="danger"
                                            onClick={() => this.deleteEquipment(Equipment.EquipmentID)}>
                                            <i class="fa fa-trash-o" aria-hidden="true"></i> Delete Equipment
                                        </Button>
                                        <EditEquipmentModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            EquipmentID={EquipmentID} EquipmentName={EquipmentName} PurchasePrice={PurchasePrice} />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary"
                        onClick={() => this.setState({ addModalShow: true })}>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Equipment
                    </Button>
                    <AddEquipmentModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}