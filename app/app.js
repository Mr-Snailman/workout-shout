import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import BmrCalculator from './BmrCalculator'
import Timer from './Timer'

import reducer from './reducers/index'

import { Jumbotron, Nav, NavItem } from 'react-bootstrap'


const store = createStore(reducer)

const appRender = () => {
  ReactDOM.render(
    <div>
      <Jumbotron>
        <h1>Workout-Shout!</h1>
      </Jumbotron>
      <Nav bsStyle="tabs" activeKey={store.getState().nav} onSelect={(selectedKey) => store.dispatch({type:'CHANGE_TAB', tab:selectedKey})}>
        <NavItem eventKey={1}>Timer</NavItem>
        <NavItem eventKey={2}>BMR Calculator</NavItem>
      </Nav> 
      { store.getState().nav == 1 ? 
        <Timer value={store.getState().timer}
          stop={() => store.dispatch({type:'STOP_TIMER',})}
          start={() => store.dispatch({type:'START_TIMER', offset: Date.now(),})}
          reset={() => store.dispatch({type:'RESET_TIME'})}
        />
        : null }
       { store.getState().nav == 2 ? <BmrCalculator/> : null }
    </div>,
    document.getElementById('content')
  )
}

store.subscribe(appRender);

let updateClock = null;

store.subscribe(() => {
  if (store.getState().timer.isOn && updateClock === null) {
    updateClock = setInterval(() => {
      store.dispatch({
        type: 'TICK',
        time: Date.now()
      })
    },0)
  }
  if (!store.getState().timer.isOn && updateClock !== null) {
    clearInterval(updateClock)
    updateClock = null
  }
});

appRender();
