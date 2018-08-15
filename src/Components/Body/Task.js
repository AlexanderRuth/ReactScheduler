import React from 'react';
import {Panel, Button} from 'react-bootstrap';
export default class Task extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			completed: props.completed,
		}

		this.toggleState = this.toggleState.bind(this)
	}

	toggleState()
	{
		this.setState({completed: (this.state.completed ? false : true)});
	}
	render()
	{
		return (
		<Panel style={{overflow: "auto", padding: "10px"}}>
				<p style={{display: "inline"}}>{this.props.title}</p>
				<Button onClick={ () => {this.toggleState()} } style={{float: "right"}} bsStyle={this.state.completed ? 'success' : 'danger'}>{this.state.completed ? "Completed" : "Incomplete"}</Button>
		</Panel>)
	}
}