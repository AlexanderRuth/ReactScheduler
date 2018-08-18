import React from 'react';
import { Modal, Panel, Button, ButtonToolbar, ProgressBar } from 'react-bootstrap';
import Task from './Task.js';
import EditObjective from './EditObjective.js'

export class Objective extends React.Component {

	constructor(props)
	{
		super(props);


		this.state = {
			title: props.title,
			tasks: props.tasks,
			expanded: true,
			edit: false, //Timestamp, same as Body's addObjective

		}

		this.getTaskList = this.getTaskList.bind(this)
		this.getCompletionStatus = this.getCompletionStatus.bind(this)
		this.toggleExpand = this.toggleExpand.bind(this)
	}

	getCompletionStatus()
	{
		var totalTasks = this.props.tasks.length
		var numCompleted = 0

		for(var task = 0; task < this.props.tasks.length; task++)
		{
			if(this.props.tasks[task].completed)
				numCompleted++
		}

		console.log("Percentage: ", numCompleted/totalTasks * 100)
		return Math.ceil(numCompleted/totalTasks * 100)
	}


	getTaskList()
	{
		var tasks = []
		for(var task = 0; task < this.props.tasks.length; task++)
		{
			tasks.push(
					<Task timeCreated={this.props.tasks[task].timeCreated} updateTask={this.props.updateTask} title={this.props.tasks[task].title} completed={this.props.tasks[task].completed} />
				)
		}

		return tasks;
	}

	toggleExpand()
	{
		this.setState({expanded: (this.state.expanded ? false : true)})
	}

	render()
	{

		var completion = this.getCompletionStatus()
		console.log("Tasks: ", this.props.tasks)

		return (
				<div>
				<Panel style={{boxShadow: "5px 10px 10px"}}  expanded={this.state.expanded}>
					<Panel.Heading>
						<h4 style={{display: "inline"}}>{this.props.title} </h4>
						<a>{this.state.expanded ? 
												   <i style={{float: "right"}} onClick={this.toggleExpand} class="fas fa-minus fa-lg" /> :
												   <i style={{float: "right"}} onClick={this.toggleExpand} class="fas fa-plus fa-lg"/>}
						</a>
					</Panel.Heading>
					<Panel.Body>
						<ProgressBar now={completion} bsStyle={completion == 100 ? 'success' : 'warning'} striped />

						<Panel.Collapse>
						{this.getTaskList()}
						</Panel.Collapse>
					</Panel.Body>
					<Panel.Footer>
						<Button bsStyle='danger' onClick={() => {this.props.removeObjective(this.props.timeCreated)}}>Remove</Button>
						<a onClick={() => {this.setState({objectiveBeingEdited: {title: this.props.title, tasks: JSON.parse(JSON.stringify(this.props.tasks)), timeCreated: this.props.timeCreated}});
										this.setState({edit: (new Date()).getTime()})}} style={{float: "right"}}>
								<i class="fas fa-edit fa-lg" />
						</a>
					</Panel.Footer>
				</Panel>

				{/*Editing this objective*/}
				{this.state.edit ? <EditObjective timestamp={this.state.edit} dispatch={this.props.updateObjective} edit 
										default={JSON.parse(JSON.stringify({title: this.props.title, tasks: this.props.tasks, timeCreated: this.props.timeCreated}))}/> : null}	
			</div>
			)
	}

}
