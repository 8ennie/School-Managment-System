package com.schoolManagment.Backend.projection;

import java.util.List;

import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.Gender;
import com.schoolManagment.Backend.model.school.Teacher;


@Projection(name = "teacherProjection", types = {Teacher.class})
public interface TeacherProjection {

	Long getId();
	
	String getFirstName();
	
	String getLastName();
	
	Gender getGender();
	
	List<SubjectProjection> getSubjects();
	
}
