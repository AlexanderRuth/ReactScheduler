import {ADD_OBJECTIVE} from '../Constants/constants.js'

var initialState = {
	objectives: [
	    {
		title: "Objective Title",
		tasks:
		    [
			{
			    title: "This is a task",
			    completion: false
			}	 
		    ]
	    }

	]
}

export function rootReducer(state = initialState, action)
{
	if (typeof state === 'undefined')
		return initialState

	console.log("STATE: ", state)

	switch(action.type)
	{
	    case ADD_OBJECTIVE:
	    	console.log("Adding " + action.body.tasks);
			return Object.assign({}, state, {objectives: state.objectives.concat(action.body)})

	    default:
			return state;
	}

}
