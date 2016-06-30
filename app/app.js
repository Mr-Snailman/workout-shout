import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import BmrCalculator from './BmrCalculator'
import timer from './TimerReducer'
import Timer from './Timer'
import { Jumbotron } from 'react-bootstrap'


const store = createStore(timer)

const appRender = () => {
  ReactDOM.render(
    <div>
      <Jumbotron>
        <h1>Workout-Shout!</h1>
      </Jumbotron>
      <Timer value={store.getState()}
        stop={() => store.dispatch({type:'STOP_TIMER',})}
        start={() => store.dispatch({type:'START_TIMER', offset: Date.now(),})}
        reset={() => store.dispatch({type:'RESET_TIME'})}
      />
      <BmrCalculator/>
    </div>,
    document.getElementById('content')
  )
}

store.subscribe(appRender);

let updateClock = null;

store.subscribe(() => {
  if (store.getState().isOn && updateClock === null) {
    updateClock = setInterval(() => {
      store.dispatch({
        type: 'TICK',
        time: Date.now()
      })
    },0)
  }
  if (!store.getState().isOn && updateClock !== null) {
    clearInterval(updateClock)
    updateClock = null
  }
});

appRender();
