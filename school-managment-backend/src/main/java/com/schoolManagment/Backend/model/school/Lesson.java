package com.schoolManagment.Backend.model.school;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.schoolManagment.Backend.model.school.help.Grade;
import com.schoolManagment.Backend.model.school.help.LessonTime;
import com.schoolManagment.Backend.model.school.help.Quater;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Lesson {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Teacher teacher;

	@ManyToOne
	private Grade grade;

	@ManyToOne
	private LessonTime lessonTime;

	@ManyToOne
	private Subject subject;
	
	@ManyToOne
	private Quater quater;

}
