import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import Task from './Task.js';

export class Objective extends React.Component {

	constructor(props)
	{
		super(props);


		this.state = {
			title: props.title,
			tasks: props.tasks,
		}

		this.getTaskList = this.getTaskList.bind(this);
		this.toggleTask = this.toggleTask.bind(this);
	}


	toggleTask(num)
	{
	}
	getTaskList()
	{
		var tasks = []
		for(var task = 0; task < this.props.tasks.length; task++)
		{
			tasks.push(
					<Task title={this.props.tasks[task].title} completed={this.props.tasks[task].completed} />
				)
		}

		return tasks;
	}

	render()
	{
		return (
				<Panel>
					<Panel.Heading>
						{this.props.title}
					</Panel.Heading>
					<Panel.Body>
						{this.getTaskList()}
					</Panel.Body>
				</Panel>
			)
	}

}
