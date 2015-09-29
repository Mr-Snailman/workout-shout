package com.dks.repositories;

import com.dks.models.Coffee;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoffeeRepository extends MongoRepository<Coffee, String> {

}
