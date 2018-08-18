import {ADD_OBJECTIVE, REMOVE_OBJECTIVE, UPDATE_TASK, UPDATE_OBJECTIVE} from '../Constants/constants.js'

export function addObjective(body)
{
	return {
		type: ADD_OBJECTIVE,
		body: body
	}
}

export function removeObjective(timeCreated)
{
	return {
		type: REMOVE_OBJECTIVE,
		timeCreated: timeCreated
	}
}

export function updateTask(timeCreated, updatedTask)
{
	return {
		type: UPDATE_TASK,
		body: updatedTask,
		timeCreated: timeCreated
	}
}

export function updateObjective(updatedObjective)
{
	return {
		type: UPDATE_OBJECTIVE,
		body: updatedObjective
	}
}
