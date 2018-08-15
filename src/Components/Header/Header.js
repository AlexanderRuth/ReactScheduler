import React from 'react';
import { Navbar, Button, Nav, NavItem } from 'react-bootstrap';

export default class Header extends React.Component {

    render()
	{
		return (
		<Navbar inverse fluid staticTop>
		    <Navbar.Header>
			<Navbar.Brand>
				Scheduler
			</Navbar.Brand>
		    </Navbar.Header>
		    <Navbar.Collapse>
			<Nav>
			    <NavItem>
		        	Home
			    </NavItem>
			    <NavItem>
				Settings
			    </NavItem>
			</Nav>

			<Navbar.Form pullRight>
			    <Button bsStyle='primary'>Login</Button>
			</Navbar.Form>
		    </Navbar.Collapse>
		</Navbar>);

	}

}
