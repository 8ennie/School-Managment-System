package com.schoolManagment.Backend.projection;

import java.util.Date;

import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.SubstituteLesson;

@Projection(name = "substituteLessonProjection", types = {SubstituteLesson.class})
public interface SubstituteLessonProjection {

	Long getId();
	
	TeacherProjection getTeacher();
	
	GradeProjection getGrade();
	
	LessonTimeProjection getLessonTime();
	
	SubjectProjection getSubject();
	
	Date getDate();
	
	String getInfo();
	
	String getTask();
	
	TeacherProjection getSubstituteTeacher();
	
	LeaveDayProjection getLeaveDay();
	
	boolean getAllowInndependantlyWork();
}
