package com.schoolManagment.Backend.projection;

import java.time.DayOfWeek;

import org.springframework.data.rest.core.config.Projection;

import com.schoolManagment.Backend.model.school.help.LessonTime;

@Projection(name = "lessonTimeProjection", types = {LessonTime.class})
public interface LessonTimeProjection {

	int getHour();
	
	DayOfWeek getDayOfWeek();
	
	
	
}
