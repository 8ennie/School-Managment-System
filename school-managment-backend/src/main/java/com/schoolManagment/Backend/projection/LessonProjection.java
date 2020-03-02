package com.schoolManagment.Backend.projection;

import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.Grade;
import com.schoolManagment.Backend.model.school.Lesson;
import com.schoolManagment.Backend.model.school.LessonTime;
import com.schoolManagment.Backend.model.school.Teacher;

@Projection(name = "lessonProjection", types = {Lesson.class})
public interface LessonProjection {

	Long getId();
	
	Teacher getTeacher();
	
	Grade getGrade();
	
	LessonTime getLessonTime();
	
	SubjectProjection getSubject();
	
	
}
