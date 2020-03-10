package com.schoolManagment.Backend.projection;

import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.Student;
import com.schoolManagment.Backend.model.school.help.Gender;

@Projection(name = "studentProjection", types = {Student.class})
public interface StudentProjection {

	Long getId();
	
	String getFirstName();
	
	String getLastName();
	
	Gender getGender();
	
	GradeProjection getGrade();
	
}
