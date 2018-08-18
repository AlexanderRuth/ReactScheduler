import React from 'react'
import {Panel, Modal, Button, ButtonToolbar} from 'react-bootstrap'

export default class EditObjective extends React.Component {

	constructor(props)
	{
		super(props)

		var objectiveToAdd;

		if (props.edit)
		{
			objectiveToAdd = this.props.default
		}
		else
		{
			objectiveToAdd = {
				title: "",
				tasks: [],               //The list of tasks for the objective being created
				timeCreated: 0,          //The time that the new object was created
			}
		}

		console.log(props)
		this.state = {
			objectiveToAdd: objectiveToAdd,
			show: true,
			taskToAdd: {}
		}
		this.onChangedTitle = this.onChangedTitle.bind(this)
		this.onTaskToAddChange = this.onTaskToAddChange.bind(this)
		this.addTask = this.addTask.bind(this)
		this.removeTaskToAdd = this.removeTaskToAdd.bind(this)
	}

	componentWillReceiveProps(nextProps)
	{
		if(this.props.timestamp != nextProps.timestamp)
			this.setState({show: true})
		if(nextProps.edit)
			this.setState({objectiveToAdd: nextProps.default})
		else
			this.setState({objectiveToAdd: {
				title: "",
				tasks: [],
				timeCreated: 0,          
			}})
	}

	addTask()
	{
		console.log(JSON.stringify(this.state))
		this.setState({objectiveToAdd: {title: this.state.objectiveToAdd.title, tasks: (this.state.objectiveToAdd.tasks ? this.state.objectiveToAdd.tasks.concat(Object.assign({}, this.state.taskToAdd, {timeCreated: (new Date()).getTime()})) : [this.state.taskToAdd]) }});
		this.forceUpdate();
	}
	onTaskToAddChange(e)
	{
		this.setState({taskToAdd: {title: e.target.value, completed: false, timeCreated: 0}});
	}

	onChangedTitle(e)
	{
		this.setState({objectiveToAdd: {title: e.target.value, tasks: this.state.objectiveToAdd.tasks}});
	}

	removeTaskToAdd(num)
	{
		var newTasks = this.state.objectiveToAdd.tasks
		newTasks.splice(num, 1)
		this.setState({objectiveToAdd: {title: this.state.objectiveToAdd.title, tasks: newTasks}});
	}

	render()
	{
		var tasksBeingAdded = []

    	if(this.state.objectiveToAdd.tasks)
    		for (var task in this.state.objectiveToAdd.tasks)
    			{
	    			console.log("Adding")
	    			console.log("Name: ", JSON.stringify(task))
	    			tasksBeingAdded.push(
	    			<Panel style={{overflow: "auto", padding: "10px"}}>
						<p style={{display: "inline"}}>{this.state.objectiveToAdd.tasks[task].title}</p>
						<Button onClick={() => {this.removeTaskToAdd(task)}} style={{float: "right"}} bsStyle='danger'> Remove</Button>
					</Panel>)
				}

		return (<Modal show={this.state.show}>
				<Modal.Header>
					Add Objective
				</Modal.Header>
				<Modal.Body>
					<table>
						<tr>
							<td>
								Objective Title: 
							</td>
							<td style={{width: "5%"}}>
							</td>
							<td>
								<input defaultValue={this.state.objectiveToAdd.title} onChange={this.onChangedTitle} type="text"/>
							</td>
						</tr>
						<tr>
							<td>
								Task:           
							</td>
							<td style={{width: "5%"}}>
							</td>
							<td>
								<input onChange={this.onTaskToAddChange} style={{display: "inline"}} type="text"/>
								<Button style={{marginLeft: "5px"}} onClick={() => {this.addTask()}} >Add</Button>
							</td>
						</tr>
					</table>

					<br />

					{tasksBeingAdded}
					<ButtonToolbar style={{margin: "10px"}}>

						<Button bsStyle='success' onClick={() => {
										var newObjective = this.state.objectiveToAdd;

										{/*If it is a new object, add its timestamp, otherwise, preserve its timestamp */}
										
										if(!this.props.edit)
											newObjective.timeCreated = (new Date()).getTime();
										else
											newObjective.timeCreated = this.props.default.timeCreated

										this.setState({show: false, objectiveToAdd: {title: "", tasks: [], timeCreated: 0}});
										this.props.dispatch(newObjective);}}>Submit</Button>

						<Button bsStyle='danger' onClick={() => {this.setState({show: false})}}>Cancel</Button>
					</ButtonToolbar>
				</Modal.Body>
			</Modal>)
	}
}