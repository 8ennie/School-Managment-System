package com.schoolManagment.Backend.projection;

import java.time.DayOfWeek;
import java.util.List;

import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.LeaveDay;
import com.schoolManagment.Backend.model.school.Teacher;
import com.schoolManagment.Backend.model.school.help.Gender;


@Projection(name = "teacherProjection", types = {Teacher.class})
public interface TeacherProjection {

	Long getId();
	
	String getFirstName();
	
	String getLastName();
	
	Gender getGender();
	
	List<SubjectProjection> getSubjects();
	
	List<LeaveDay> getLeaveDays();
	
	List<DayOfWeek> getDaysWorking();
	
	boolean getSubstituteTeacher();
	
}
