import React,{Component} from 'react'
import { Table } from 'react-bootstrap'
import '../Stylesheets/Equipment.css'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddTrainerModal } from './AddTrainerModal';
import { EditTrainerModal } from './EditTrainerModal';

export class Trainer extends Component {

    //Creating Constructor for Class
    //Creating State for Class
    constructor(props) {
        super(props);
        this.state = {
            Trainers: [],
            addModalShow: false,
            editModalShow: false,
        }
    }

    //Creating LifeCycle for Class
    refreshList() {
        fetch(process.env.REACT_APP_API + 'Trainer/')
        .then(response => response.json())
        .then(data => {
            this.setState({Trainers:data});
        });
    }
    //Creating Method for Class
    componentDidMount() {
        this.refreshList()
    }
    componentDidUpdate() {
        this.refreshList()
    }

    deleteTrainer(tID) {
        if(window.confirm("Are you sure you want to delete this Trainer?")) {
            fetch(process.env.REACT_APP_API+'Trainer/' + tID, {
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
        //Here we create the variable for Trainer
        const {Trainers, TrainerID, TrainerName, TrainerEmail, TrainerSalary} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="lg">
                    <thead className="Classtbl">
                        <th>Trainer ID</th>
                        <th>Trainer Name</th>
                        <th>Trainer Email</th>
                        <th>Trainer Salary</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {Trainers.map(ts =>
                            <tr key={ts.TrainerID}>
                                <td>{ts.TrainerID}</td>
                                <td>{ts.TrainerName}</td>
                                <td>{ts.TrainerEmail}</td>
                                <td>{ts.TrainerSalary}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button variant="success"
                                            onClick={() => this.setState({editModalShow: true, 
                                            TrainerID: ts.TrainerID, 
                                            TrainerName: ts.TrainerName, 
                                            TrainerEmail: ts.TrainerEmail, 
                                            TrainerSalary: ts.TrainerSalary})}
                                            style={{margin: '0 10px 0 10px'}}>
                                             <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Client
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteTrainer(ts.TrainerID)}>
                                                <i class="fa fa-trash-o" aria-hidden="true"></i> Delete Client
                                        </Button>
                                        <EditTrainerModal show={this.state.editModalShow} 
                                            onHide={editModalClose} 
                                            tsID={TrainerID} 
                                            tsName={TrainerName}
                                            tsEmail={TrainerEmail}
                                            tsSalary={TrainerSalary}
                                            />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary" 
                            onClick={() => this.setState({addModalShow: true})}>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Trainer
                    </Button>
                    <AddTrainerModal show={this.state.addModalShow}
                                    onHide={addModalClose} />

                </ButtonToolbar>
            </div>
        )
    }
}
