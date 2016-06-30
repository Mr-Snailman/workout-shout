import React, { Component } from 'react'
import { Grid, Button } from 'react-bootstrap'

class Timer extends Component {
  constructor(props) {
    super(props)
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
    const { value, stop, start, reset } = this.props
    return (
      <Grid>
        <h2>{this.format(value.time)}</h2>
        <Button bsSize="large" bsStyle="primary" onClick={value.isOn ? stop : start}>
          { value.isOn ? 'Stop' : 'Start' }
        </Button>
        <Button bsSize="large" bsStyle="info" onClick={reset}>Reset</Button>
      </Grid>
    )
  }
}

export default Timer
