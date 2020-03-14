package com.schoolManagment.Backend.model.school;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SubstituteLesson extends LessonInstance {

	@ManyToOne
	private Teacher substituteTeacher;
	
	@ManyToOne
	private LeaveDay leaveDay;
	
	private String task;
	
}
