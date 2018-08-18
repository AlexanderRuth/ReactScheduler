import { Objective } from './Objective.js';
import { addObjective } from '../../Creators/creators.js';
import EditObjective from './EditObjective.js'
import React from 'react';
import { Button, Grid, Row, Col, Modal, FormGroup, ButtonToolbar, Panel} from 'react-bootstrap';

export class Body extends React.Component {

	constructor(props)
	{
		super(props)

		this.state = {
			addObjective: false,         //Whether an objective is being added or not, is the timestamp it was updated if changed. This is so the Edit Objective
										 //Can know whether the request to render is new or old. So, if add objective is clicked, the timestamp is updated, and EditObjective reopens
			editObjective: false,
			objectiveToAdd: {
				title: "",
				tasks: [],               //The list of tasks for the objective being created
				timeCreated: 0,          //The time that the new object was created
			},
			objectiveBeingEdited: 0,	 //If an objective is being edited, not created, this is its timestamp
			taskToAdd: {},
		}

		this.getObjectiveList = this.getObjectiveList.bind(this)
		this.onChangedTitle = this.onChangedTitle.bind(this)
		this.onTaskToAddChange = this.onTaskToAddChange.bind(this)
		this.addTask = this.addTask.bind(this)
		this.removeTaskToAdd = this.removeTaskToAdd.bind(this)
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

	getObjectiveList()
	{
		var objectives = []
		for(var objective = 0; objective < this.props.objectives.length; objective++)
		{
			objectives.push(<Objective updateObjective={this.props.updateObjective} updateTask={this.props.updateTask} removeObjective={this.props.removeObjective} timeCreated={this.props.objectives[objective].timeCreated} title={this.props.objectives[objective].title} id={objective} tasks={this.props.objectives[objective].tasks} />)
		}
		return objectives
	}

	objectivesToGrid(objectives)
	{
		const OBJECTIVES_PER_ROW = 3; //1, 2, 3, 4, 6, or 12
		var listToReturn = [];
		var rowOfObjects = [];
		var curRow;

		var colWidth = 12 / OBJECTIVES_PER_ROW;

		for(var objective = 0; objective < objectives.length; objective++)
		{
			if(objective !=  0 && objective % OBJECTIVES_PER_ROW == 0)
			{
				curRow = <Row>{rowOfObjects}</Row>
				rowOfObjects = []
				listToReturn.push(curRow);
			}

			rowOfObjects.push(<Col lg={colWidth} md={colWidth}>{objectives[objective]}</Col>)
		}

		curRow = <Row>{rowOfObjects}</Row>
		listToReturn.push(curRow)

		return <Grid style={{width: '100%'}}>{listToReturn}</Grid>


	}
    render() {

    	console.log("rerendering")
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
	
		return (
			<div>
			<div style={{textAlign: "center"}}>
				<Button style={{marginBottom: "20px"}} bsStyle='success' onClick={() => {this.setState({addObjective: (new Date()).getTime()})}} > Add Objective </Button>
			</div>
			{this.objectivesToGrid(this.getObjectiveList())}

			{/*Creating new objectives*/}
			{this.state.addObjective ? <EditObjective timestamp={this.state.addObjective} dispatch={this.props.addObjective}/> : null}	
			</div>
			);
    }
}
