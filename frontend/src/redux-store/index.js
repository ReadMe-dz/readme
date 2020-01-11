import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TheReducer from './reducers'
const store = createStore(TheReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default function ReduxStore(props) {
    return (<Provider store={store}>{props.children}</Provider>)
}
