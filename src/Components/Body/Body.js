import { Objective } from './Objective.js';
import { addObjective } from '../../Creators/creators.js';
import React from 'react';
import { Button, Grid, Row, Col, Modal, FormGroup, ButtonToolbar, Panel} from 'react-bootstrap';

export class Body extends React.Component {

	constructor(props)
	{
		super(props)

		this.state = {
			addObjective: false,
			objectiveToAdd: {
				title: "",
				tasks: [],
			},
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
		this.setState({objectiveToAdd: {title: this.state.objectiveToAdd.title, tasks: (this.state.objectiveToAdd.tasks ? this.state.objectiveToAdd.tasks.concat(this.state.taskToAdd) : [this.state.taskToAdd]) }});
		this.forceUpdate();
	}
	onTaskToAddChange(e)
	{
		this.setState({taskToAdd: {title: e.target.value, completed: false}});
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
			objectives.push(<Objective title={this.props.objectives[objective].title} id={objective} tasks={this.props.objectives[objective].tasks} />)
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
	
		return ( <div>
			{this.objectivesToGrid(this.getObjectiveList())}
			<Button onClick={() => {this.setState({addObjective: true})}} > Add Objective </Button>

			{/*Creating new objectives*/}
			<Modal show={this.state.addObjective}>
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
								<input onChange={this.onChangedTitle} type="text"/>
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

					{tasksBeingAdded}
					<ButtonToolbar style={{margin: "10px"}}>
						<Button bsStyle='success' onClick={() => {this.props.addObjective(this.state.objectiveToAdd); this.setState({addObjective: false, objectiveToAdd: {title: "", tasks: []}})}}>Submit</Button>
						<Button bsStyle='danger' onClick={() => {this.setState({addObjective: false})}}>Cancel</Button>
					</ButtonToolbar>
				</Modal.Body>
			</Modal>
			</div>
			);
    }
}
