import {ADD_OBJECTIVE} from '../Constants/constants.js'

export function addObjective(body)
{
	return {
		type: ADD_OBJECTIVE,
		body: body
	}
}
