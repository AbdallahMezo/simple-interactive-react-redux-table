import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducer' 

let composeEnhancers = compose

composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(reducer, composeEnhancers(applyMiddleware()))
