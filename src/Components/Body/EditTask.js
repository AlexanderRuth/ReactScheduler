import React from 'react';

export class EditTask extends React.Component
{
	render()
	{
		<Panel style={{overflow: "auto", padding: "10px"}}>
				<p style={{display: "inline"}}>{this.props.tasks[task].title}</p>
				<Button style={{float: "right"}} bsStyle={this.props.tasks[task].completed ? 'success' : 'danger'}>{this.props.tasks[task].completed ? "Completed" : "Incomplete"}</Button>
		</Panel>
	}
}