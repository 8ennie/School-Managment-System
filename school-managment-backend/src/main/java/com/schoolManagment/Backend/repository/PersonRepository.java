package com.schoolManagment.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.schoolManagment.Backend.model.school.Person;

public interface PersonRepository extends JpaRepository<Person, Long>{

}
