import {connect} from 'react-redux'
import { Body } from '../Components/Body/Body.js'
import {addObjective} from '../Creators/creators.js'

const mapStateToProps = state => {

	return {
		objectives: state.objectives,
	}
}

const mapDispatchToProps = dispatch => {

	return {
		addObjective: (objective) => {dispatch(addObjective(objective))}
	}
}

const VisibleBody = connect(
	mapStateToProps,
	mapDispatchToProps
)(Body)

export default VisibleBody