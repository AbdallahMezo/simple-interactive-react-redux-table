import intialState from './initialState'
import actions from './actionTypes'

export default (state = intialState, { type, payload }) => {
   
    const action = actions[type]
    if (action) {
        return action(state, payload)
    } else {
        return state
    }
}



