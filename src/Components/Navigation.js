import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to="/Equipment" className="d-inline p-2 bg-dark text-white text-decoration-none" activeClassName="active">Equipment Management</NavLink>
                        <NavLink to="/Trainer" className="d-inline p-2 bg-dark text-white text-decoration-none" activeClassName="active">Trainer Management</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
