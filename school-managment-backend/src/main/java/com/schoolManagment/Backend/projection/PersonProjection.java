package com.schoolManagment.Backend.projection;

import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.Person;
import com.schoolManagment.Backend.model.school.help.Gender;

@Projection(name = "personProjection", types = {Person.class})
public interface PersonProjection {

	Long getId();
	
	String getFirstName();
	
	String getLastName();
	
	Gender getGender();
	
	
}
