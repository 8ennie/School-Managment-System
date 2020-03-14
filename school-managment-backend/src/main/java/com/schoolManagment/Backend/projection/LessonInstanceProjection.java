package com.schoolManagment.Backend.projection;

import java.util.Date;

import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.schoolManagment.Backend.model.school.LessonInstance;

@Projection(name = "lessonInstanceProjection", types = {LessonInstance.class})
public interface LessonInstanceProjection {

	Long getId();
	
	TeacherProjection getTeacher();
	
	GradeProjection getGrade();
	
	LessonTimeProjection getLessonTime();
	
	SubjectProjection getSubject();
	
	Date getDate();
	
	String getInfo();
}
