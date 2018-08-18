import {ADD_OBJECTIVE, REMOVE_OBJECTIVE, UPDATE_TASK, UPDATE_OBJECTIVE} from '../Constants/constants.js'

var initialState = {
	objectives: []
}

export function rootReducer(state = initialState, action)
{
	if (typeof state === 'undefined')
		return initialState

	console.log("STATE: ", state)
	console.log("ACTION: ", action.type)

	switch(action.type)
	{
	    case ADD_OBJECTIVE:
	
			return Object.assign({}, state, {objectives: state.objectives.concat(action.body)})

		case REMOVE_OBJECTIVE:

			return Object.assign({}, state, {objectives: state.objectives.filter((item) => { return item.timeCreated !== action.timeCreated })})

		case UPDATE_TASK:

			//Make a deep copy
			var deepCopy = JSON.parse(JSON.stringify(state))

			//Update the task matching the timestamp
			for (var i = 0; i < deepCopy.objectives.length; i++)
			{
				for (var j = 0; j < deepCopy.objectives[i].tasks.length; j++)
				{
					if(deepCopy.objectives[i].tasks[j].timeCreated == action.timeCreated)
						deepCopy.objectives[i].tasks[j] = action.body
				}
			}

			return deepCopy

		case UPDATE_OBJECTIVE:

			var deepCopy = JSON.parse(JSON.stringify(state))

			console.log("WANT: ", action.body.timeCreated)
			for (var i = 0; i < deepCopy.objectives.length; i++)
			{
				console.log("CHECKING: ", deepCopy.objectives[i].timeCreated)
				if(deepCopy.objectives[i].timeCreated == action.body.timeCreated)
				{
					console.log("UPDATING: ", action.body)
					deepCopy.objectives[i] = JSON.parse(JSON.stringify(action.body))
				}
			}

			return deepCopy

	    default:
			return state;
	}

}
