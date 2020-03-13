package com.schoolManagment.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.schoolManagment.Backend.model.school.LeaveDay;
import com.schoolManagment.Backend.model.school.Person;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource
public interface LeaveDayRepository extends JpaRepository<LeaveDay, Long> {

	Optional<List<LeaveDay>> findByPerson(Person person);
	
}
