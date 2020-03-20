package com.schoolManagment.Backend.model.school;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
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
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class SubstituteLesson extends LessonInstance {

	@ManyToOne
	private Teacher substituteTeacher;
	
	@ManyToOne()
	private LeaveDay leaveDay;
	
	private String task;
	
	private boolean allowInndependantlyWork;
	
}
