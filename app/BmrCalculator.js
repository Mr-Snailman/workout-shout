import React, { Component } from 'react'

import { Button, Col, ControlLabel, FormControl, Grid, Label, Row } from 'react-bootstrap'

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

export default BmrCalculator
