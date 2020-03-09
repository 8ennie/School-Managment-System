package com.schoolManagment.Backend.projection;

import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.Lesson;
import com.schoolManagment.Backend.model.school.LessonTime;

@Projection(name = "lessonProjection", types = {Lesson.class})
public interface LessonProjection {

	Long getId();
	
	TeacherProjection getTeacher();
	
	GradeProjection getGrade();
	
	LessonTime getLessonTime();
	
	SubjectProjection getSubject();
	
	
}
