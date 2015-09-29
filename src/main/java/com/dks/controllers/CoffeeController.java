package com.dks.controllers;

import com.dks.models.Coffee;
import com.dks.repositories.CoffeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/coffee")
public class CoffeeController {

  private static Logger LOG = LoggerFactory.getLogger(CoffeeController.class);

  @Autowired
  private CoffeeRepository coffeeRepository;

  @RequestMapping(method=RequestMethod.GET)
  @ResponseBody
  public ResponseEntity<Coffee> getCoffee() {
    Coffee coffee = new Coffee();
    if (coffeeRepository.findAll().size() > 0) {
      coffee = coffeeRepository.findAll().get(0);
      LOG.info("Found coffee {}", coffee);
    }
    return new ResponseEntity<Coffee>(coffee, HttpStatus.OK);
  }

  @RequestMapping(method=RequestMethod.PUT)
  @ResponseBody
  public ResponseEntity<Coffee> updateCoffee(@RequestBody Coffee coffee) {
    LOG.info("Got new coffee, name {}, time {}", coffee.getName(), coffee.getTime()); 
    return new ResponseEntity<Coffee>(coffeeRepository.save(coffee), HttpStatus.OK);
  }
}
