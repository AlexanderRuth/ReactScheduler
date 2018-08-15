import React from 'react';
import { Panel } from 'react-bootstrap';

export class Objective extends React.Component {

	constructor(props)
	{
		super(props);

		this.getTaskList = this.getTaskList.bind(this);
	}

	getTaskList()
	{
		var tasks = []
		for(var task = 0; task < this.props.tasks.length; task++)
		{
			tasks.push(
				<p>this.props.tasks[task].title</p>
				)
		}

		return tasks;
	}

	render()
	{
		return (
				<Panel>
					<Panel.Heading>{this.props.title}</Panel.Heading>
					<Panel.Body>
						{this.getTaskList()}
					</Panel.Body>
				</Panel>
			)
	}

}
