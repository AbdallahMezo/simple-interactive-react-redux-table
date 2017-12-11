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




// function sum(...args) {
//     return args.reduce((res, value) => {
//         return value + preValue
//     }, 0)
// }

// if (!Object.assign) {
//     Object.assign = function assignAll(...args) {
//         return  args.reduce((res, obj) => {
//             return {
//                 ...res,
//                 ...obj,
//             }
//         }, {})
//     }
// }