import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import { Button, Col, ControlLabel, FormControl, Grid, Jumbotron, Label, Row } from 'react-bootstrap';

// Reducer with initial state
const initialState = {
  isOn: false,
  time: 0
}

// reducer
const timer = function (state = initialState, action) {
  switch (action.type) {
    case 'START_TIMER':
      return {
        time: state.time,
        isOn: true,
        offset: action.offset,
      }
    case 'STOP_TIMER':
      return {
        isOn: false,
        time: state.time
      }
    case 'TICK':
      return {
        time: state.time + (action.time - state.offset),
        isOn: state.isOn,
        offset: action.time
      }
    default:
      return state
  }
}

const store = createStore(timer)

// timer react class
class Timer extends Component {
  constructor(props) {
    super(props)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  start() {
    store.dispatch({
      type: 'START_TIMER',
      offset: Date.now(),
    })
  }

  stop() {
    store.dispatch({
      type: 'STOP_TIMER',
    })
  }

  format(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    }
    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let ms = pad(time.getMilliseconds().toString(), 3);

    return `${m} : ${s} . ${ms}`;
  }

  render() {
    return (
      <Grid>
        <h2>{this.format(this.props.time)}</h2>
        <Button bsSize="large" bsStyle="primary" onClick={this.props.isOn ? this.stop : this.start}>
          { this.props.isOn ? 'Stop' : 'Start' }
        </Button>
      </Grid>
    )
  }
}

class BmrCalculator extends Component {
  render() {
    return (
      <Grid fluid>
        <h3>Basic Metabolic Rate (BMR)</h3>
        <Row>
          <Col md={3}>
            <ControlLabel>Weight:</ControlLabel>
            <FormControl type="text" id="weight"/>
          </Col>
          <Col md={3}>
            <ControlLabel>Height:</ControlLabel>
            <FormControl type="text" id="height"/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button id="calc" bsStyle="default">Calc</Button>
            <Label id="bmr"></Label>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const appRender = function() {
  ReactDOM.render(
    <div>
      <Jumbotron>
        <h1>Workout-Shout!</h1>
      </Jumbotron>
      <Timer time={store.getState().time}
        isOn={store.getState().isOn}
        interval={store.getState().interval}
      />
      <BmrCalculator/>
    </div>,
    document.getElementById('content')
  )
}

store.subscribe(appRender);

var updateClock = null;
var shout30 = null;

store.subscribe(function() {
  if (store.getState().isOn && updateClock === null) {
    updateClock = setInterval(function() {
      store.dispatch({
        type: 'TICK',
        time: Date.now()
      })
    },0);
    shout30 = setInterval(function() {
      console.log("Hello")
    }, 10*1000);
  }
  if (!store.getState().isOn && updateClock !== null) {
    clearInterval(updateClock);
    updateClock = null;
    shout30 = null;
  }
});

appRender();
