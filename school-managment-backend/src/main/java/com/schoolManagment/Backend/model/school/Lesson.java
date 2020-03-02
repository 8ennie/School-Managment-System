package com.schoolManagment.Backend.model.school;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {

	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne
	private Teacher teacher;
	
	@ManyToOne
	private Grade grade;
	
	@ManyToOne
	private LessonTime lessonTime;
	
	@ManyToOne
	private Subject subject;
	
	
	
}