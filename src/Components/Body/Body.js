import { Objective } from './Objective.js';
import { addObjective } from '../../Creators/creators.js';
import React from 'react';
import { Button } from 'react-bootstrap';

export class Body extends React.Component {

	constructor(props)
	{
		super(props)

		this.getObjectiveList = this.getObjectiveList.bind(this)
	}

	getObjectiveList()
	{
		var objectives = []
		for(var objective = 0; objective < this.props.objectives.length; objective++)
		{
			objectives.push(<Objective title={this.props.objectives[objective].title} tasks={this.props.objectives[objective].tasks} />)
		}
	}
    render() {
	
		return ( <div>
			{this.getObjectiveList()}
			<Button onClick={this.props.addObjective({title: "New Objective", tasks: [{title: "hi", completed: false}]})}> Add Objective </Button>
			</div>
			);
    }
}
