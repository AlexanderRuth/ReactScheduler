import {connect} from 'react-redux'
import { Body } from '../Components/Body/Body.js'
import {addObjective, removeObjective, updateTask, updateObjective} from '../Creators/creators.js'

const mapStateToProps = state => {

	return {
		objectives: state.objectives,
	}
}

const mapDispatchToProps = dispatch => {

	return {
		addObjective: (objective) => {dispatch(addObjective(objective))},
		removeObjective: (timeCreated) => {dispatch(removeObjective(timeCreated))},
		updateTask: (timeCreated, updatedTask) => {dispatch(updateTask(timeCreated, updatedTask))},
		updateObjective: (updatedObjective) => {dispatch(updateObjective(updatedObjective))}
	}
}

const VisibleBody = connect(
	mapStateToProps,
	mapDispatchToProps
)(Body)

export default VisibleBody